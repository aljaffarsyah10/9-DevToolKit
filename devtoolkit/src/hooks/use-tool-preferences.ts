'use client';

import { useSyncExternalStore, useCallback, useMemo } from 'react';

const FAVORITES_STORAGE_KEY = 'devtoolkit_favorites';
const RECENT_STORAGE_KEY = 'devtoolkit_recently_used';
const MAX_RECENT_ITEMS = 10;

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('devtoolkit_prefs_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('devtoolkit_prefs_change', callback);
  };
}

function getFavoritesSnapshot(): string {
  try {
    return localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]';
  } catch {
    return '[]';
  }
}

function getRecentlyUsedSnapshot(): string {
  try {
    return localStorage.getItem(RECENT_STORAGE_KEY) || '[]';
  } catch {
    return '[]';
  }
}

const EMPTY_JSON_ARRAY = '[]';
const emptySubscribe = () => () => {};

export function useToolPreferences() {
  const isLoaded = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const rawFavorites = useSyncExternalStore(
    subscribe,
    getFavoritesSnapshot,
    () => EMPTY_JSON_ARRAY
  );

  const rawRecentlyUsed = useSyncExternalStore(
    subscribe,
    getRecentlyUsedSnapshot,
    () => EMPTY_JSON_ARRAY
  );

  const favorites = useMemo(() => {
    try {
      return JSON.parse(rawFavorites) as string[];
    } catch {
      return [];
    }
  }, [rawFavorites]);

  const recentlyUsed = useMemo(() => {
    try {
      return JSON.parse(rawRecentlyUsed) as string[];
    } catch {
      return [];
    }
  }, [rawRecentlyUsed]);

  const toggleFavorite = useCallback((toolId: string) => {
    try {
      const current: string[] = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]');
      const next = current.includes(toolId)
        ? current.filter((id) => id !== toolId)
        : [...current, toolId];
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event('devtoolkit_prefs_change'));
    } catch {
      // Ignore
    }
  }, []);

  const isFavorite = useCallback(
    (toolId: string) => {
      return favorites.includes(toolId);
    },
    [favorites]
  );

  const addRecentlyUsed = useCallback((toolId: string) => {
    try {
      const current: string[] = JSON.parse(localStorage.getItem(RECENT_STORAGE_KEY) || '[]');
      if (current[0] === toolId) return;
      const filtered = current.filter((id) => id !== toolId);
      const next = [toolId, ...filtered].slice(0, MAX_RECENT_ITEMS);
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event('devtoolkit_prefs_change'));
    } catch {
      // Ignore
    }
  }, []);

  return {
    favorites,
    recentlyUsed,
    isFavorite,
    toggleFavorite,
    addRecentlyUsed,
    isLoaded,
  };
}
