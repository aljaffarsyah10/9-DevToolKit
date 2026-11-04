'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Terminal, ShieldCheck, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/layout/theme-toggle';

interface HeaderProps {
  onSearchClick?: () => void;
}

export function AppNavbar({ onSearchClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-foreground hover:opacity-90">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Terminal className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight">DevToolkit</span>
              <Badge variant="outline" className="hidden sm:inline-flex text-[10px] py-0 px-1.5 h-4 text-muted-foreground">
                v1.0 MVP
              </Badge>
            </div>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/"
              className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Tools
            </Link>
            <Link
              href="/about"
              className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Privacy
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Client-Side Guarantee Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 border border-border/60 px-2.5 py-1 rounded-full">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>100% Client-Side</span>
          </div>

          {/* Quick Search Button */}
          {onSearchClick && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSearchClick}
              className="h-8 gap-2 text-xs text-muted-foreground bg-muted/40 hover:bg-muted hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search tools...</span>
              <kbd className="hidden sm:inline-flex pointer-events-none h-4 select-none items-center gap-1 rounded border bg-background px-1 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background p-4 md:hidden space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Tools
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            About
          </Link>
          <Link
            href="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            Privacy
          </Link>
          <div className="pt-2 border-t border-border flex items-center gap-2 text-xs text-muted-foreground px-3 py-1">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Data is processed locally in your browser.</span>
          </div>
        </div>
      )}
    </header>
  );
}

