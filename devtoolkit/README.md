# DevToolkit (Next.js Application)

> **All your essential developer tools in one place. 100% client-side. Zero server uploads. No ads.**

This directory contains the Next.js 16 (App Router) codebase for DevToolkit. For the complete project documentation, architectural plan, and quality reports, see the root [README.md](../README.md).

---

## 🚀 Quick Start (Development)

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Verification & Quality Checks

```bash
# Run all 77 automated test suites (Vitest)
pnpm test

# Run tests in interactive watch mode
pnpm test:watch

# TypeScript strict type checking
pnpm exec tsc --noEmit

# ESLint analysis
pnpm lint

# Production build
pnpm build

# Run production standalone server
node .next/standalone/server.js
```

---

## 📦 Key Directory Structure

- `src/app/`: Next.js App Router pages and metadata
- `src/components/`: Reusable UI, layout, feedback, and panel components
- `src/features/`: Isolated feature modules (UI components + pure utility engines)
- `src/hooks/`: Reactive hooks (`useToolPreferences` via `useSyncExternalStore`)
- `src/lib/`: Clipboard and download helpers
- `tests/`: Unit, component integration, and simulated E2E user workflow tests
