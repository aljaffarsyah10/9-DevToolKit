'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Braces,
  Binary,
  KeyRound,
  SearchCode,
  Hash,
  Link2,
  Calendar,
  Shield,
  ArrowRight,
  X,
  Star,
} from 'lucide-react';
import { TOOLS } from '@/data/tools';
import { useToolPreferences } from '@/hooks/use-tool-preferences';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Braces,
  Binary,
  KeyRound,
  SearchCode,
  Hash,
  Link2,
  Calendar,
  Shield,
};

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isFavorite, isLoaded } = useToolPreferences();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredTools = TOOLS.filter((tool) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q)) ||
      tool.categoryLabel.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (slug: string) => {
    onClose();
    router.push(`/tools/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredTools.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % (filteredTools.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        handleSelect(filteredTools[selectedIndex].slug);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-border px-3.5 py-3 gap-2.5">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a tool name or command..."
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground rounded"
            aria-label="Close command palette"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredTools.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No developer tools found matching &quot;{query}&quot;.
            </div>
          ) : (
            filteredTools.map((tool, index) => {
              const Icon = ICON_MAP[tool.iconName] || Braces;
              const isSelected = index === selectedIndex;
              const favorited = isLoaded && isFavorite(tool.id);

              return (
                <div
                  key={tool.id}
                  onClick={() => handleSelect(tool.slug)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`h-7 w-7 rounded-md flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 truncate">
                      <div className="font-medium truncate flex items-center gap-1.5">
                        <span>{tool.name}</span>
                        {favorited && (
                          <Star className={`h-3 w-3 ${isSelected ? 'fill-primary-foreground text-primary-foreground' : 'fill-amber-500 text-amber-500'}`} />
                        )}
                      </div>
                      <div
                        className={`text-xs truncate ${
                          isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                        }`}
                      >
                        {tool.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span
                      className={`text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded border ${
                        isSelected
                          ? 'border-primary-foreground/30 text-primary-foreground'
                          : 'border-border text-muted-foreground bg-muted/50'
                      }`}
                    >
                      {tool.categoryLabel}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="border-t border-border bg-muted/40 px-3 py-2 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Navigate with <kbd className="font-mono bg-background border px-1 rounded">↑</kbd> <kbd className="font-mono bg-background border px-1 rounded">↓</kbd></span>
          <span>Select with <kbd className="font-mono bg-background border px-1 rounded">↵</kbd></span>
        </div>
      </div>
    </div>
  );
}

