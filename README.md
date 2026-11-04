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

## Core Tools (P0 Scope)

1. **JSON Formatter & Validator**: Format, minify, and validate JSON data locally.
2. **Base64 Encoder / Decoder**: Safe UTF-8 Base64 text encoding and decoding.
3. **JWT Decoder**: Client-side inspection of JWT header and payload with expiry detection.
4. **Regex Tester**: Interactive regular expression testing with real-time match feedback.
5. **UUID Generator**: RFC4122 v4 UUID generator with multi-generation support.

## Getting Started

### Prerequisites

- Node.js >= 18.x
- pnpm >= 9.x

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

# Unit tests
cd devtoolkit && pnpm test

# Production build
cd devtoolkit && pnpm build
```

## Sequential Development Roadmap

- [x] **Phase 1**: Environment & Project Bootstrap
- [ ] **Phase 2**: Technical Planning & Architecture (`TECHNICAL_PLAN.md`)
- [ ] **Phase 3**: UI/UX Planning & Design System (`UI_UX_GUIDE.md`)
- [ ] **Phase 4**: Frontend Foundation
- [ ] **Phase 5**: Core Frontend Features
- [ ] **Phase 6**: Backend & Business Logic Implementation
- [ ] **Phase 7**: Frontend & Backend Integration
- [ ] **Phase 8**: Additional Features & Product Completion
- [ ] **Phase 9**: Testing, Security & Optimization (`TEST_REPORT.md`)
- [ ] **Phase 10**: Production Deployment & Release

