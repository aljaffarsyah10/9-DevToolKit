# 🛠️ DevToolkit — Developer Utilities Platform

> **All your essential developer tools in one place. 100% client-side. Zero server uploads. No ads.**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x_Strict-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-77%2F77_Passed-emerald?style=flat&logo=vitest)](https://vitest.dev/)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Client--Side-green?style=flat&logo=shield)](https://github.com/your-username/9-DevToolKit)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat)](LICENSE)

---

## 📖 Tentang Project (About DevToolkit)

**DevToolkit** adalah platform perkakas pengembang (*developer utilities suite*) berbasis web yang dirancang khusus untuk kecepatan, privasi penuh, dan pengalaman pengguna tanpa gangguan.

Banyak developer utility web saat ini dipenuhi iklan, pelacak (*trackers*), dan mengirim data sensitif (seperti token JWT, JSON internal, atau query URL) ke server pihak ketiga. **DevToolkit memecahkan masalah ini dengan filosofi *Privacy-First*:**

1. **100% Client-Side Processing**: Seluruh pemrosesan data, formatting, decoding, regex evaluation, dan hashing dijalankan langsung di browser Anda menggunakan Web APIs bawaan browser.
2. **Zero Server Uploads**: Tidak ada backend API (`/api/*`), tidak ada database, dan tidak ada server penampung data. Payload Anda tidak pernah meninggalkan komputer Anda.
3. **Distraction-Free**: Tanpa iklan, tanpa paywall, dan antarmuka minimalis modern.
4. **Offline-Ready & Fast**: Aplikasi dapat di-prerender secara statis dan siap digunakan secara instan.

---

## 🧰 Daftar Fitur & Perkakas (Utility Suite)

DevToolkit mencakup **8 perkakas pengembang** berkecepatan tinggi:

### 1. Core Utilities (P0)

| Perkakas | Rute | Deskripsi & Fitur Utama |
| :--- | :--- | :--- |
| **JSON Formatter & Validator** | `/tools/json-formatter` | Format dan rapikan JSON dengan indentasi 2 spasi, 4 spasi, atau Tab. Minify satu baris secara instan. Menampilkan nomor baris dan karakter spesifik ketika JSON tidak valid. |
| **Base64 Encoder / Decoder** | `/tools/base64` | Encode & decode teks ke representasi Base64 dengan dukungan penuh UTF-8 internasional dan emoji (🚀, 💻). Deteksi error ketat pada input Base64 malformed. |
| **JWT Decoder** | `/tools/jwt-decoder` | Inspeksi header, payload claims, dan signature JSON Web Token secara aman di memori. Dilengkapi kalkulator masa berlaku token (*Active / Expired status*). |
| **Regex Tester** | `/tools/regex-tester` | Uji regular expression secara real-time dengan penghitung jumlah matches dan posisi kecocokan. Mendukung flags `g`, `i`, `m`, `s`, `u` dengan proteksi catastrophic backtracking. |
| **UUID Generator** | `/tools/uuid-generator` | Hasilkan UUID RFC4122 versi 4 yang kuat secara kriptografis menggunakan browser CSPRNG (`crypto.randomUUID`). Mendukung batch generation (1–100) huruf besar/kecil. |

### 2. High-Value Supporting Utilities (P1)

| Perkakas | Rute | Deskripsi & Fitur Utama |
| :--- | :--- | :--- |
| **URL Encoder / Decoder** | `/tools/url-codec` | Encode dan decode URI & query parameters dengan standard percent-encoding RFC 3986. Konversi otomatis tanda plus (`+`) menjadi spasi. |
| **Unix Timestamp Converter** | `/tools/timestamp-converter` | Konversi dua arah antara Unix Epoch (detik & milidetik), ISO 8601, UTC, dan waktu relatif (misal: *"5 minutes ago"*). Dilengkapi live timestamp ticker. |
| **Hash Generator** | `/tools/hash-generator` | Komputasi cryptographic digest client-side menggunakan Web Crypto Subtle API. Mendukung algoritma **SHA-256**, **SHA-512**, dan **SHA-1** dengan visualisasi panjang bit. |

### 3. Platform & Developer Experience (DX)

- **⚡ Command Palette (`⌘K` / `Ctrl+K`)**: Cari dan buka perkakas apa saja dengan keyboard navigation.
- **⌨️ Keyboard Shortcut Modal (`?`)**: Panduan cepat tombol pintasan editor dan navigasi.
- **🌓 Dark & Light Theme**: Toggle tema instan dengan deteksi preferensi sistem otomatis (`prefers-color-scheme`).
- **⭐ Favorit & Pin**: Simpan perkakas yang sering Anda gunakan untuk akses cepat di halaman depan.
- **🕒 Riwayat Perkakas Terakhir (*Recently Used*)**: Otomatis melacak riwayat perkakas yang dibuka.
- **💾 Export & Download Output**: Tombol satu-klik untuk menyimpan hasil sebagai file `.json` atau `.txt`.
- **📱 Responsive Split Workspace**: Dual-pane editor pada desktop yang otomatis reflow menjadi tumpukan kartu rapi pada layar tablet dan mobile (360px+).

---

## 🔒 Jaminan Keamanan & Privasi

- **0 `eval()`**: Tidak ada dynamic code evaluation yang berbahaya.
- **0 `dangerouslySetInnerHTML`**: Tidak ada injeksi HTML mentah (bebas risiko XSS).
- **0 Telemetri / Outbound Network Calls**: Tidak ada analytics eksternal atau pelacakan input sensitif.
- **Strict Storage Hygiene**: `localStorage` hanya digunakan untuk menyimpan preferensi UI (`devtoolkit_theme`, ID favorit, dan ID recent tools). Tidak pernah menyimpan teks/payload Anda.
- **Strict Security Headers**: Dilengkapi header produksi `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, dan `Referrer-Policy: strict-origin-when-cross-origin`.

---

## 💻 Cara Menjalankan Project (Getting Started)

### Prasyarat (Prerequisites)
Pastikan environment Anda telah terpasang:
- **Node.js**: Versi `>= 20.x` (LTS direkomendasikan)
- **pnpm**: Versi `>= 9.x` atau `11.x` (Jalankan `corepack enable` jika belum ada)

---

### Metode 1: Menjalankan Development Server (Rekomendasi untuk Coding)

1. **Clone repository**:
   ```bash
   git clone https://github.com/your-username/9-DevToolKit.git
   cd 9-DevToolKit/devtoolkit
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Jalankan development server**:
   ```bash
   pnpm dev
   ```

4. **Buka di browser**:
   Akses [http://localhost:3000](http://localhost:3000). Aplikasi akan otomatis me-reload saat Anda mengedit file (*Hot Module Replacement*).

---

### Metode 2: Production Build & Run (Lokal / Server VPS)

1. **Masuk ke direktori aplikasi**:
   ```bash
   cd devtoolkit
   ```

2. **Jalankan production build**:
   ```bash
   pnpm build
   ```
   *Next.js akan meng-compile dan menghasilkan 16 halaman statis yang ter-prerender.*

3. **Jalankan standalone production server**:
   ```bash
   node .next/standalone/server.js
   ```
   *Aplikasi siap diakses di [http://localhost:3000](http://localhost:3000).*

---

### Metode 3: Menjalankan Menggunakan Docker (Containerized)

Jika Anda ingin menjalankan tanpa menginstall Node.js di host machine:

1. **Dari root folder repository**:
   ```bash
   docker compose up -d --build
   ```

2. **Periksa status container**:
   ```bash
   docker compose ps
   ```

3. **Buka browser**:
   Akses [http://localhost:3000](http://localhost:3000).

Untuk mematikan container:
```bash
docker compose down
```

---

### Metode 4: Deploy ke Cloud (Vercel / Managed Hosting)

DevToolkit dioptimalkan untuk Vercel:
1. Hubungkan repository GitHub Anda ke [Vercel Dashboard](https://vercel.com).
2. Atur **Root Directory** ke `devtoolkit`.
3. Build command: `pnpm build`.
4. Tambahkan environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.com`.
5. Klik **Deploy**. Selesai!

*Untuk panduan lengkap deployment ke Nginx, VPS Ubuntu, atau Netlify, baca [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).*

---

## 🧪 Pengujian & Verifikasi Kualitas (Testing & QA)

DevToolkit dilengkapi pengujian komprehensif (Unit, Integration, dan E2E Workflow Test):

```bash
# 1. Jalankan seluruh automated test suite (77 tests)
cd devtoolkit && pnpm test

# 2. Jalankan test dalam mode watch interaktif
cd devtoolkit && pnpm test:watch

# 3. Jalankan pengecekan TypeScript strict mode
cd devtoolkit && pnpm exec tsc --noEmit

# 4. Jalankan analisis ESLint (React 19 rules)
cd devtoolkit && pnpm lint

# 5. Jalankan audit dependency security
cd devtoolkit && pnpm audit
```

Hasil pengujian detail terdokumentasi di [TEST_REPORT.md](TEST_REPORT.md).

---

## ⌨️ Tombol Pintasan (Keyboard Shortcuts)

| Tombol | Fungsi |
| :--- | :--- |
| `⌘ + K` atau `Ctrl + K` | Membuka Command Palette untuk pencarian cepat & perpindahan perkakas |
| `?` | Membuka modal contekan keyboard shortcuts |
| `Esc` | Menutup Command Palette / modal yang sedang aktif |
| `Tab` | Menyisipkan indentasi (spasi/tab) di dalam editor monospace |
| `⌘ + C` atau `Ctrl + C` | Menyalin teks output atau teks yang dipilih |

---

## 📁 Struktur Direktori Project

```
9-DevToolKit/
├── devtoolkit/                       # Source code Next.js App
│   ├── src/
│   │   ├── app/                      # Next.js App Router (Halaman & SEO metadata)
│   │   │   ├── tools/                # Rute individual tiap perkakas
│   │   │   │   ├── json-formatter/
│   │   │   │   ├── base64/
│   │   │   │   ├── jwt-decoder/
│   │   │   │   ├── regex-tester/
│   │   │   │   ├── uuid-generator/
│   │   │   │   ├── url-codec/
│   │   │   │   ├── timestamp-converter/
│   │   │   │   └── hash-generator/
│   │   │   ├── about/                # Halaman About & Architecture Guide
│   │   │   ├── privacy/              # Halaman Privacy Manifesto
│   │   │   ├── layout.tsx            # Root layout
│   │   │   ├── page.tsx              # Homepage (Search, Filters, ToolGrid)
│   │   │   ├── robots.ts             # Robots.txt generator
│   │   │   └── sitemap.ts            # Dynamic sitemap generator
│   │   ├── components/               # Reusable UI & Layout Components
│   │   │   ├── layout/               # AppShell, Navbar, Footer, CommandPalette
│   │   │   ├── tools/                # ToolLayout, InputPanel, OutputPanel, ToolCard
│   │   │   ├── feedback/             # ErrorMessage, EmptyState
│   │   │   └── ui/                   # Button, Card, Badge, Input (shadcn)
│   │   ├── features/                 # Modular Monolith Feature Units
│   │   │   ├── json-formatter/       # View components & formatJson engine
│   │   │   ├── base64/               # View components & base64 engine
│   │   │   ├── jwt-decoder/          # View components & decodeJwt engine
│   │   │   ├── regex-tester/         # View components & executeRegex engine
│   │   │   ├── uuid-generator/       # View components & generateUuid engine
│   │   │   ├── url-codec/            # View components & encodeUrl/decodeUrl
│   │   │   ├── timestamp-converter/  # View components & convertTimestamp
│   │   │   └── hash-generator/       # View components & generateHash
│   │   ├── hooks/                    # useToolPreferences (Favorites & History)
│   │   ├── lib/                      # Clipboard & File Download utilities
│   │   ├── data/                     # Tool catalog & categories metadata
│   │   └── types/                    # TypeScript interfaces & types
│   ├── tests/                        # Vitest automated test suites (77 tests)
│   ├── Dockerfile                    # Multi-stage production container build
│   └── package.json                  # Dependencies & scripts
├── docker-compose.yml                # Docker compose configuration
├── TECHNICAL_PLAN.md                 # Dokumentasi arsitektur teknis lengkap
├── UI_UX_GUIDE.md                    # Panduan desain & wireframe interaksi
├── TEST_REPORT.md                    # Laporan pengujian kualitas & sekuriti
├── DEPLOYMENT_GUIDE.md               # Panduan deployment produksi
├── RELEASE_NOTES.md                  # Catatan rilis resmi v1.0.0
└── README.md                         # Dokumentasi utama project
```

---

## 📚 Dokumen Lengkap Proyek

- 📐 **[Technical Architecture Plan (TECHNICAL_PLAN.md)](TECHNICAL_PLAN.md)**: Keputusan arsitektur, data flow, dan modular monolith pattern.
- 🎨 **[UI/UX Design System Guide (UI_UX_GUIDE.md)](UI_UX_GUIDE.md)**: Standar visual, typography, color palette, dan accessibility.
- 🧪 **[Test & Quality Report (TEST_REPORT.md)](TEST_REPORT.md)**: Hasil pengujian unit, integrasi, audit keamanan, dan analisis bundle.
- 🚀 **[Production Deployment Guide (DEPLOYMENT_GUIDE.md)](DEPLOYMENT_GUIDE.md)**: Panduan instalasi di Vercel, Docker, dan VPS Nginx.
- 📋 **[Official Release Notes (RELEASE_NOTES.md)](RELEASE_NOTES.md)**: Fitur rilis v1.0.0 MVP.

---

## 📜 Lisensi (License)

Project ini didistribusikan di bawah lisensi **MIT**. Anda bebas menggunakan, memodifikasi, dan mendistribusikan kode ini untuk keperluan pribadi maupun komersial.
