# DevToolkit — Production Deployment Guide

**Version**: 1.0.0  
**Target Architecture**: Next.js 16 App Router (Static Prerendered + Standalone Node.js)  
**Security & Privacy Level**: 100% Client-Side Execution (Zero Backend API, Zero Database)

---

## 1. Overview & Architecture Strategy

DevToolkit is designed as a pure web-based developer utility platform. Because all processing (JSON formatting, Base64 encoding/decoding, JWT parsing, regular expression matching, UUID generation, URL codec, timestamp conversion, and cryptographic hashing) occurs entirely in the end-user's browser, the server infrastructure has minimal complexity:

- **No Database**: No PostgreSQL, MongoDB, or Redis required.
- **No Authentication Infrastructure**: No session servers, OAuth brokers, or tokens stored.
- **No Background Workers**: No task queues or cron workers.
- **Edge / Static Optimized**: All 16 routes are prerendered at build time and cached across global CDNs.

---

## 2. Deployment Strategies

### Option A: Managed Next.js Hosting (Vercel — Recommended)

Vercel provides native edge caching, instant HTTPS certificates, continuous deployment from Git, and automatic preview builds.

#### Step 1: Connect Git Repository
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Log in to [Vercel Dashboard](https://vercel.com).
3. Click **Add New Project** and import the `9-DevToolKit` repository.

#### Step 2: Configure Project Settings
- **Root Directory**: `devtoolkit`
- **Framework Preset**: Next.js
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

#### Step 3: Configure Environment Variables
In the project settings under **Environment Variables**, add:
- `NEXT_PUBLIC_SITE_URL`: `https://your-domain.com` (e.g., `https://devtoolkit.dev`)

#### Step 4: Deploy
Click **Deploy**. Vercel will build the project, generate all static pages, and assign a production URL (e.g., `https://devtoolkit.vercel.app`).

#### Alternative: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# From the devtoolkit directory:
cd devtoolkit
vercel login
vercel --prod
```

---

### Option B: Docker Containerized Deployment

For private clouds, on-premise clusters, or self-hosted platforms (Coolify, Dokku, Portainer, Kubernetes).

#### 1. Build and Run Container Directly
```bash
# Build the multi-stage optimized image
docker build -t devtoolkit:latest -f devtoolkit/Dockerfile devtoolkit/

# Run the container in detached mode
docker run -d \
  --name devtoolkit \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL="https://your-domain.com" \
  devtoolkit:latest
```

#### 2. Run via Docker Compose
From the project root directory:
```bash
docker compose up -d --build
```

Check container health:
```bash
docker compose ps
docker compose logs -f devtoolkit
```

---

### Option C: Self-Hosted Linux VPS (Ubuntu / Debian + Nginx + Systemd)

For standalone deployment on an Ubuntu/Debian server using the Next.js standalone server and Nginx reverse proxy with automated Let's Encrypt SSL.

#### 1. Server Prerequisites
```bash
# Update server packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 LTS and Nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx certbot python3-certbot-nginx

# Enable corepack and pnpm
sudo corepack enable && sudo corepack prepare pnpm@11.5.2 --activate
```

#### 2. Build Standalone Application
```bash
cd /var/www/devtoolkit/devtoolkit
pnpm install --frozen-lockfile
pnpm build

# Copy static assets to standalone output
cp -r .next/static .next/standalone/.next/static
```

#### 3. Setup Systemd Service
Create service file `/etc/systemd/system/devtoolkit.service`:
```ini
[Unit]
Description=DevToolkit Production Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/devtoolkit/devtoolkit/.next/standalone
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOSTNAME=127.0.0.1
Environment=NEXT_PUBLIC_SITE_URL=https://your-domain.com

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable devtoolkit
sudo systemctl start devtoolkit
sudo systemctl status devtoolkit
```

#### 4. Configure Nginx Reverse Proxy
Create `/etc/nginx/sites-available/devtoolkit`:
```nginx
server {
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

Enable site and activate SSL:
```bash
sudo ln -s /etc/nginx/sites-available/devtoolkit /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Obtain free Let's Encrypt SSL/TLS Certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## 3. Custom Domain & DNS Setup

| Record Type | Host / Name | Target / Value | Purpose |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` (root) | `76.76.21.21` (or your VPS IP) | Points root domain to hosting |
| **CNAME** | `www` | `cname.vercel-dns.com.` (or domain) | Redirects www subdomain |
| **CAA** | `@` | `letsencrypt.org` | Authorizes SSL certificate issuance |

---

## 4. Production Smoke Test Verification

Execute following verification commands immediately after deployment:

```bash
# 1. Verify HTTP Status and Security Headers
curl -I https://your-domain.com/

# Expected Output:
# HTTP/2 200 (or HTTP/1.1 200 OK)
# x-frame-options: DENY
# x-content-type-options: nosniff
# referrer-policy: strict-origin-when-cross-origin

# 2. Verify Sitemap and Robots
curl -s https://your-domain.com/robots.txt | grep -i "User-agent"
curl -s https://your-domain.com/sitemap.xml | grep -i "<loc>"

# 3. Verify Static Tool Routes
for route in "/tools/json-formatter" "/tools/base64" "/tools/jwt-decoder" "/tools/regex-tester" "/tools/uuid-generator" "/tools/url-codec" "/tools/timestamp-converter" "/tools/hash-generator"; do
  echo "Checking https://your-domain.com${route}..."
  curl -s -o /dev/null -w "Status: %{http_code}\n" "https://your-domain.com${route}"
done
```

---

## 5. Monitoring & Operational Maintenance

1. **Uptime & Health Checks**: Configure automated monitoring (e.g. BetterStack, UptimeRobot, or Vercel Monitoring) pinging `/` every 60 seconds with an expected HTTP 200 status code.
2. **Zero-Logging Privacy Policy**: Do not connect third-party user monitoring or telemetry scripts (e.g., full-story, loggly, or session-recording tools) that could capture user payload inputs or decrypted data.
3. **Backup Strategy**: Since DevToolkit stores zero database records or state on the server, full backup consists solely of Git source repository commits and environment configuration.
