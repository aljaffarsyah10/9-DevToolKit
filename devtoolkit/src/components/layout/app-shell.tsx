'use client';

import React, { ReactNode } from 'react';
import { AppNavbar } from './header';
import { AppFooter } from './footer';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const handleSearchClick = () => {
    // Focus search input on homepage if present
    const searchInput = document.getElementById('search-tools-input');
    if (searchInput) {
      searchInput.focus();
    } else {
      window.location.href = '/#search-tools-input';
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <AppNavbar onSearchClick={handleSearchClick} />
      <main className="flex-1 w-full">{children}</main>
      <AppFooter />
    </div>
  );
}

