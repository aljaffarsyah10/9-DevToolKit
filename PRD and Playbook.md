# PROJECT_PRD_AND_PLAYBOOK.md

# DevToolkit — Product Requirements Document & Sequential Development Playbook

MVP Scope Defined

10 Development Phases

Web Application

Project: DevToolkit\
Product Category: Developer Productivity Tools / MicroSaaS\
Platform: Web Application\
Target Users: Public — Developers, Programmers, Students, Software Engineers, IT Professionals\
Development Model: Solo Developer + AI Coding Assistant\
Architecture: Modular Monolith / Client-Side First\
Version: 1.0.0\
Document Status: Development Ready

# PART A — PRODUCT REQUIREMENTS DOCUMENT (PRD)

# 1. Product Information

## 1.1 Product Identity

| Item               | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| Product Name       | DevToolkit                                                     |
| Product Type       | Developer Utilities Platform                                   |
| Platform           | Web Application                                                |
| Target Users       | Public                                                         |
| Primary Purpose    | Menyediakan kumpulan tools praktis untuk kebutuhan development |
| Business Model     | Free Tools / Freemium (future)                                 |
| MVP Strategy       | Core Utilities First                                           |
| Architecture       | Modular Monolith                                               |
| Rendering Strategy | Next.js App Router                                             |
| Data Storage       | Browser Local Storage (opsional untuk preferences)             |
| Backend            | Next.js Route Handlers jika diperlukan                         |
| Database           | Tidak diperlukan untuk MVP                                     |

## 1.2 Product Description

DevToolkit adalah platform berbasis web yang menyediakan kumpulan utility tools untuk membantu developer melakukan berbagai pekerjaan teknis secara cepat, praktis, dan efisien.

Developer sering membutuhkan tools sederhana seperti JSON formatter, Base64 encoder, JWT decoder, regex tester, dan UUID generator.

Biasanya kebutuhan tersebut mengharuskan developer membuka beberapa website berbeda.

DevToolkit menyatukan berbagai tools tersebut dalam satu platform dengan antarmuka yang konsisten, sederhana, dan mudah digunakan.

Pengguna dapat mengakses tools tanpa registrasi dan tanpa harus mengunggah data ke server untuk operasi yang dapat dilakukan langsung di browser.

## 1.3 Target Development

Pengembangan dilakukan menggunakan:

- Solo developer.
- AI Coding Assistant / Vibe Coding.
- MVP-first development.
- Modular architecture.
- Reusable UI components.
- Type-safe implementation.
- Client-side processing wherever possible.
- Minimal dependencies.
- Security and privacy by design.

## 1.4 Tech Stack

| Layer            | Technology         | Alasan                     |
| ---------------- | ------------------ | -------------------------- |
| Framework        | Next.js App Router | Routing, rendering, SEO    |
| Language         | TypeScript         | Type safety                |
| Styling          | Tailwind CSS       | Rapid UI development       |
| UI Components    | shadcn/ui          | Reusable components        |
| Icons            | Lucide React       | Consistent icons           |
| State Management | React State        | State lokal sudah cukup    |
| Global State     | Zustand            | Hanya jika diperlukan      |
| Code Editor      | CodeMirror 6       | Editor teks dan kode       |
| Form Validation  | Zod                | Validasi input terstruktur |
| Testing          | Vitest             | Unit testing               |
| E2E Testing      | Playwright         | Browser testing            |
| Package Manager  | pnpm               | Dependency management      |
| Version Control  | Git                | Source control             |
| Deployment       | Vercel / VPS       | Web deployment             |

### Catatan dependency

Tidak semua tools membutuhkan editor khusus.

Gunakan CodeMirror 6 untuk tools yang membutuhkan pengalaman editing kode, terutama:

- JSON Formatter.
- JSON Validator.
- Regex Tester.

Untuk Base64, UUID Generator, dan JWT Decoder, gunakan textarea dan komponen UI biasa jika sudah mencukupi.

Zustand tidak wajib digunakan pada MVP. Gunakan React state terlebih dahulu dan tambahkan Zustand hanya jika terdapat kebutuhan state lintas halaman atau fitur yang memang memerlukannya.

Axios tidak diperlukan karena native `fetch` sudah cukup apabila nanti terdapat API.

# 2. Product Overview

## 2.1 Problem Statement

Developer sering melakukan pekerjaan kecil yang membutuhkan utility tools terpisah.

Contohnya:

1. Memformat JSON yang tidak beraturan.
2. Memvalidasi JSON.
3. Mengubah teks menjadi Base64.
4. Melakukan decoding Base64.
5. Melihat isi JWT token.
6. Menguji regular expression.
7. Menghasilkan UUID untuk database atau aplikasi.
8. Mengubah format data tertentu.

Permasalahan yang muncul:

- Terlalu banyak website utility tools.
- Pengalaman pengguna tidak konsisten.
- Banyak website memiliki iklan berlebihan.
- Beberapa tools meminta pengguna mengunggah data.
- Navigasi antar-tools kurang praktis.
- Tidak semua tools memiliki pengalaman editing yang baik.

## 2.2 Proposed Solution

DevToolkit menyediakan satu dashboard berisi berbagai developer utilities.

Pengguna dapat:

- Membuka tools melalui dashboard.
- Mencari tools melalui search.
- Memasukkan data.
- Melakukan proses secara langsung.
- Menyalin hasil.
- Mengosongkan input.
- Berpindah ke tools lainnya.

Sebagian besar pemrosesan dilakukan sepenuhnya di browser.

## 2.3 Core Value Proposition

"All your essential developer tools in one place."

Nilai utama:

1. Fast — proses instan tanpa request server yang tidak diperlukan.
2. Simple — antarmuka sederhana dan mudah digunakan.
3. Private — data diproses secara lokal selama memungkinkan.
4. Accessible — dapat digunakan tanpa registrasi.
5. Unified — semua tools berada dalam satu platform.

## 2.4 Product Workflow

User Opens DevToolkit

Homepage / Dashboard

Select Developer Tool

Search / Category / Tool Card

Enter Input Data

Text / JSON / Token / Regex

Client-Side Processing

Browser-based utility engine

Display Result

Copy / Download / Reset

# 3. Product Goals

## 3.1 MVP Goals

| ID    | Goal                              | Success Indicator                                 |
| ----- | --------------------------------- | ------------------------------------------------- |
| PG-01 | Menyediakan tools developer dasar | Minimal 6 tools berfungsi                         |
| PG-02 | Mempermudah akses tools           | Semua tools dapat diakses melalui dashboard       |
| PG-03 | Memberikan hasil instan           | Pemrosesan lokal tanpa server request             |
| PG-04 | Memberikan pengalaman konsisten   | Seluruh tools menggunakan design system yang sama |
| PG-05 | Memastikan hasil akurat           | Unit test untuk fungsi utama                      |
| PG-06 | Menjaga privasi                   | Tidak mengirim input tools ke server              |
| PG-07 | Mendukung perangkat mobile        | Responsive layout                                 |
| PG-08 | Production readiness              | Build dan deployment berhasil                     |

## 3.2 MVP Definition of Done

MVP dianggap selesai jika:

- Enam core tools sudah berfungsi.
- Seluruh tools memiliki halaman masing-masing.
- Dashboard menampilkan seluruh tools.
- Search tools berfungsi.
- Copy-to-clipboard tersedia.
- Error handling berfungsi.
- Responsive design selesai.
- Unit testing tersedia.
- Production build berhasil.
- Deployment dapat diakses publik.

# 4. Target Users

## 4.1 Primary Users

### A. Software Developers

Kebutuhan:

- JSON formatter.
- JWT decoder.
- UUID generator.
- Base64 encoder/decoder.
- Regex tester.

### B. Web Developers

Kebutuhan:

- JSON validation.
- API response formatting.
- Token inspection.
- Regex testing.

### C. Computer Science Students

Kebutuhan:

- Memahami format JSON.
- Melakukan encoding dan decoding.
- Menghasilkan UUID.
- Mempelajari struktur JWT.

### D. IT Professionals

Kebutuhan:

- Utility untuk debugging.
- Transformasi data.
- Pemeriksaan token.
- Validasi format data.

## 4.2 User Personas

| Persona            | Kebutuhan Utama                   |
| ------------------ | --------------------------------- |
| Frontend Developer | JSON formatter, Base64, Regex     |
| Backend Developer  | JWT decoder, JSON validator, UUID |
| Student            | Encoding, decoding, UUID          |
| QA Engineer        | Regex tester, JSON validation     |
| API Developer      | JSON formatter, JWT decoder       |

# 5. Scope & Feature Priorities

## 5.1 P0 — Core MVP

Wajib Dibangun

| Feature           | Description                             | Priority |
| ----------------- | --------------------------------------- | -------- |
| JSON Formatter    | Memformat JSON menjadi struktur rapi    | P0       |
| JSON Validator    | Memvalidasi JSON dan menampilkan error  | P0       |
| Base64 Encoder    | Mengubah teks menjadi Base64            | P0       |
| Base64 Decoder    | Mengubah Base64 menjadi teks            | P0       |
| JWT Decoder       | Decode JWT header dan payload           | P0       |
| Regex Tester      | Menguji regex terhadap teks             | P0       |
| UUID Generator    | Menghasilkan UUID v4                    | P0       |
| Copy Result       | Menyalin hasil ke clipboard             | P0       |
| Dashboard         | Menampilkan daftar tools                | P0       |
| Tool Search       | Mencari tools berdasarkan nama          | P0       |
| Responsive Layout | Mendukung desktop dan mobile            | P0       |
| Error Handling    | Menampilkan kesalahan secara informatif | P0       |

### Detail Core Tools

1\. JSON Formatter

Fitur:

- Input JSON.
- Format / Pretty Print.
- Minify.
- Validate.
- Copy result.
- Clear input.
- Indentation selector: 2 spaces, 4 spaces, tab.

2\. Base64 Encoder / Decoder

Fitur:

- Encode text menjadi Base64.
- Decode Base64 menjadi text.
- Swap mode.
- Copy result.
- Clear input.

Catatan teknis: implementasi harus mendukung UTF-8 dengan benar. Jangan menggunakan `btoa()` secara langsung terhadap string Unicode tanpa konversi encoding yang tepat. Gunakan `TextEncoder` dan `TextDecoder`.

3\. JWT Decoder

Fitur:

- Input JWT.
- Decode header.
- Decode payload.
- Tampilkan signature dalam bentuk string.
- Tampilkan informasi expiration jika tersedia.
- Tampilkan status expired berdasarkan waktu browser.

Batasan keamanan:

JWT Decoder hanya melakukan decoding, bukan verifikasi signature.

Jangan menyebut token valid hanya karena berhasil didecode.

Jangan mengirim token ke server.

4\. Regex Tester

Fitur:

- Input regex pattern.
- Input test string.
- Flags: `g`, `i`, `m`, `s`, `u`, `y`, `d` jika didukung browser.
- Menampilkan matches.
- Menampilkan posisi match.
- Menampilkan jumlah match.
- Menampilkan error pattern.

Implementasi harus menghindari infinite loop ketika menggunakan global regex dengan zero-length matches.

5\. UUID Generator

Fitur:

- Generate UUID v4.
- Generate multiple UUID.
- Pilihan jumlah: 1, 5, 10, 50, 100.
- Copy individual UUID.
- Copy all UUID.
- Clear result.

Gunakan `crypto.randomUUID()` apabila tersedia. Untuk browser yang tidak mendukungnya, gunakan implementasi UUID v4 berbasis `crypto.getRandomValues()`.

## 5.2 P1 — Supporting Features

