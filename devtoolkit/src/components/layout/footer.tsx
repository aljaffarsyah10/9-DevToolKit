import React from 'react';
import Link from 'next/link';
import { Terminal, Shield, Cpu, Lock } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-card/40 text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2 font-bold text-sm">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Terminal className="h-3.5 w-3.5" />
              </div>
              <span>DevToolkit</span>
            </div>
            <p className="text-xs text-muted-foreground text-center md:text-left max-w-md">
              Essential developer utilities designed for speed, simplicity, and zero data leakage.
            </p>
          </div>

          {/* Privacy & Architecture badges */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5 text-blue-500" />
              <span>Browser Runtime</span>
            </span>
            <span className="text-border">•</span>
            <span className="inline-flex items-center gap-1">
              <Lock className="h-3.5 w-3.5 text-amber-500" />
              <span>Zero Server Telemetry</span>
            </span>
            <span className="text-border">•</span>
            <span className="inline-flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>100% Client-Side</span>
            </span>
          </div>

          {/* Links & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-foreground transition-colors">
                Tools
              </Link>
              <Link href="/about" className="hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </div>
            <span>© 2026 DevToolkit. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

