'use client';

import React, { useSyncExternalStore, useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const THEME_STORAGE_KEY = 'devtoolkit_theme';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('devtoolkit_theme_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('devtoolkit_theme_change', callback);
  };
}

function getSnapshot(): 'light' | 'dark' {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  } catch {
    return 'light';
  }
}

function getServerSnapshot(): 'light' | 'dark' {
  return 'light';
}

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      window.dispatchEvent(new Event('devtoolkit_theme_change'));
    } catch {
      // Ignore
    }
  }, [theme]);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground"
        aria-label="Toggle theme"
      >
        <Moon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-8 w-8 text-muted-foreground hover:text-foreground"
      title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}