| Feature             | Description                              |
| ------------------- | ---------------------------------------- |
| Dark Mode           | Tema gelap                               |
| Tool Categories     | Pengelompokan berdasarkan kategori       |
| Recently Used Tools | Menyimpan tools terakhir yang digunakan  |
| Favorites           | Menandai tools favorit                   |
| Keyboard Shortcuts  | Shortcut untuk aktivitas umum            |
| Download Result     | Download hasil ke file                   |
| JSON Tree Viewer    | Menampilkan struktur JSON berbentuk tree |
| URL Encoder/Decoder | Encoding dan decoding URL                |
| Timestamp Converter | Konversi Unix timestamp                  |
| Hash Generator      | SHA-256 menggunakan Web Crypto API       |

P1 dikerjakan setelah seluruh P0 stabil.

## 5.3 P2 — Future Development

| Feature              | Description                          |
| -------------------- | ------------------------------------ |
| User Authentication  | Login pengguna                       |
| Cloud Sync           | Sinkronisasi preferences             |
| Custom Workspace     | Workspace personal                   |
| Tool Collections     | Kumpulan tools berdasarkan kebutuhan |
| Public API           | API untuk utility tertentu           |
| Developer Snippets   | Penyimpanan snippet                  |
| Team Workspace       | Kolaborasi                           |
| Premium Subscription | Monetisasi                           |
| AI Utilities         | AI-powered developer tools           |
| More Data Converters | CSV, XML, YAML, dan lainnya          |

## 5.4 Out of Scope MVP

Tidak termasuk MVP:

- Authentication.
- User account.
- Database.
- Cloud synchronization.
- Subscription system.
- Payment gateway.
- Team collaboration.
- Admin dashboard.
- Mobile application.
- Desktop application.
- Backend processing untuk utility sederhana.
- AI API integration.

# 6. Functional Requirements

## FR-01 — Homepage Dashboard

Description: Sistem menampilkan dashboard seluruh developer tools.

Behavior:

- Menampilkan nama DevToolkit.
- Menampilkan deskripsi singkat.
- Menampilkan tools dalam bentuk cards.
- Menampilkan kategori tools.
- Menampilkan search bar.
- Menampilkan navigasi utama.

Acceptance Criteria:

- Dashboard dapat diakses melalui `/`.
- Minimal enam tools ditampilkan.
- Setiap card memiliki nama, deskripsi, dan icon.
- Card dapat diklik.
- Tampilan responsive.

## FR-02 — Tool Navigation

Description: Pengguna dapat membuka halaman utility secara langsung.

Routes:

- `/tools/json-formatter`
- `/tools/base64`
- `/tools/jwt-decoder`
- `/tools/regex-tester`
- `/tools/uuid-generator`

Acceptance Criteria:

- Setiap route dapat dibuka langsung.
- Refresh tidak menghasilkan 404.
- Navigation kembali ke dashboard berfungsi.

## FR-03 — JSON Formatter

Behavior:

- Pengguna memasukkan JSON.
- Pengguna memilih indentation.
- Sistem melakukan parsing.
- Sistem menghasilkan pretty JSON atau minified JSON.
- Sistem menampilkan error apabila JSON invalid.

Acceptance Criteria:

- JSON valid dapat diformat.
- JSON invalid menampilkan error.
- Minify menghasilkan JSON satu baris.
- Copy result berfungsi.
- Empty input ditangani.

## FR-04 — Base64 Encoder / Decoder

Behavior:

- Input text.
- Pilih Encode atau Decode.
- Sistem memproses secara lokal.
- Hasil ditampilkan.

Acceptance Criteria:

- Encode ASCII berhasil.
- Encode Unicode berhasil.
- Decode Base64 valid berhasil.
- Decode Base64 invalid menampilkan error.
- Copy result berfungsi.

## FR-05 — JWT Decoder

Behavior:

- Pengguna memasukkan JWT.
- Sistem memvalidasi struktur tiga bagian.
- Header dan payload didecode.
- Sistem menampilkan informasi expiration jika tersedia.

Acceptance Criteria:

- JWT dengan format benar dapat didecode.
- Token malformed menampilkan error.
- Payload JSON ditampilkan secara readable.
- Expiration dapat dihitung.
- Tidak terdapat klaim verifikasi signature.

## FR-06 — Regex Tester

Behavior:

- Pengguna memasukkan pattern.
- Pengguna memasukkan test string.
- Pengguna mengaktifkan flags.
- Sistem menjalankan regex.
- Sistem menampilkan matches.

Acceptance Criteria:

- Regex valid dapat dijalankan.
- Regex invalid menampilkan error.
- Match count benar.
- Posisi match benar.
- Tidak terjadi infinite loop.

## FR-07 — UUID Generator

Behavior:

- Pengguna memilih jumlah UUID.
- Sistem menghasilkan UUID.
- Hasil ditampilkan dalam list.

Acceptance Criteria:

- UUID sesuai format v4.
- Jumlah output sesuai pilihan.
- UUID unik dalam satu batch.
- Copy individual berfungsi.
- Copy all berfungsi.

## FR-08 — Copy to Clipboard

Behavior:

- Pengguna menekan tombol copy.
- Hasil disalin ke clipboard.
- Sistem menampilkan notifikasi.

Acceptance Criteria:

- Clipboard API digunakan.
- Error clipboard ditangani.
- Toast success muncul setelah operasi berhasil.

## FR-09 — Tool Search

Behavior:

- Pengguna memasukkan keyword.
- Sistem memfilter daftar tools.

Acceptance Criteria:

- Search berdasarkan nama.
- Search berdasarkan deskripsi.
- Empty search result memiliki tampilan yang sesuai.

## FR-10 — Privacy

Behavior:

- Seluruh core utility diproses di browser.
- Tidak ada pengiriman input ke server.

Acceptance Criteria:

- Tidak terdapat API request untuk memproses input core tools.
- Tidak ada logging terhadap input sensitif.
- Tidak terdapat penyimpanan input secara otomatis.

# 7. Non-Functional Requirements

## 7.1 Performance

- Homepage harus terasa responsif.
- Hindari JavaScript yang tidak diperlukan.
- Gunakan dynamic import untuk editor yang berat jika diperlukan.
- Gunakan debounce pada search apabila diperlukan.
- Pemrosesan JSON dan regex dilakukan di browser.
- Hindari rerender berlebihan.

Target internal MVP:

| Metric                   | Target                                     |
| ------------------------ | ------------------------------------------ |
| Lighthouse Performance   | 90+                                        |
| Lighthouse Accessibility | 90+                                        |
| Lighthouse SEO           | 90+                                        |
| Initial UI Response      | 200 ms target pada perangkat modern        |
| Core Utility Processing  | Umumnya di bawah 100 ms untuk input normal |

Target tersebut merupakan sasaran optimasi, bukan jaminan pada semua perangkat dan ukuran input.

## 7.2 Security

- Tidak menyimpan JWT secara otomatis.
- Tidak mengirim data input ke backend.
- Validasi input.
- Hindari penggunaan `eval()`.
- Hindari rendering input menggunakan `dangerouslySetInnerHTML`.
- Tidak mengekspos environment secrets.
- Gunakan HTTPS pada production.

## 7.3 Reliability

- Error handling konsisten.
- Tidak crash ketika menerima input invalid.
- Empty input ditangani.
- Copy failure ditangani.

## 7.4 Maintainability

- TypeScript strict mode.
- Reusable components.
- Modular utility functions.
- Tidak membuat business logic di dalam UI components.
- Unit testing untuk core utilities.

## 7.5 Accessibility

- Semantic HTML.
- Keyboard navigation.
- Visible focus.
- Label pada input.
- ARIA attributes jika dibutuhkan.
- Contrast ratio memadai.

## 7.6 Compatibility

Browser target:

- Chrome.
- Firefox.
- Edge.
- Safari.

Mobile:

- Chrome Android.
- Safari iOS.

# 8. Application Structure & Navigation

## 8.1 Application Pages

| Route                   | Page           | Description       |
| ----------------------- | -------------- | ----------------- |
| `/`                     | Homepage       | Dashboard         |
| `/tools/json-formatter` | JSON Formatter | Format JSON       |
| `/tools/base64`         | Base64         | Encode / Decode   |
| `/tools/jwt-decoder`    | JWT Decoder    | Decode JWT        |
| `/tools/regex-tester`   | Regex Tester   | Test regex        |
| `/tools/uuid-generator` | UUID Generator | Generate UUID     |
| `/about`                | About          | Informasi produk  |
| `/privacy`              | Privacy Policy | Kebijakan privasi |

Halaman About dan Privacy dapat dibuat sederhana.

## 8.2 Navigation Structure

DevToolkit

Public

Main Navigation

&#x20;Dashboard

&#x20;Search Tools

Developer Tools

&#x20;JSON Formatter

&#x20;Base64 Encoder

&#x20;JWT Decoder

&#x20;Regex Tester

&#x20;UUID Generator

INFORMATION

&#x20;About

&#x20;Privacy Policy

## 8.3 Layout

Desktop:

- Navbar horizontal.
- Main content centered.
- Tool cards menggunakan grid.
- Tool workspace menggunakan editor panel.

Mobile:

- Navbar compact.
- Cards satu kolom atau dua kolom sesuai lebar.
- Input dan output ditampilkan vertikal.
- Tombol memiliki ukuran touch-friendly.

# 9. User Flow

## 9.1 General User Flow

1. Pengguna membuka DevToolkit.
2. Homepage menampilkan tools.
3. Pengguna mencari atau memilih tool.
4. Pengguna masuk ke halaman tool.
5. Pengguna memasukkan data.
6. Pengguna menekan tombol proses.
7. Sistem melakukan pemrosesan.
8. Sistem menampilkan hasil.
9. Pengguna menyalin atau mengunduh hasil.
10. Pengguna dapat berpindah ke tool lainnya.

## 9.2 JSON Formatter Flow

Open JSON Formatter

Paste JSON Input

Select Format / Minify

Validate & Process

Display Result

Copy Result

# 10. UI/UX Requirements

## 10.1 Design Direction

DevToolkit menggunakan pendekatan:

Modern Developer Dashboard

Karakteristik:

- Minimalist.
- Clean.
- Developer-oriented.
- Fast interaction.
- Monospaced code presentation.
- Subtle borders.
- Consistent spacing.
- Dark/light mode sebagai supporting feature.

## 10.2 Visual References

