'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'devtoolkit_favorites';
const RECENT_STORAGE_KEY = 'devtoolkit_recently_used';
const MAX_RECENT_ITEMS = 10;

export function useToolPreferences() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const storedFavs = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }

      const storedRecent = localStorage.getItem(RECENT_STORAGE_KEY);
      if (storedRecent) {
        setRecentlyUsed(JSON.parse(storedRecent));
      }
    } catch {
      // Ignore JSON parse or storage errors
    }
  }, []);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId];

      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (toolId: string) => {
      return favorites.includes(toolId);
    },
    [favorites]
  );

  const addRecentlyUsed = useCallback((toolId: string) => {
    setRecentlyUsed((prev) => {
      if (prev[0] === toolId) return prev;
      const filtered = prev.filter((id) => id !== toolId);
      const next = [toolId, ...filtered].slice(0, MAX_RECENT_ITEMS);

      try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  return {
    favorites,
    recentlyUsed,
    isFavorite,
    toggleFavorite,
    addRecentlyUsed,
    isLoaded: mounted,
  };
}
