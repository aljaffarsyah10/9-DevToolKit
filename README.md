# DevToolkit — Developer Utilities Platform

> All your essential developer tools in one place.

DevToolkit is a web-based developer utility platform providing essential client-side tools with a clean, unified interface.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Validation**: Zod
- **Testing**: Vitest & React Testing Library
- **Package Manager**: pnpm

## Core & Supporting Utilities Suite (8 Tools)

### Core P0 Utilities
1. **JSON Formatter & Validator**: Format, minify, and validate JSON data locally with custom indentation.
2. **Base64 Encoder / Decoder**: Safe UTF-8 Base64 text encoding and decoding with full emoji support.
3. **JWT Decoder**: Client-side inspection of JWT header and payload claims with automated expiry detection.
4. **Regex Tester**: Interactive regular expression testing with real-time match highlights and loop protection.
5. **UUID Generator**: Cryptographically secure RFC4122 v4 UUID generator with batch generation options.

### High-Value P1 Utilities
6. **URL Encoder / Decoder**: Standard percent-encoding and decoding for query strings and URIs.
7. **Unix Timestamp Converter**: Epoch converter between seconds, milliseconds, ISO 8601, and relative time.
8. **Hash Generator**: Cryptographic hash calculation (SHA-256, SHA-512, SHA-1) using Web Crypto API.

## Project Documentation

- [Technical Architecture Plan (TECHNICAL_PLAN.md)](TECHNICAL_PLAN.md)
- [UI/UX Design System Guide (UI_UX_GUIDE.md)](UI_UX_GUIDE.md)
- [Comprehensive Test & Quality Report (TEST_REPORT.md)](TEST_REPORT.md)
- [Production Deployment Guide (DEPLOYMENT_GUIDE.md)](DEPLOYMENT_GUIDE.md)
- [Official Release Notes (RELEASE_NOTES.md)](RELEASE_NOTES.md)

## Getting Started

### Prerequisites

- Node.js >= 20.x
- pnpm >= 10.x

### Installation & Development

```bash
cd devtoolkit
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Verification & Testing

```bash
# Type check
cd devtoolkit && pnpm exec tsc --noEmit

# ESLint analysis
cd devtoolkit && pnpm lint

# Unit, integration & E2E tests (77/77 passing)
cd devtoolkit && pnpm test

# Production build
cd devtoolkit && pnpm build
```

## Sequential Development Roadmap

- [x] **Phase 1**: Environment & Project Bootstrap
- [x] **Phase 2**: Technical Planning & Architecture (`TECHNICAL_PLAN.md`)
- [x] **Phase 3**: UI/UX Planning & Design System (`UI_UX_GUIDE.md`)
- [x] **Phase 4**: Frontend Foundation
- [x] **Phase 5**: Core Frontend Features
- [x] **Phase 6**: Backend & Business Logic Implementation
- [x] **Phase 7**: Frontend & Backend Integration
- [x] **Phase 8**: Additional Features & Product Completion
- [x] **Phase 9**: Testing, Security & Optimization (`TEST_REPORT.md`)
- [x] **Phase 10**: Production Deployment & Release (`DEPLOYMENT_GUIDE.md`, `RELEASE_NOTES.md`)