[Developer Dashboard concept by ⚡️Celeste North on Dribbble](https://images.openai.com/static-rsc-4/2l4-JZeM1dtCkwgihs8aA_dA4EUloekyzsuwwCgAlsk23pquDlFeHK9Bomqq7WGCNevoQ_3CPAYc95EFoB36RtsDnCjAbsvMmrYe3voQ8rn-FIVHwPxV_ANSb6lOWhZPjeXeLpgiPscsZyNhurdRmxwBw3mZ5RBSerEu9KtYYiA?purpose=inline)

Dashboard inspiration

[JSON Formatter - Free Online JSON Validator & Beautifier | Spectrum UI](https://images.openai.com/static-rsc-4/_p4FbdyC0pWoIQWhJoGzhyDnn0Entb8sTvBq4MESqp_0u-Yir2yoqrJwtj9tzANsDJZg5KSVXz_ZpXKhVzGUCCfx3ZlYn3Wf1iISpdA2FKkxqMg7WDdpiCN9yDHCdjbJrMsZ6HxVgh6wzoHV15o_1Um4p7yQISUAPsuzg5nK77Y?purpose=inline)

Code utility workspace

## 10.3 Design Tokens

| Token               | Value              |
| ------------------- | ------------------ |
| Font Sans           | Inter / Geist Sans |
| Font Mono           | Geist Mono         |
| Primary             | Blue / Indigo      |
| Background          | Neutral            |
| Border Radius       | 8px–12px           |
| Card Padding        | 16px–24px          |
| Container Max Width | 1200px             |
| Button Height       | 40px               |

Gunakan CSS variables dari shadcn/ui untuk warna agar theme konsisten.

## 10.4 Component Requirements

Reusable components:

- `AppNavbar`
- `AppFooter`
- `ToolCard`
- `ToolGrid`
- `ToolSearch`
- `ToolHeader`
- `CodeEditor`
- `InputPanel`
- `OutputPanel`
- `CopyButton`
- `ClearButton`
- `ActionButton`
- `EmptyState`
- `ErrorMessage`
- `StatusBadge`

## 10.5 UI States

| State            | Behavior                                         |
| ---------------- | ------------------------------------------------ |
| Initial          | Input kosong dan instruksi                       |
| Processing       | Loading indicator jika operasi membutuhkan waktu |
| Success          | Hasil ditampilkan                                |
| Error            | Error message ditampilkan                        |
| Empty            | Placeholder ditampilkan                          |
| Copied           | Toast success                                    |
| No Search Result | Empty state                                      |

# 11. Error Handling

| Condition               | Cause                     | Expected Response                        |
| ----------------------- | ------------------------- | ---------------------------------------- |
| Invalid JSON            | Syntax error              | Tampilkan pesan parsing                  |
| Empty JSON              | No input                  | Tampilkan instruksi                      |
| Invalid Base64          | Format tidak valid        | Tampilkan decoding error                 |
| Invalid JWT             | Struktur tidak sesuai     | Tampilkan invalid token                  |
| Invalid Regex           | Pattern salah             | Tampilkan syntax error                   |
| Clipboard denied        | Browser permission        | Tampilkan copy failure                   |
| UUID generation failure | Crypto API tidak tersedia | Tampilkan error yang jelas               |
| Search no result        | Keyword tidak cocok       | Tampilkan empty state                    |
| Large Input             | Input terlalu besar       | Tampilkan batasan ukuran atau peringatan |

Error message harus membantu pengguna memahami masalah dan cara memperbaikinya.

Jangan menampilkan stack trace internal kepada pengguna.

# 12. Technical Architecture

## 12.1 Architecture Decision

Selected Architecture

&#x20;Client-Side First Modular Monolith

DevToolkit tidak membutuhkan dedicated backend pada MVP karena semua core tools dapat berjalan langsung di browser.

Tidak ada alasan teknis untuk membuat microservices, database, atau backend terpisah pada tahap ini.

Next.js digunakan untuk:

- Routing.
- Server-side rendering untuk halaman publik.
- Metadata dan SEO.
- Layout.
- Static page delivery.
- Future API extension.

Core utility engine berjalan pada browser.

## 12.2 Architecture Diagram

Next.js Application

App Router / Layout / Pages

Presentation Layer

React Components / shadcn/ui

Application Layer

Hooks / Tool Controllers / State

Business Logic Layer

JSON / Base64 / JWT / Regex / UUID

Browser APIs

Clipboard / Crypto / TextEncoder / Local Storage

## 12.3 Layer Responsibilities

### Presentation Layer

Berisi:

- Pages.
- Layouts.
- React components.
- UI states.

Tidak boleh menyimpan logic parsing JSON, decoding JWT, dan utility utama secara langsung di komponen.

### Application Layer

Berisi:

- Custom hooks.
- Tool controllers.
- Input/output orchestration.
- State management.

Contoh:

`useJsonFormatter`

`useBase64Converter`

`useRegexTester`

### Business Logic Layer

Berisi pure utility functions.

Contoh:

- `formatJson()`
- `minifyJson()`
- `encodeBase64()`
- `decodeBase64()`
- `decodeJwt()`
- `testRegex()`
- `generateUUID()`

Fungsi harus dapat diuji tanpa rendering React.

### Data Access Layer

Tidak diperlukan untuk core MVP.

Jika nanti diperlukan:

- Local Storage adapter.
- IndexedDB adapter.
- API client.

### Infrastructure Layer

Berisi:

- Browser APIs.
- Clipboard.
- Crypto.
- Storage.
- Environment configuration.

## 12.4 Recommended Folder Structure

```
devtoolkit/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── tools/
│   │   │   ├── json-formatter/
│   │   │   │   └── page.tsx
│   │   │   ├── base64/
│   │   │   │   └── page.tsx
│   │   │   ├── jwt-decoder/
│   │   │   │   └── page.tsx
│   │   │   ├── regex-tester/
│   │   │   │   └── page.tsx
│   │   │   └── uuid-generator/
│   │   │       └── page.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── privacy/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── tools/
│   │   ├── editor/
│   │   └── ui/
│   │
│   ├── features/
│   │   ├── json-formatter/
│   │   ├── base64/
│   │   ├── jwt-decoder/
│   │   ├── regex-tester/
│   │   └── uuid-generator/
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   └── clipboard.ts
│   │
│   ├── data/
│   │   └── tools.ts
│   │
│   ├── hooks/
│   │
│   └── types/
│       └── index.ts
│
├── tests/
│
├── components.json
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 12.5 Data Flow

Contoh JSON Formatter:

1. User memasukkan JSON.
2. React component menerima input.
3. Application handler memanggil `formatJson()`.
4. Business logic melakukan `JSON.parse()`.
5. Hasil dikembalikan.
6. React memperbarui output state.
7. Output ditampilkan.

Tidak ada API request.

## 12.6 State Management

Gunakan React state untuk:

- Input text.
- Output text.
- Selected mode.
- Error.
- Loading.
- Selected flags.
- UUID result.

Zustand dapat ditambahkan jika fitur favorites, recently used, dan preferences membutuhkan shared state lintas halaman.

Jangan memasukkan seluruh input pengguna ke global store tanpa kebutuhan.

## 12.7 Backend Architecture

Backend tidak diperlukan untuk MVP.

Jika ke depannya terdapat fitur yang membutuhkan API, gunakan Next.js Route Handlers.

Contoh:

```
src/app/api/
  ├── tools/
  └── analytics/
```

Namun, jangan menambahkan API hanya untuk menjalankan utility yang sudah bisa diproses secara lokal.

# 13. Data Model

## 13.1 Database Decision

No Database Required

MVP tidak membutuhkan database karena:

- Tidak ada akun pengguna.
- Tidak ada data transaksi.
- Tidak ada cloud sync.
- Tidak ada data yang harus disimpan di server.

## 13.2 Tool Metadata

Gunakan static configuration.

```
export interface ToolMetadata {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  href: string;
  tags: string[];
}
```

Contoh:

```
const tools: ToolMetadata[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    slug: "json-formatter",
    description: "Format and validate JSON data.",
    category: "Data Tools",
    icon: "braces",
    href: "/tools/json-formatter",
    tags: ["json", "format", "validate"],
  },
];
```

## 13.3 Local Storage

Untuk P1:

```
interface UserPreferences {
  theme: "light" | "dark" | "system";
  favorites: string[];
  recentlyUsed: string[];
}
```

Jangan menyimpan:

- JWT tokens.
- API keys.
- Passwords.
- Raw JSON input.
- Data sensitif pengguna.

# 14. Security & Privacy

## 14.1 Client-Side Processing

Core utilities harus berjalan secara lokal.

Keuntungan:

- Mengurangi risiko kebocoran data.
- Mengurangi kebutuhan backend.
- Mengurangi biaya server.
- Mengurangi latency.

## 14.2 JWT Security

JWT decoder hanya membaca informasi yang dikodekan dalam token.

JWT tidak otomatis aman atau valid hanya karena dapat didecode.

Jangan:

- Mengklaim signature valid.
- Menyimpan token.
- Mengirim token ke server.
- Mengirim token ke analytics.
- Menampilkan token dalam URL.

## 14.3 Regex Security

Regex dapat menimbulkan masalah performa jika pattern memiliki kompleksitas tinggi.

Untuk MVP:

- Berikan batas panjang input.
- Berikan peringatan untuk pattern kompleks.
- Hindari menjalankan pattern ekstrem pada input besar tanpa kontrol.
- Evaluasi penggunaan Web Worker jika performa menjadi masalah.

Web Worker atau dedicated regex execution engine dapat dipertimbangkan pada pengembangan selanjutnya.

## 14.4 Input Validation

Validasi dilakukan pada business logic.

Jangan hanya mengandalkan validasi HTML.

## 14.5 Environment Variables

Tidak ada environment variable rahasia yang wajib pada MVP.

Jika nantinya analytics atau layanan eksternal ditambahkan, pisahkan public configuration dan secret configuration.

# 15. Success Criteria

| ID    | Criteria                           | Verification       |
| ----- | ---------------------------------- | ------------------ |
| SC-01 | Homepage berjalan                  | Browser test       |
| SC-02 | Lima tool utama berfungsi          | Functional test    |
| SC-03 | JSON Formatter akurat              | Unit test          |
| SC-04 | Base64 mendukung Unicode           | Unit test          |
| SC-05 | JWT dapat didecode                 | Unit test          |
| SC-06 | Regex dapat diuji                  | Unit test          |
| SC-07 | UUID sesuai v4                     | Unit test          |
| SC-08 | Copy berfungsi                     | Browser test       |
| SC-09 | Responsive                         | Manual test        |
| SC-10 | Tidak ada error TypeScript         | Type check         |
| SC-11 | Build berhasil                     | Production build   |
| SC-12 | Deployment berhasil                | Smoke test         |
| SC-13 | Core input tidak dikirim ke server | Network inspection |

# 16. Risks & Technical Constraints

| Risk                          | Impact                     | Mitigation                                |
| ----------------------------- | -------------------------- | ----------------------------------------- |
| Base64 Unicode issue          | Incorrect result           | TextEncoder/TextDecoder                   |
| Invalid JWT structure         | Parsing error              | Validate three segments                   |
| JWT security misunderstanding | False security assumptions | Display decoder disclaimer                |
| Regex performance             | Browser slowdown           | Input limits and safeguards               |
| Large JSON                    | Slow rendering             | Limit input and optimize editor           |
| Clipboard permission          | Copy failure               | Error feedback                            |
| Browser API incompatibility   | Feature failure            | Feature detection                         |
| Dependency bloat              | Larger bundle              | Minimal dependencies                      |
| SEO weakness                  | Low discoverability        | Static metadata and tool-specific content |
| Tool expansion complexity     | Maintenance issues         | Modular feature architecture              |

# PART B — SEQUENTIAL DEVELOPMENT PLAYBOOK

# Development Execution Overview

Pengembangan DevToolkit dibagi menjadi tepat 10 phase.

Setiap phase harus:

1. Dijalankan secara terpisah.
2. Dikerjakan menggunakan AI Coding Assistant.
3. Diverifikasi sebelum melanjutkan.
4. Memiliki acceptance criteria.
5. Memiliki Git checkpoint.
6. Tidak melanjutkan ke phase berikutnya secara otomatis.

Development Roadmap

1. Phase 1 — Environment & Bootstrap

   Setup project dan development environment

2. Phase 2 — Technical Planning

   Architecture dan TECHNICAL_PLAN.md

3. Phase 3 — UI/UX Planning

   Design system dan UI_UX_GUIDE.md

4. Phase 4 — Frontend Foundation

   Application shell dan routing

5. Phase 5 — Core Frontend Features

   Implementasi seluruh UI utility tools

6. Phase 6 — Backend & Business Logic

   Utility engine dan validation

7. Phase 7 — Integration

   End-to-end frontend integration

8. Phase 8 — Additional Features

   Supporting features dan SEO

9. Phase 9 — Testing & Optimization

   Security, performance, TEST_REPORT.md

10. Phase 10 — Production Release

    Deployment dan dokumentasi production

# PHASE 1 — Environment & Project Bootstrap

Foundation

## 1. Phase Objective

Mempersiapkan development environment dan membuat project Next.js yang siap dikembangkan.

Fokus:

- Setup Node.js.
- Setup pnpm.
- Setup Next.js.
- Setup TypeScript.
- Setup Tailwind CSS.
- Setup shadcn/ui.
- Setup Git.
- Setup dependencies dasar.

Belum ada implementasi business logic.

## 2. Scope of Work

| Task                      | Status      |
| ------------------------- | ----------- |
| Install Node.js           | Required    |
| Install pnpm              | Required    |
| Create Next.js project    | Required    |
| TypeScript setup          | Required    |
| Tailwind setup            | Required    |
| shadcn/ui setup           | Required    |
| Lucide icons              | Required    |
| Git initialization        | Required    |
| Initial README            | Required    |
| Core tools implementation | Not Allowed |

## 3. Detailed Implementation Steps

### Step 1 — Verify Development Environment

Periksa:

```
node -v
npm -v
git --version
```

Node.js versi LTS yang kompatibel dengan versi Next.js yang digunakan direkomendasikan.

Install pnpm:

```
npm install -g pnpm
```

Verifikasi:

```
pnpm -v
```

### Step 2 — Create Next.js Project

```
pnpm create next-app@latest devtoolkit
```

Pilih:

| Configuration | Value |
| ------------- | ----- |
| TypeScript    | Yes   |
| ESLint        | Yes   |
| Tailwind CSS  | Yes   |
| src directory | Yes   |
| App Router    | Yes   |
| Import Alias  | `@/*` |

Jika CLI menawarkan opsi konfigurasi tambahan, gunakan konfigurasi minimal yang sesuai dengan kebutuhan MVP.

### Step 3 — Enter Project

```
cd devtoolkit
```

### Step 4 — Install Dependencies

```
pnpm add lucide-react
pnpm add zod
```

Testing dependencies:

```
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Code editor akan dipasang pada Phase 5 ketika kebutuhan implementasinya sudah jelas.

### Step 5 — Initialize shadcn/ui

```
pnpm dlx shadcn@latest init
```

Pilih konfigurasi yang sesuai dengan Tailwind dan CSS variables.

### Step 6 — Initialize Git

```
git init
git add .
git commit -m "phase 1: project bootstrap"
```

### Step 7 — Verify Project

```
pnpm dev
```

Buka:

`http://localhost:3000`

Verifikasi:

- Homepage muncul.
- Tidak ada runtime error.
- Tailwind berfungsi.
- TypeScript berfungsi.

## 4. Required Commands

```
node -v
pnpm -v

pnpm create next-app@latest devtoolkit

cd devtoolkit

pnpm add lucide-react zod

pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

pnpm dlx shadcn@latest init

pnpm dev
```

## 5. AI Coding Assistant Prompt

# PHASE 1 — PROJECT BOOTSTRAP

Kamu bertindak sebagai Senior Fullstack Developer.

Project: DevToolkit

Dokumen utama:

- PROJECT_PRD_AND_PLAYBOOK.md

Tech stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- pnpm

Development approach:\
Solo developer, MVP first, clean architecture pragmatis.

## Task

Persiapkan project DevToolkit agar siap dikembangkan.

Lakukan:

1. Periksa kondisi repository.
2. Periksa versi Node.js dan package manager.
3. Periksa apakah Next.js sudah terinstall.
4. Pastikan TypeScript aktif.
5. Pastikan Tailwind CSS berfungsi.
6. Pastikan shadcn/ui telah dikonfigurasi.
7. Install dependency yang diperlukan.
8. Siapkan struktur dasar src.
9. Siapkan Git.
10. Buat README.md sederhana.

## Dependency

Gunakan:

- lucide-react
- zod
- vitest
- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event
- jsdom

Jangan install dependency tambahan tanpa alasan teknis.

## Restrictions

- Jangan implementasikan JSON Formatter.
- Jangan implementasikan Base64.
- Jangan implementasikan JWT Decoder.
- Jangan implementasikan Regex Tester.
- Jangan implementasikan UUID Generator.
- Jangan membuat database.
- Jangan membuat API.
- Jangan menambahkan authentication.

## Expected Deliverables

- Next.js project berjalan.
- TypeScript aktif.
- Tailwind aktif.
- shadcn/ui terkonfigurasi.
- Dependencies terinstall.
- Git repository aktif.
- README.md tersedia.

## Acceptance Criteria

- pnpm dev berhasil.
- Homepage dapat dibuka.
- Tidak ada TypeScript error.
- Tidak ada runtime error.
- Git repository aktif.

Jalankan command yang diperlukan dan laporkan hasil aktual.

Jangan melanjutkan ke Phase 2.

## Final Report

Berikan:

1. Project status.
2. Files created.
3. Files modified.
4. Dependencies installed.
5. Commands executed.
6. Testing result.
7. Known issues.
8. Git checkpoint status.

## 6. Expected Deliverables

- Next.js project.
- TypeScript configuration.
- Tailwind configuration.
- shadcn/ui configuration.
- Package configuration.
- README.md.
- Git repository.

## 7. Acceptance Criteria

- Next.js berjalan.
- TypeScript aktif.
- Tailwind aktif.
- shadcn/ui terkonfigurasi.
- Dependencies berhasil diinstall.
- Homepage dapat dibuka.
- Tidak ada runtime error.
- Git repository tersedia.

## 8. Testing Requirements

```
pnpm dev
pnpm exec tsc --noEmit
pnpm build
```

## 9. Git Checkpoint

```
git add .
git commit -m "phase 1: project bootstrap"
```

# PHASE 2 — Technical Planning & Architecture

## 1. Phase Objective

Menerjemahkan PRD menjadi rencana teknis yang konkret.

Tidak ada implementasi fitur utama.

Hasil utama:

`TECHNICAL_PLAN.md`

## 2. Scope of Work

- Architecture planning.
- Folder structure.
- Module responsibilities.
- Utility engine design.
- Component boundaries.
- State management.
- Data flow.
- Testing architecture.
- Dependency validation.
- Technical risks.

## 3. Detailed Implementation Steps

### Step 1 — Analyze PRD

AI membaca seluruh PRD.

Identifikasi:

- Core features.
- Supporting features.
- Non-functional requirements.
- Security constraints.
- MVP boundaries.

### Step 2 — Define Architecture

Gunakan:

Client-side first modular monolith.

Core utility functions harus berupa pure functions jika memungkinkan.

### Step 3 — Define Feature Modules

```
features/
  json-formatter/
  base64/
  jwt-decoder/
  regex-tester/
  uuid-generator/
```

Setiap module dapat memiliki:

```
feature-name/
  components/
  hooks/
  utils/
  types.ts
  index.ts
```

Tidak semua folder harus dibuat jika belum diperlukan.

### Step 4 — Define Utility Contracts

Contoh:

```
formatJson(
  input: string,
  indentation: number
): string
```

```
encodeBase64(
  input: string
): string
```

```
decodeBase64(
  input: string
): string
```

```
decodeJwt(
  token: string
): DecodedJwt
```

```
generateUUID(
  count: number
): string[]
```

### Step 5 — Define State Strategy

React state sebagai default.

Zustand tidak wajib.

### Step 6 — Define Testing Strategy

- Unit tests untuk utility functions.
- Component tests untuk interaksi penting.
- Playwright untuk E2E.

### Step 7 — Create TECHNICAL_PLAN.md

Dokumen harus berisi:

- Architecture overview.
- Folder structure.
- Feature modules.
- Data flow.
- Dependency decisions.
- Testing strategy.
- Security strategy.
- Technical risks.

## 4. Required Commands

```
tree -L 3 -I 'node_modules|.next'
```

Jika `tree` belum tersedia, gunakan:

```
find src -maxdepth 4 -type f
```

Verifikasi:

```
pnpm list
```

## 5. AI Coding Assistant Prompt

# PHASE 2 — TECHNICAL PLANNING

Kamu bertindak sebagai Senior Software Architect.

Project: DevToolkit

Dokumen utama:\
PROJECT_PRD_AND_PLAYBOOK.md

## Objective

Buat dokumen TECHNICAL_PLAN.md berdasarkan PRD.

Jangan implementasikan fitur utama.

## Tasks

1. Analisis seluruh PRD.
2. Tentukan arsitektur aplikasi.
3. Tentukan final folder structure.
4. Tentukan feature module boundaries.
5. Tentukan business logic contracts.
6. Tentukan utility function interfaces.
7. Tentukan state management strategy.
8. Tentukan testing architecture.
9. Tentukan dependency strategy.
10. Identifikasi security risks.
11. Identifikasi performance risks.
12. Tentukan deployment architecture.

## Technical Decisions

Gunakan client-side first modular monolith.

Core processing dilakukan di browser.

Tidak membutuhkan:

- Database.
- Authentication.
- Backend service.
- API untuk core utilities.
- Microservices.

Gunakan React state sebagai default.

Zustand hanya direkomendasikan jika terdapat kebutuhan nyata.

## Expected Deliverable

TECHNICAL_PLAN.md

Dokumen harus mencakup:

- Architecture overview.
- Folder structure.
- Feature modules.
- Business logic contracts.
- Data flow.
- Dependency decisions.
- Testing strategy.
- Security considerations.
- Deployment plan.
- Technical risks.

## Restrictions

Jangan membuat fitur.\
Jangan membuat API.\
Jangan membuat database.\
Jangan menambahkan dependency tanpa alasan.\
Jangan melanjutkan Phase 3.

## Acceptance Criteria

TECHNICAL_PLAN.md harus konsisten dengan PRD.

Setiap keputusan teknis harus memiliki alasan.

Semua core utilities harus dapat diuji secara independen.

## Final Report

Laporkan:

1. Architecture decisions.
2. Folder structure.
3. Dependencies reviewed.
4. Technical risks.
5. Files created.
6. Git checkpoint status.

## 6. Expected Deliverables

- `TECHNICAL_PLAN.md`
- Architecture overview.
- Folder structure.
- Utility contracts.
- Testing plan.
- Security considerations.

## 7. Acceptance Criteria

- TECHNICAL_PLAN.md tersedia.
- Arsitektur sesuai PRD.
- Folder structure ditentukan.
- Utility contracts tersedia.
- Tidak ada database yang dipaksakan.
- Dependency decisions dijelaskan.
- Testing strategy ditentukan.

## 8. Testing Requirements

Tidak ada functional testing karena belum ada fitur.

Verifikasi dokumentasi dan konsistensi.

```
git status
```

## 9. Git Checkpoint

```
git add .
git commit -m "phase 2: technical architecture"
```

# PHASE 3 — UI/UX Planning & Design System

## 1. Phase Objective

Menentukan desain visual dan pengalaman pengguna sebelum implementasi UI.

Hasil utama:

`UI_UX_GUIDE.md`

## 2. Scope of Work

- Design direction.
- Color system.
- Typography.
- Spacing.
- Layout.
- Dashboard design.
- Tool workspace design.
- Navigation.
- Responsive design.
- Reusable components.
- UI states.

## 3. Detailed Implementation Steps

### Step 1 — Define Design Direction

Konsep:

Modern Developer Utility Dashboard.

Referensi visual:

- Developer tools websites.
- Code editor applications.
- Modern SaaS dashboards.

### Step 2 — Define Color System

Gunakan semantic tokens:

```
background
foreground
primary
secondary
muted
accent
destructive
border
input
ring
card
```

### Step 3 — Define Typography

- Geist Sans untuk UI.
- Geist Mono untuk code.

### Step 4 — Define Layout

Homepage:

- Navbar.
- Hero section.
- Search tools.
- Category filters.
- Tool cards.
- Footer.

Tool pages:

- Breadcrumb.
- Tool title.
- Description.
- Input panel.
- Action toolbar.
- Output panel.
- Usage notes.

### Step 5 — Define Reusable Components

```
AppNavbar
AppFooter
ToolCard
ToolGrid
ToolSearch
ToolHeader
CodeEditor
InputPanel
OutputPanel
CopyButton
EmptyState
ErrorMessage
```

### Step 6 — Define Responsive Behavior

Desktop:

\- Dua panel input-output berdampingan jika lebar mencukupi.

Tablet:

\- Panel dapat menyesuaikan ukuran.

Mobile:

\- Panel ditampilkan vertikal.

### Step 7 — Document UI/UX Guide

## 4. Required Commands

Tidak ada instalasi dependency wajib.

```
git status
```

## 5. AI Coding Assistant Prompt

# PHASE 3 — UI/UX PLANNING

Kamu bertindak sebagai Senior Product Designer dan Frontend Architect.

Project: DevToolkit

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md

## Objective

Buat UI_UX_GUIDE.md.

Jangan implementasikan seluruh halaman.

## Tasks

1. Tentukan visual direction.
2. Tentukan design principles.
3. Tentukan color tokens.
4. Tentukan typography.
5. Tentukan spacing system.
6. Tentukan border radius.
7. Tentukan navigation.
8. Tentukan dashboard layout.
9. Tentukan tool workspace layout.
10. Tentukan responsive behavior.
11. Tentukan reusable components.
12. Tentukan loading, empty, success, dan error states.

## Design Direction

Modern Developer Dashboard.

Gunakan:

- Minimalist UI.
- Clean layout.
- Developer-oriented design.
- Geist Sans.
- Geist Mono.
- Lucide icons.
- shadcn/ui.
- Tailwind CSS.

## Expected Deliverable

UI_UX_GUIDE.md

Sertakan:

- Design tokens.
- Layout specification.
- Navigation specification.
- Component inventory.
- Responsive rules.
- UI state definitions.
- Accessibility rules.

## Restrictions

Jangan implementasikan business logic.

Jangan membuat seluruh halaman production.

Jangan menambahkan dependency tanpa kebutuhan.

Jangan melanjutkan Phase 4.

## Acceptance Criteria

Dokumen harus cukup detail agar frontend developer dapat mengimplementasikan desain tanpa mengambil keputusan visual besar lagi.

## Final Report

Laporkan:

1. Design direction.
2. Design tokens.
3. Component inventory.
4. Responsive strategy.
5. Files created.
6. Git checkpoint status.

## 6. Expected Deliverables

- `UI_UX_GUIDE.md`
- Design tokens.
- Layout specification.
- Component inventory.
- Responsive rules.

## 7. Acceptance Criteria

- Design direction ditentukan.
- Typography ditentukan.
- Color system ditentukan.
- Layout homepage ditentukan.
- Layout tools ditentukan.
- Responsive behavior ditentukan.
- UI states ditentukan.
- Accessibility diperhatikan.

## 8. Testing Requirements

Review visual documentation.

Tidak ada functional testing.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 3: ui ux planning"
```

# PHASE 4 — Frontend Foundation & Application Shell

## 1. Phase Objective

Membangun struktur dasar frontend dan application shell.

Belum ada business logic utility.

## 2. Scope of Work

- Final folder structure.
- Global layout.
- Navbar.
- Footer.
- Homepage skeleton.
- Navigation.
- Reusable UI components.
- Basic tool pages.
- Metadata.

## 3. Detailed Implementation Steps

### Step 1 — Implement Final Structure

Buat struktur berdasarkan TECHNICAL_PLAN.md.

### Step 2 — Global Layout

Implementasikan:

- Root layout.
- Global CSS.
- Font.
- Theme variables.
- Metadata.

### Step 3 — Navbar

Berisi:

- Logo.
- Product name.
- Navigation.
- Theme toggle jika dipilih.

### Step 4 — Footer

Berisi:

- Brand.
- About.
- Privacy Policy.
- Copyright.

### Step 5 — Homepage Skeleton

Buat:

- Hero section.
- Search input.
- Tool categories.
- Tool grid.

Data tool berasal dari static configuration.

### Step 6 — Tool Page Skeleton

Buat seluruh routes:

- JSON Formatter.
- Base64.
- JWT Decoder.
- Regex Tester.
- UUID Generator.

Setiap halaman hanya berisi placeholder UI.

### Step 7 — Reusable Components

Implementasikan:

- ToolCard.
- ToolHeader.
- InputPanel.
- OutputPanel.
- EmptyState.
- ErrorMessage.

## 4. Required Commands

```
pnpm dev
pnpm exec tsc --noEmit
```

## 5. AI Coding Assistant Prompt

# PHASE 4 — FRONTEND FOUNDATION

Kamu bertindak sebagai Senior Frontend Developer.

Project: DevToolkit

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md
- UI_UX_GUIDE.md

## Objective

Implementasikan frontend foundation dan application shell.

## Tasks

1. Implementasikan final folder structure.
2. Implementasikan root layout.
3. Implementasikan global CSS.
4. Implementasikan typography.
5. Implementasikan navbar.
6. Implementasikan footer.
7. Implementasikan homepage skeleton.
8. Implementasikan tool cards.
9. Implementasikan search UI.
10. Implementasikan lima tool routes.
11. Implementasikan reusable layout components.
12. Implementasikan metadata dasar.

## Routes

/tools/json-formatter\
/tools/base64\
/tools/jwt-decoder\
/tools/regex-tester\
/tools/uuid-generator

## Restrictions

Jangan membuat utility functions production.

Jangan membuat business logic.

Jangan membuat backend.

Jangan membuat database.

Jangan menambahkan authentication.

Gunakan placeholder yang jelas untuk bagian yang belum diimplementasikan.

## Expected Deliverables

Frontend foundation lengkap.

Seluruh routes dapat dibuka.

## Acceptance Criteria

- Semua routes berfungsi.
- Navbar berfungsi.
- Footer berfungsi.
- Homepage menampilkan tools.
- Layout responsive.
- Tidak ada runtime error.
- TypeScript tidak error.

## Commands

pnpm dev\
pnpm exec tsc --noEmit\
pnpm build

Jangan melanjutkan Phase 5.

## Final Report

Laporkan files created, modified, dependencies, testing result, dan Git checkpoint.

## 6. Expected Deliverables

- Global layout.
- Navbar.
- Footer.
- Homepage.
- Tool cards.
- Five tool pages.
- Reusable components.

## 7. Acceptance Criteria

- Homepage berjalan.
- Semua tool routes berjalan.
- Navbar berfungsi.
- Footer berfungsi.
- Tool cards berfungsi.
- Search UI tersedia.
- Responsive layout.
- TypeScript valid.

## 8. Testing Requirements

```
pnpm dev
pnpm exec tsc --noEmit
pnpm build
```

## 9. Git Checkpoint

```
git add .
git commit -m "phase 4: frontend foundation"
```

# PHASE 5 — Core Frontend Feature Development

## 1. Phase Objective

Membangun UI seluruh core developer utilities.

Pada phase ini UI sudah memiliki interaksi frontend, tetapi utility processing masih boleh menggunakan temporary implementation jika diperlukan.

Prioritaskan komponen yang dapat dipakai ulang.

## 2. Scope of Work

- JSON Formatter UI.
- Base64 UI.
- JWT Decoder UI.
- Regex Tester UI.
- UUID Generator UI.
- Input controls.
- Output panels.
- Copy buttons.
- Clear buttons.
- Form validation.
- Error states.
- Success states.

## 3. Detailed Implementation Steps

### Step 1 — JSON Formatter UI

Komponen:

- JSON input.
- JSON output.
- Format button.
- Minify button.
- Clear button.
- Copy button.
- Indentation selector.

Gunakan CodeMirror 6 apabila dibutuhkan untuk pengalaman editor yang lebih baik.

Install:

```
pnpm add @codemirror/state @codemirror/view @codemirror/commands @codemirror/lang-json @codemirror/theme-one-dark
```

Validasi compatibility dan ukuran bundle sebelum menggunakan seluruh dependency tersebut.

### Step 2 — Base64 UI

Komponen:

- Text input.
- Encode button.
- Decode button.
- Mode switch.
- Result area.
- Copy button.

### Step 3 — JWT Decoder UI

Komponen:

- JWT input.
- Header panel.
- Payload panel.
- Signature panel.
- Expiration information.
- Disclaimer.

### Step 4 — Regex Tester UI

Komponen:

- Pattern input.
- Flags selector.
- Test string.
- Match result.
- Match count.
- Error display.

### Step 5 — UUID Generator UI

Komponen:

- Quantity selector.
- Generate button.
- UUID result list.
- Copy individual.
- Copy all.

### Step 6 — UI State Handling

Semua tools harus memiliki:

- Initial state.
- Empty state.
- Error state.
- Success state.

### Step 7 — Temporary Mock Logic

Jika business logic belum diimplementasikan, gunakan placeholder yang jelas.

Jangan menampilkan mock result seolah-olah hasil production.

## 4. Required Commands

```
pnpm add @codemirror/state @codemirror/view @codemirror/commands @codemirror/lang-json @codemirror/theme-one-dark
```

## 5. AI Coding Assistant Prompt

# PHASE 5 — CORE FRONTEND FEATURES

Kamu bertindak sebagai Senior Frontend Engineer.

Project: DevToolkit

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md
- UI_UX_GUIDE.md

## Objective

Implementasikan UI lengkap untuk seluruh core tools.

## Tasks

1. Implementasikan JSON Formatter interface.
2. Implementasikan Base64 interface.
3. Implementasikan JWT Decoder interface.
4. Implementasikan Regex Tester interface.
5. Implementasikan UUID Generator interface.
6. Implementasikan reusable input components.
7. Implementasikan output panels.
8. Implementasikan copy button.
9. Implementasikan clear button.
10. Implementasikan form validation.
11. Implementasikan empty state.
12. Implementasikan error state.
13. Implementasikan success feedback.
14. Implementasikan responsive layout.

## Code Editor

Evaluasi CodeMirror 6 untuk JSON Formatter.

Gunakan dependency hanya jika memberikan manfaat nyata.

## State Management

Gunakan React state.

Jangan menambahkan Zustand kecuali ada kebutuhan yang dapat dibuktikan.

## Mock Policy

Temporary mock hanya diperbolehkan untuk kebutuhan UI.

Semua mock harus ditandai secara eksplisit.

Jangan membuat mock result terlihat seperti hasil produksi.

## Restrictions

Jangan implementasikan backend.

Jangan membuat database.

Jangan membuat authentication.

Jangan mengimplementasikan fitur P2.

Jangan melanjutkan Phase 6.

## Expected Deliverables

Semua core tool UI selesai.

## Acceptance Criteria

- Lima tool page memiliki UI lengkap.
- Input dan output tersedia.
- Semua action buttons tersedia.
- UI responsive.
- Error state tersedia.
- Tidak ada mock yang disamarkan sebagai fitur production.

## Testing

pnpm exec tsc --noEmit\
pnpm build

## Final Report

Laporkan seluruh files, dependency, testing, dan mock yang masih digunakan.

## 6. Expected Deliverables

- Five tool interfaces.
- Reusable input/output components.
- Copy button.
- Clear button.
- Error display.
- Form states.

## 7. Acceptance Criteria

- JSON Formatter UI lengkap.
- Base64 UI lengkap.
- JWT Decoder UI lengkap.
- Regex Tester UI lengkap.
- UUID Generator UI lengkap.
- Input dan output berfungsi secara visual.
- Responsive.
- Error state tersedia.
- Tidak ada UI mock yang menyesatkan.

## 8. Testing Requirements

```
pnpm exec tsc --noEmit
pnpm build
```

Lakukan manual visual testing.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 5: core frontend features"
```

# PHASE 6 — Backend & Core Business Logic

Client-side Engine

## 1. Phase Objective

Mengimplementasikan utility engine yang sebenarnya.

Catatan arsitektur: Phase ini merupakan implementasi business logic, bukan pembuatan backend server. DevToolkit tidak memerlukan dedicated backend untuk MVP.

## 2. Scope of Work

- JSON processing.
- Base64 processing.
- JWT decoding.
- Regex execution.
- UUID generation.
- Input validation.
- Error handling.
- Utility unit tests.

## 3. Detailed Implementation Steps

### Step 1 — JSON Utility

Buat:

`src/features/json-formatter/utils/json.ts`

Fungsi:

```
export function formatJson(
  input: string,
  spaces: number
): string
```

```
export function minifyJson(
  input: string
): string
```

```
export function validateJson(
  input: string
): { valid: boolean; error?: string }
```

Ketentuan:

- Gunakan JSON.parse.
- Gunakan JSON.stringify.
- Handle malformed JSON.
- Batasi input sesuai keputusan teknis.

### Step 2 — Base64 Utility

Buat:

`src/features/base64/utils/base64.ts`

Fungsi:

```
export function encodeBase64(input: string): string
```

```
export function decodeBase64(input: string): string
```

Ketentuan:

- Mendukung Unicode.
- Menggunakan TextEncoder.
- Menggunakan TextDecoder.
- Menangani malformed Base64.

### Step 3 — JWT Utility

Buat:

`src/features/jwt-decoder/utils/jwt.ts`

Interface:

```
export interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  expiresAt?: number;
  isExpired?: boolean;
}
```

Fungsi:

```
export function decodeJwt(token: string): DecodedJwt
```

Ketentuan:

- Validasi tiga bagian.
- Base64URL decoding.
- Parse JSON.
- Hitung expiration.
- Tidak melakukan signature verification.

### Step 4 — Regex Utility

Buat:

`src/features/regex-tester/utils/regex.ts`

Fungsi:

```
export function testRegex(
  pattern: string,
  flags: string,
  input: string
): RegexResult
```

Interface:

```
export interface RegexResult {
  matches: Array<{
    value: string;
    index: number;
  }>;
  count: number;
}
```

Ketentuan:

- Tangani invalid regex.
- Hindari infinite loop pada zero-length global matches.
- Hindari menjalankan regex pada input yang terlalu besar tanpa batas.

### Step 5 — UUID Utility

Buat:

`src/features/uuid-generator/utils/uuid.ts`

Fungsi:

```
export function generateUUID(count: number): string[]
```

Ketentuan:

- UUID v4.
- Gunakan crypto.randomUUID jika tersedia.
- Fallback crypto.getRandomValues.
- Jangan menggunakan Math.random untuk UUID.

### Step 6 — Clipboard Utility

Buat:

`src/lib/clipboard.ts`

Fungsi:

```
export async function copyToClipboard(
  text: string
): Promise<void>
```

Ketentuan:

- Gunakan navigator.clipboard.
- Tangani permission failure.
- Jangan menyimpan hasil copy.

### Step 7 — Unit Testing

Setiap utility harus memiliki test.

Contoh:

```
tests/
  json.test.ts
  base64.test.ts
  jwt.test.ts
  regex.test.ts
  uuid.test.ts
```

## 4. Required Commands

```
pnpm exec vitest run
pnpm exec tsc --noEmit
pnpm build
```

## 5. AI Coding Assistant Prompt

# PHASE 6 — BUSINESS LOGIC IMPLEMENTATION

Kamu bertindak sebagai Senior TypeScript Engineer.

Project: DevToolkit

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md

## Objective

Implementasikan seluruh core utility business logic.

PENTING:

DevToolkit menggunakan client-side architecture.

Phase ini bukan implementasi backend server.

Jangan membuat API atau database tanpa kebutuhan.

## Tasks

Implementasikan:

1. JSON Formatter.
2. JSON Minifier.
3. JSON Validator.
4. Base64 Encoder.
5. Base64 Decoder.
6. JWT Decoder.
7. Regex Tester.
8. UUID v4 Generator.
9. Clipboard Utility.
10. Unit Tests.

## Technical Requirements

JSON:

- JSON.parse.
- JSON.stringify.
- Error handling.

Base64:

- TextEncoder.
- TextDecoder.
- Unicode support.
- Malformed input handling.

JWT:

- Base64URL decoding.
- Header parsing.
- Payload parsing.
- Expiration calculation.
- No signature verification.

Regex:

- Invalid pattern handling.
- Zero-length match protection.
- Input safeguards.

UUID:

- crypto.randomUUID.
- crypto.getRandomValues fallback.
- UUID v4 compliance.

Clipboard:

- navigator.clipboard.
- Permission error handling.

## Architecture Rules

Utility functions harus:

- Modular.
- Reusable.
- Type-safe.
- Testable.
- Terpisah dari React components.

## Restrictions

Jangan membuat database.

Jangan membuat API routes.

Jangan membuat authentication.

Jangan menambahkan external service.

Jangan menyimpan input pengguna.

Jangan menggunakan Math.random untuk UUID.

Jangan mengklaim JWT signature valid.

Jangan melanjutkan Phase 7.

## Expected Deliverables

- Utility modules.
- TypeScript interfaces.
- Unit tests.
- Error handling.

## Acceptance Criteria

Semua utility dapat digunakan tanpa React.

Semua core utility memiliki unit tests.

Unicode Base64 bekerja.

JWT malformed ditangani.

Regex tidak menyebabkan infinite loop.

UUID memenuhi standar v4.

## Commands

pnpm exec vitest run\
pnpm exec tsc --noEmit\
pnpm build

Laporkan hasil aktual.

## Final Report

Berikan:

1. Utilities implemented.
2. Files created.
3. Files modified.
4. Test cases.
5. Actual test results.
6. Known limitations.
7. Git checkpoint status.

## 6. Expected Deliverables

- JSON utilities.
- Base64 utilities.
- JWT decoder.
- Regex tester engine.
- UUID generator.
- Clipboard utility.
- Unit tests.

## 7. Acceptance Criteria

- JSON Formatter berfungsi.
- JSON Minifier berfungsi.
- JSON Validator berfungsi.
- Base64 mendukung Unicode.
- JWT dapat didecode.
- JWT malformed ditangani.
- Regex tester bekerja.
- Zero-length match ditangani.
- UUID v4 valid.
- Clipboard utility bekerja.
- Unit tests lulus.

## 8. Testing Requirements

```
pnpm exec vitest run
pnpm exec tsc --noEmit
pnpm build
```

## 9. Git Checkpoint

```
git add .
git commit -m "phase 6: backend implementation"
```

Catatan: commit message mengikuti standar 10 phase yang diminta, meskipun implementasi fase ini sebenarnya client-side business logic.

# PHASE 7 — Frontend & Backend Integration

## 1. Phase Objective

Mengintegrasikan seluruh UI dengan utility engine production.

Karena arsitektur tidak menggunakan backend terpisah, integrasi dilakukan antara React frontend dan client-side business logic.

## 2. Scope of Work

- Connect UI dengan utility functions.
- Replace mock implementations.
- Integrate validation.
- Integrate clipboard.
- Error mapping.
- Loading states.
- State synchronization.
- End-to-end user flow.

## 3. Detailed Implementation Steps

### Step 1 — Integrate JSON Formatter

Flow:

```
Input
  ↓
formatJson()
  ↓
Result
  ↓
Display
```

### Step 2 — Integrate Base64

Flow:

```
Input
  ↓
Selected Mode
  ↓
encodeBase64() / decodeBase64()
  ↓
Result
```

### Step 3 — Integrate JWT Decoder

Flow:

```
JWT Input
  ↓
decodeJwt()
  ↓
Header + Payload + Signature
  ↓
Display
```

### Step 4 — Integrate Regex Tester

Flow:

```
Pattern + Flags + Input
  ↓
testRegex()
  ↓
Matches
  ↓
Display
```

### Step 5 — Integrate UUID Generator

Flow:

```
Quantity
  ↓
generateUUID()
  ↓
UUID List
  ↓
Copy
```

### Step 6 — Replace Mock Services

Pastikan seluruh temporary mock logic dihapus.

### Step 7 — Error Mapping

Business logic error diterjemahkan menjadi user-friendly messages.

### Step 8 — Verify All Flows

Uji seluruh tools dari input hingga output.

## 4. Required Commands

```
pnpm exec vitest run
pnpm exec tsc --noEmit
pnpm build
```

## 5. AI Coding Assistant Prompt

# PHASE 7 — FRONTEND INTEGRATION

Kamu bertindak sebagai Senior Fullstack Developer.

Project: DevToolkit

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md
- UI_UX_GUIDE.md

## Objective

Integrasikan seluruh frontend dengan utility engine yang sudah diimplementasikan.

## Tasks

1. Integrasikan JSON Formatter.
2. Integrasikan JSON Validator.
3. Integrasikan JSON Minifier.
4. Integrasikan Base64 Encoder.
5. Integrasikan Base64 Decoder.
6. Integrasikan JWT Decoder.
7. Integrasikan Regex Tester.
8. Integrasikan UUID Generator.
9. Integrasikan Clipboard.
10. Implementasikan error mapping.
11. Implementasikan success feedback.
12. Implementasikan input validation.
13. Hapus seluruh mock implementation.
14. Verifikasi end-to-end flow.

## Architecture

Semua core processing tetap dilakukan di browser.

Tidak perlu API request.

Tidak perlu Axios.

Tidak perlu database.

## Restrictions

Jangan menambahkan fitur P1.

Jangan mengubah business logic tanpa alasan.

Jangan membuat backend tambahan.

Jangan menyimpan input secara otomatis.

Jangan melanjutkan Phase 8.

## Expected Deliverables

Seluruh lima core tools berfungsi end-to-end.

## Acceptance Criteria

Setiap tool menerima input.

Setiap tool memproses input menggunakan utility production.

Setiap tool menampilkan hasil sebenarnya.

Setiap tool menangani invalid input.

Copy berfungsi.

Clear berfungsi.

Tidak ada mock production.

## Commands

pnpm exec vitest run\
pnpm exec tsc --noEmit\
pnpm build

## Final Report

Laporkan:

1. Tools integrated.
2. Mock removed.
3. Files modified.
4. Actual test results.
5. End-to-end verification.
6. Known issues.
7. Git checkpoint status.

## 6. Expected Deliverables

- All tools integrated.
- Real utility processing.
- No production mocks.
- Error mapping.
- Success feedback.

## 7. Acceptance Criteria

- Semua tools bekerja.
- Tidak ada mock.
- Error ditampilkan dengan benar.
- Copy berfungsi.
- Clear berfungsi.
- Input validation bekerja.
- End-to-end flow berhasil.
- Tidak ada API request untuk core processing.

## 8. Testing Requirements

```
pnpm exec vitest run
pnpm exec tsc --noEmit
pnpm build
```

Lakukan manual testing di browser.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 7: frontend backend integration"
```

# PHASE 8 — Additional Features & Product Completion

## 1. Phase Objective

Melengkapi fitur pendukung P1 dan meningkatkan kualitas produk.

Tidak mengimplementasikan P2.

## 2. Scope of Work

Prioritas:

- Dark mode.
- Tool categories.
- Recently used tools.
- Favorites.
- Download result.
- URL Encoder/Decoder.
- Timestamp Converter.
- Hash Generator.
- SEO.
- Accessibility.

Fitur P1 dapat dipilih sesuai kapasitas solo developer, tetapi jangan mengorbankan stabilitas P0.

## 3. Detailed Implementation Steps

### Step 1 — Dark Mode

Gunakan theme support shadcn/ui.

Pastikan theme preference tidak menyebabkan hydration mismatch.

### Step 2 — Favorites

Simpan daftar tools favorit ke Local Storage.

### Step 3 — Recently Used

Simpan slug tools yang terakhir dibuka.

Batasi jumlah item, misalnya 10.

### Step 4 — URL Encoder/Decoder

Gunakan:

```
encodeURIComponent()
decodeURIComponent()
```

### Step 5 — Timestamp Converter

Gunakan JavaScript Date.

Support:

- Unix seconds.
- Unix milliseconds.
- ISO date.
- Human-readable output.

### Step 6 — Hash Generator

Gunakan Web Crypto API:

```
crypto.subtle.digest("SHA-256", data)
```

Hash Generator hanya berjalan pada secure context seperti HTTPS atau localhost yang memenuhi ketentuan browser.

### Step 7 — SEO

Implementasikan:

- Metadata title.
- Meta description.
- Open Graph.
- Canonical URL jika domain production sudah ditentukan.
- Sitemap.
- robots.txt.
- Tool-specific descriptions.

### Step 8 — Accessibility

Periksa:

- Keyboard navigation.
- Focus states.
- Input labels.
- Color contrast.
- Screen reader support.

## 4. Required Commands

```
pnpm exec tsc --noEmit
pnpm build
```

## 5. AI Coding Assistant Prompt

# PHASE 8 — ADDITIONAL FEATURES

Kamu bertindak sebagai Senior Product Engineer.

Project: DevToolkit

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md
- UI_UX_GUIDE.md

## Objective

Implementasikan supporting features P1 yang realistis untuk MVP.

## Tasks

Prioritaskan:

1. Dark mode.
2. Tool categories.
3. Favorites.
4. Recently used tools.
5. Download result.
6. URL Encoder/Decoder.
7. Timestamp Converter.
8. SHA-256 Hash Generator.
9. SEO metadata.
10. Sitemap.
11. robots.txt.
12. Accessibility improvements.

## Storage

Gunakan Local Storage hanya untuk preferences.

Jangan menyimpan raw input, JWT, password, atau data sensitif.

## Security

Hash menggunakan Web Crypto API.

Tidak menggunakan external API untuk hash.

## Restrictions

Jangan implementasikan authentication.

Jangan implementasikan subscription.

Jangan membuat database.

Jangan membuat cloud sync.

Jangan implementasikan P2.

Jangan menambahkan fitur yang tidak tercantum.

Jangan melanjutkan Phase 9.

## Expected Deliverables

Supporting features selesai sesuai prioritas dan kapasitas MVP.

## Acceptance Criteria

Core tools P0 tidak rusak.

Preferences dapat disimpan.

SEO metadata tersedia.

Responsive tetap berfungsi.

Accessibility meningkat.

Tidak ada data sensitif yang disimpan.

## Commands

pnpm exec tsc --noEmit\
pnpm build

## Final Report

Laporkan:

1. P1 features implemented.
2. Features deferred.
3. Files created.
4. Dependencies added.
5. Testing results.
6. Known issues.
7. Git checkpoint status.

## 6. Expected Deliverables

- Dark mode.
- Favorites.
- Recently used.
- URL tools.
- Timestamp converter.
- Hash generator.
- SEO metadata.
- Sitemap.
- Accessibility improvements.

## 7. Acceptance Criteria

- Core P0 tidak rusak.
- Dark mode berfungsi jika diimplementasikan.
- Favorites berfungsi jika diimplementasikan.
- Recently used berfungsi jika diimplementasikan.
- Additional utilities berfungsi jika diimplementasikan.
- SEO metadata tersedia.
- Sitemap tersedia.
- Accessibility diperiksa.
- Tidak ada P2.

## 8. Testing Requirements

```
pnpm exec vitest run
pnpm exec tsc --noEmit
pnpm build
```

## 9. Git Checkpoint

```
git add .
git commit -m "phase 8: additional features"
```

# PHASE 9 — Testing, Security & Optimization

## 1. Phase Objective

Memastikan DevToolkit siap digunakan secara publik.

Fokus:

- Functional testing.
- Unit testing.
- Integration testing.
- E2E.
- Security.
- Performance.
- Browser compatibility.
- Responsive.
- Bug fixing.

Hasil:

`TEST_REPORT.md`

## 2. Scope of Work

| Testing       | Scope                   |
| ------------- | ----------------------- |
| Unit          | Utility functions       |
| Integration   | Feature components      |
| E2E           | User workflows          |
| Security      | Input handling, privacy |
| Performance   | Bundle and runtime      |
| Responsive    | Mobile, tablet, desktop |
| Compatibility | Major browsers          |

## 3. Detailed Implementation Steps

### Step 1 — Unit Testing

Pastikan:

- JSON parsing.
- JSON formatting.
- JSON minifying.
- Unicode Base64.
- Invalid Base64.
- JWT malformed.
- JWT expiration.
- Regex flags.
- Regex zero-length matches.
- UUID format.

### Step 2 — Integration Testing

Test setiap feature page.

### Step 3 — E2E Testing

Install Playwright:

```
pnpm add -D @playwright/test
pnpm exec playwright install
```

Contoh skenario:

1. Open homepage.
2. Search JSON Formatter.
3. Open JSON Formatter.
4. Paste JSON.
5. Click Format.
6. Verify output.
7. Copy output.

### Step 4 — Security Audit

Periksa:

- No `eval()`.
- No unsafe HTML.
- No sensitive input logging.
- No token transmission.
- No unnecessary API calls.
- No hardcoded secrets.
- No dependency vulnerabilities yang diketahui.

Jalankan:

```
pnpm audit
```

Evaluasi setiap temuan berdasarkan severity dan dependency path. Jangan melakukan update major otomatis tanpa memeriksa compatibility.

### Step 5 — Performance Optimization

Periksa:

- Bundle size.
- Unnecessary dependencies.
- Large client components.
- Unnecessary rerenders.
- Code splitting.
- Dynamic imports.

### Step 6 — Responsive Testing

Test:

- 360px.
- 390px.
- 768px.
- 1024px.
- 1440px.

### Step 7 — Generate TEST_REPORT.md

Isi:

- Testing scope.
- Test environment.
- Test execution.
- Test result.
- Bugs found.
- Bugs fixed.
- Known issues.
- Release recommendation.

## 4. Required Commands

```
pnpm exec vitest run
pnpm exec tsc --noEmit
pnpm exec next lint
pnpm build
pnpm audit
```

Catatan: Pada versi Next.js yang menggunakan ESLint CLI secara terpisah, gunakan:

```
pnpm exec eslint .
```

Jangan mengasumsikan `next lint` tersedia pada seluruh versi Next.js.

Jika Playwright telah dikonfigurasi:

```
pnpm exec playwright test
```

## 5. AI Coding Assistant Prompt

# PHASE 9 — TESTING, SECURITY & OPTIMIZATION

Kamu bertindak sebagai Senior QA Engineer dan Application Security Engineer.

Project: DevToolkit

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md
- UI_UX_GUIDE.md

## Objective

Lakukan comprehensive testing dan optimization.

Buat TEST_REPORT.md.

## Tasks

1. Jalankan seluruh unit tests.
2. Periksa JSON utilities.
3. Periksa Base64 Unicode.
4. Periksa JWT decoding.
5. Periksa Regex Tester.
6. Periksa UUID generation.
7. Jalankan integration tests.
8. Jalankan E2E tests jika tersedia.
9. Periksa responsive behavior.
10. Periksa browser compatibility.
11. Jalankan TypeScript check.
12. Jalankan ESLint.
13. Jalankan production build.
14. Jalankan dependency audit.
15. Periksa security.
16. Periksa performance.
17. Perbaiki bug yang ditemukan.

## Security Checklist

Pastikan:

- Tidak ada eval().
- Tidak ada unsafe HTML rendering.
- Tidak ada input sensitif yang dikirim ke server.
- JWT tidak disimpan.
- Tidak ada hardcoded secret.
- Tidak ada unnecessary API calls.
- Input validation berfungsi.

## Performance

Evaluasi:

- Bundle size.
- Code splitting.
- Dynamic imports.
- Unnecessary dependencies.
- React rerenders.
- Large input handling.

## Restrictions

Jangan menambahkan fitur baru.

Jangan mengubah scope MVP.

Jangan melakukan major dependency upgrade tanpa alasan.

Jangan mengarang hasil testing.

Jika test gagal, laporkan dan perbaiki.

Jangan melanjutkan Phase 10.

## Expected Deliverable

TEST_REPORT.md

## Acceptance Criteria

TypeScript check berhasil.

Lint berhasil.

Unit tests berhasil.

Production build berhasil.

E2E tests yang dikonfigurasi berhasil.

Security issues kritis ditangani.

Known issues didokumentasikan.

## Final Report

Laporkan:

1. Tests executed.
2. Actual test results.
3. Bugs found.
4. Bugs fixed.
5. Security findings.
6. Performance findings.
7. Known limitations.
8. Release readiness.
9. Git checkpoint status.

## 6. Expected Deliverables

- `TEST_REPORT.md`
- Unit test results.
- E2E test results.
- Security findings.
- Performance findings.
- Bug fixes.

## 7. Acceptance Criteria

- Unit tests lulus.
- Integration tests lulus jika tersedia.
- E2E tests lulus jika dikonfigurasi.
- TypeScript check berhasil.
- ESLint berhasil.
- Build berhasil.
- Security audit diperiksa.
- Responsive diperiksa.
- Tidak ada critical bug yang belum ditangani.
- TEST_REPORT.md tersedia.

## 8. Testing Requirements

```
pnpm exec vitest run
pnpm exec tsc --noEmit
pnpm exec eslint .
pnpm build
pnpm audit
```

Jika Playwright dikonfigurasi:

```
pnpm exec playwright test
```

## 9. Git Checkpoint

```
git add .
git commit -m "phase 9: testing and optimization"
```

# PHASE 10 — Production Deployment & Release

## 1. Phase Objective

Melakukan deployment DevToolkit ke production.

Menyiapkan:

- Production build.
- Environment.
- Hosting.
- Domain.
- HTTPS.
- Monitoring.
- Smoke testing.
- Release documentation.

Hasil:

- `DEPLOYMENT_GUIDE.md`
- `RELEASE_NOTES.md`

## 2. Scope of Work

| Task                      | Required         |
| ------------------------- | ---------------- |
| Production build          | Yes              |
| Environment configuration | Yes              |
| Domain                    | Jika tersedia    |
| HTTPS                     | Yes              |
| Hosting                   | Yes              |
| Deployment                | Yes              |
| Smoke test                | Yes              |
| Monitoring                | Yes              |
| Backup strategy           | Sesuai kebutuhan |
| Release notes             | Yes              |

## 3. Deployment Architecture

Untuk MVP, rekomendasi utama adalah managed hosting seperti Vercel.

Alasannya:

- Next.js didukung secara native.
- Deployment relatif sederhana.
- HTTPS tersedia.
- Tidak membutuhkan pengelolaan server.
- Cocok untuk aplikasi utility berbasis web.

Alternatif:

VPS + Docker + Reverse Proxy.

Gunakan alternatif tersebut apabila terdapat kebutuhan kontrol infrastruktur atau deployment mandiri.

## 3.1 Architecture — Managed Hosting

User Browser

Domain + HTTPS

Managed Next.js Hosting

Build / CDN / SSR

DevToolkit Application

Client-side utility processing

## 4. Detailed Implementation Steps

### Step 1 — Production Configuration

Periksa:

- `next.config.ts`
- `package.json`
- `tsconfig.json`
- `.gitignore`
- Metadata.
- Sitemap.
- robots.txt.

### Step 2 — Build Verification

```
pnpm build
```

Pastikan tidak ada error.

### Step 3 — Deploy to Vercel

Install CLI:

```
pnpm add -g vercel
```

Login:

```
vercel login
```

Deploy preview:

```
vercel
```

Deploy production:

```
vercel --prod
```

Alternatif: hubungkan GitHub repository melalui dashboard Vercel dan aktifkan automatic deployment.

### Step 4 — Domain Configuration

Jika menggunakan custom domain:

1. Tambahkan domain di hosting provider.
2. Konfigurasikan DNS.
3. Tunggu propagasi.
4. Pastikan HTTPS aktif.
5. Pastikan canonical URL benar.

### Step 5 — Production Smoke Test

Verifikasi:

- Homepage.
- Navigation.
- Semua tools.
- Copy clipboard.
- JSON formatter.
- Base64.
- JWT.
- Regex.
- UUID.
- Mobile responsive.

### Step 6 — Monitoring

Untuk MVP:

- Hosting deployment logs.
- Hosting uptime/status.
- Browser error monitoring jika diperlukan.

Hindari mengirimkan raw tool input ke monitoring service.

### Step 7 — Documentation

Buat:

`DEPLOYMENT_GUIDE.md`

`RELEASE_NOTES.md`

## 5. AI Coding Assistant Prompt

# PHASE 10 — PRODUCTION DEPLOYMENT & RELEASE

Kamu bertindak sebagai Senior DevOps Engineer dan Release Manager.

Project: DevToolkit

Dokumen:

- PROJECT_PRD_AND_PLAYBOOK.md
- TECHNICAL_PLAN.md
- UI_UX_GUIDE.md
- TEST_REPORT.md

## Objective

Persiapkan dan lakukan production deployment.

## Tasks

1. Audit production configuration.
2. Periksa Next.js configuration.
3. Periksa package scripts.
4. Verifikasi production build.
5. Periksa environment variables.
6. Evaluasi deployment platform.
7. Siapkan deployment configuration.
8. Deploy aplikasi.
9. Konfigurasikan domain jika tersedia.
10. Pastikan HTTPS.
11. Lakukan production smoke test.
12. Periksa deployment logs.
13. Dokumentasikan monitoring.
14. Buat DEPLOYMENT_GUIDE.md.
15. Buat RELEASE_NOTES.md.

## Deployment Strategy

Prioritaskan managed Next.js hosting seperti Vercel.

VPS dan Docker hanya digunakan jika memang diperlukan.

Tidak perlu:

- Database server.
- Backend service.
- Redis.
- Background workers.
- Microservices.

## Security

Jangan mengekspos secrets.

Jangan mengirimkan raw tool inputs ke monitoring.

Pastikan HTTPS aktif.

Pastikan production configuration aman.

## Expected Deliverables

1. DEPLOYMENT_GUIDE.md
2. RELEASE_NOTES.md
3. Production deployment.
4. Production smoke test report.

## Restrictions

Jangan menambahkan fitur baru.

Jangan mengubah scope MVP.

Jangan membuat database.

Jangan membuat backend tambahan.

Jangan mengarang deployment status.

Jika deployment membutuhkan credential atau persetujuan pengguna, jelaskan langkah yang harus dilakukan.

## Acceptance Criteria

Production build berhasil.

Deployment berhasil.

Website dapat diakses.

HTTPS aktif.

Core tools berfungsi di production.

Smoke test berhasil.

Dokumentasi tersedia.

## Final Report

Laporkan:

1. Hosting platform.
2. Deployment URL.
3. Domain status.
4. HTTPS status.
5. Production build result.
6. Smoke test result.
7. Monitoring configuration.
8. Files created.
9. Known production limitations.
10. Git checkpoint status.

## 6. Expected Deliverables

- Production website.
- `DEPLOYMENT_GUIDE.md`
- `RELEASE_NOTES.md`
- Deployment configuration.
- Production smoke test results.

## 7. Acceptance Criteria

- Production build berhasil.
- Deployment berhasil.
- Website dapat diakses publik.
- HTTPS aktif.
- Semua routes berjalan.
- Core utilities berfungsi.
- Mobile layout berfungsi.
- Smoke test berhasil.
- Deployment guide tersedia.
- Release notes tersedia.

## 8. Testing Requirements

```
pnpm build
```

Production verification:

```
curl -I https://your-domain.com
```

Ganti URL dengan domain production aktual.

## 9. Git Checkpoint

```
git add .
git commit -m "phase 10: production deployment"
```

# PART C — GLOBAL AI CODING RULES

Aturan ini berlaku untuk seluruh 10 phase.

## 1. General Rules

1. Selalu baca PRD.
2. Baca TECHNICAL_PLAN.md setelah tersedia.
3. Baca UI_UX_GUIDE.md setelah tersedia.
4. Kerjakan satu phase dalam satu waktu.
5. Jangan mengerjakan phase berikutnya otomatis.
6. Jangan menimpa pekerjaan yang sudah ada tanpa alasan.
7. Jangan mengganti tech stack tanpa persetujuan.
8. Jangan menambahkan dependency yang tidak diperlukan.
9. Jangan mengimplementasikan fitur di luar scope.
10. Jangan mengarang hasil testing.

## 2. Architecture Rules

- Gunakan modular monolith.
- Gunakan client-side processing.
- Hindari backend yang tidak diperlukan.
- Hindari database yang tidak diperlukan.
- Hindari microservices.
- Pisahkan UI dan utility logic.
- Gunakan TypeScript strict mode.
- Gunakan reusable components.

## 3. Code Quality Rules

- Hindari `any`.
- Hindari duplicated code.
- Gunakan meaningful naming.
- Gunakan typed interfaces.
- Hindari giant components.
- Pisahkan utility functions.
- Hindari over-abstraction.
- Tambahkan unit tests untuk core functions.

## 4. Privacy Rules

- Jangan mengirim raw JSON input ke server.
- Jangan mengirim JWT token ke server.
- Jangan menyimpan input sensitif.
- Jangan menampilkan token pada URL.
- Jangan mengirim raw inputs ke analytics.

## 5. Dependency Rules

Sebelum menambahkan dependency:

1. Identifikasi kebutuhan.
2. Periksa apakah browser API sudah mencukupi.
3. Periksa compatibility dengan Next.js.
4. Evaluasi bundle size.
5. Evaluasi maintenance.
6. Dokumentasikan alasan.

## 6. Phase Completion Report

Setiap AI Coding Assistant wajib memberikan laporan:

```
PHASE COMPLETION REPORT

Project:
DevToolkit

Phase:
[PHASE NUMBER]

Status:
Completed / Partially Completed / Blocked

1. Summary
2. Files Created
3. Files Modified
4. Dependencies Added
5. Implementation Details
6. Commands Executed
7. Testing Results
8. Acceptance Criteria Status
9. Known Issues
10. Git Checkpoint Status
11. Recommended Next Action
```

# PART D — GIT & EXECUTION RULES

## 1. Git Strategy

Gunakan satu branch utama:

`main`

Opsional gunakan branch development:

`develop`

Untuk solo developer, penggunaan branch `main` saja sudah cukup jika setiap phase memiliki checkpoint dan perubahan direview.

## 2. Commit Convention

| Phase | Commit                                  |
| ----- | --------------------------------------- |
| 1     | `phase 1: project bootstrap`            |
| 2     | `phase 2: technical architecture`       |
| 3     | `phase 3: ui ux planning`               |
| 4     | `phase 4: frontend foundation`          |
| 5     | `phase 5: core frontend features`       |
| 6     | `phase 6: backend implementation`       |
| 7     | `phase 7: frontend backend integration` |
| 8     | `phase 8: additional features`          |
| 9     | `phase 9: testing and optimization`     |
| 10    | `phase 10: production deployment`       |

## 3. Git Workflow

Sebelum phase:

```
git status
git log --oneline -5
```

Setelah implementasi:

```
git diff
git status
```

Jalankan testing.

Jika semuanya lolos:

```
git add .
git commit -m "phase X: description"
```

## 4. Important Rules

Jangan membuat commit apabila:

- Testing belum dijalankan.
- Build gagal.
- Terdapat perubahan yang belum direview.
- Acceptance criteria belum terpenuhi.
- Terdapat error yang belum didokumentasikan.

Jika phase belum selesai, jangan membuat checkpoint seolah-olah phase sudah selesai. Simpan perubahan dalam kondisi working tree dan laporkan statusnya.

## 5. Phase Approval

Setiap phase membutuhkan persetujuan manual sebelum melanjutkan.

Contoh:

```
Phase 1: Completed
Phase 1: Verified
Phase 1: Git checkpoint created

Waiting for user approval to start Phase 2.
```

# PART E — COMMAND CHEAT SHEET

## 1. Development Commands

| Command               | Purpose              |
| --------------------- | -------------------- |
| `pnpm dev`            | Development server   |
| `pnpm build`          | Production build     |
| `pnpm start`          | Production server    |
| `pnpm install`        | Install dependencies |
| `pnpm add package`    | Install package      |
| `pnpm remove package` | Remove package       |
| `pnpm list`           | List dependencies    |
| `pnpm audit`          | Security audit       |

## 2. TypeScript & Lint

```
pnpm exec tsc --noEmit
```

```
pnpm exec eslint .
```

## 3. Testing

```
pnpm exec vitest
```

```
pnpm exec vitest run
```

```
pnpm exec playwright test
```

## 4. Git

```
git status
git add .
git commit -m "message"
git log --oneline
git diff
```

## 5. shadcn/ui

Contoh menambahkan komponen:

```
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add textarea
pnpm dlx shadcn@latest add select
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add tooltip
pnpm dlx shadcn@latest add sonner
```

Install hanya komponen yang benar-benar digunakan.

# PART F — FINAL CHECKLIST & DOCUMENTATION

## 1. Product Checklist

Product completion

# 0/14

Homepage dashboard tersedia

Tool search berfungsi

JSON Formatter berfungsi

JSON Validator berfungsi

JSON Minifier berfungsi

Base64 Encoder berfungsi

Base64 Decoder berfungsi

JWT Decoder berfungsi

Regex Tester berfungsi

UUID Generator berfungsi

Copy to clipboard berfungsi

Error handling tersedia

Responsive layout selesai

Privacy policy tersedia

## 2. Technical Checklist

Technical completion

# 0/12

Next.js App Router terkonfigurasi

TypeScript strict mode aktif

Tailwind CSS aktif

shadcn/ui terkonfigurasi

Architecture sesuai TECHNICAL_PLAN.md

Business logic terpisah dari UI

Utility functions memiliki unit tests

Tidak ada database yang tidak diperlukan

Tidak ada backend yang tidak diperlukan

Tidak ada raw input yang dikirim ke server

Production build berhasil

Dependency audit diperiksa

## 3. Deployment Checklist

Deployment completion

# 0/11

Production build berhasil

Hosting platform dikonfigurasi

Domain dikonfigurasi jika tersedia

HTTPS aktif

Homepage production dapat diakses

Semua tools production diuji

Mobile layout diuji

Production smoke test selesai

Monitoring tersedia

DEPLOYMENT_GUIDE.md dibuat

RELEASE_NOTES.md dibuat

## 4. Required Documentation

Pada akhir development, repository harus memiliki dokumentasi berikut:

```
devtoolkit/
│
├── PROJECT_PRD_AND_PLAYBOOK.md
├── TECHNICAL_PLAN.md
├── UI_UX_GUIDE.md
├── TEST_REPORT.md
├── DEPLOYMENT_GUIDE.md
├── RELEASE_NOTES.md
├── README.md
│
└── src/
```

## 5. Final Release Criteria

DevToolkit dinyatakan siap production apabila:

- Semua fitur P0 bekerja.
- Tidak ada critical bug.
- Unit tests lulus.
- TypeScript check lulus.
- ESLint lulus.
- Production build berhasil.
- Semua routes dapat diakses.
- Responsive design berfungsi.
- Tidak ada kebocoran input sensitif.
- Production smoke test berhasil.
- Deployment documentation tersedia.

# FINAL PRODUCT SUMMARY

# DevToolkit

All your essential developer tools in one place.

# 5

Core tools

# 10

Development phases

# 0

Database required

# 100%

Core processing client-side by design

Core utilities

JSON Formatter

Base64 Encoder

JWT Decoder

Regex Tester

UUID Generator

## Rekomendasi urutan pengerjaan

Untuk solo developer yang menggunakan AI Coding Assistant, saya merekomendasikan:

1. Selesaikan Phase 1–3 terlebih dahulu agar fondasi dan keputusan arsitektur tidak berubah-ubah.
2. Pada Phase 4–5, fokus menyelesaikan seluruh UI dan pengalaman pengguna.
3. Pada Phase 6–7, prioritaskan akurasi utility engine dan integrasinya.
4. Phase 8 dikerjakan hanya setelah seluruh P0 stabil.
5. Phase 9–10 menjadi gerbang wajib sebelum public release.

Keputusan arsitektur terpenting: Jangan membangun backend, database, authentication, atau sistem SaaS kompleks terlebih dahulu. DevToolkit pada MVP lebih tepat menjadi kumpulan browser-based developer utilities. Ini membuat pengembangan lebih cepat, biaya infrastruktur lebih rendah, dan pemeliharaan lebih sederhana.

Dokumen ini menjadi single source of truth pengembangan DevToolkit dari bootstrap hingga production release.
