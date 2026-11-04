'use client';

import React, { useState, useMemo } from 'react';
import { Search, Shield, Zap, Lock, Terminal, Sparkles, Star, History, Grid } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToolGrid } from '@/components/tools/tool-grid';
import { EmptyState } from '@/components/feedback/empty-state';
import { TOOLS, CATEGORIES } from '@/data/tools';
import { ToolCategory } from '@/types/tool';
import { useToolPreferences } from '@/hooks/use-tool-preferences';

type ViewMode = 'all' | 'favorites' | 'recent';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const { favorites, recentlyUsed, isLoaded } = useToolPreferences();

  const filteredTools = useMemo(() => {
    let list = [...TOOLS];

    // Apply View Mode
    if (viewMode === 'favorites') {
      list = list.filter((tool) => favorites.includes(tool.id));
    } else if (viewMode === 'recent') {
      if (recentlyUsed.length > 0) {
        list = recentlyUsed
          .map((id) => list.find((t) => t.id === id))
          .filter((t): t is typeof TOOLS[number] => Boolean(t));
      } else {
        list = [];
      }
    }

    // Apply Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter((tool) => tool.category === selectedCategory);
    }

    // Apply Search Query
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.keywords.some((k) => k.toLowerCase().includes(query))
      );
    }

    return list;
  }, [searchQuery, selectedCategory, viewMode, favorites, recentlyUsed]);

  const favoriteCount = isLoaded ? favorites.length : 0;
  const recentCount = isLoaded ? recentlyUsed.length : 0;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          <span>DevToolkit v1.0 MVP — Developer Utilities Suite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          All your essential developer tools{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            in one place.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Fast, distraction-free developer utilities executed 100% locally in your browser.
          No ads, no tracking, and zero data leaves your machine.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
          <Badge variant="secondary" className="gap-1.5 py-1 px-3">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>Instant Results</span>
          </Badge>
          <Badge variant="secondary" className="gap-1.5 py-1 px-3">
            <Lock className="h-3.5 w-3.5 text-blue-500" />
            <span>Zero Server Uploads</span>
          </Badge>
          <Badge variant="secondary" className="gap-1.5 py-1 px-3">
            <Shield className="h-3.5 w-3.5 text-emerald-500" />
            <span>100% Client-Side</span>
          </Badge>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="space-y-4 max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-tools-input"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools by name, keyword, or action... (e.g., json, base64, jwt, regex, uuid, url, hash)"
            className="pl-10 pr-20 h-11 text-sm bg-card border-border/80 shadow-sm focus-visible:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground font-mono"
            >
              Clear
            </button>
          )}
        </div>

        {/* View Mode Switcher (All / Favorites / Recently Used) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-b border-border/60 pb-3">
          <div className="inline-flex p-1 rounded-lg bg-muted/60 border border-border/60 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('all')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === 'all'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>All Tools</span>
              <span className="text-[10px] px-1.5 rounded bg-muted text-muted-foreground font-mono">
                {TOOLS.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('favorites')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === 'favorites'
                  ? 'bg-card text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Star className={`h-3.5 w-3.5 ${viewMode === 'favorites' ? 'fill-amber-500' : ''}`} />
              <span>Favorites</span>
              {favoriteCount > 0 && (
                <span className="text-[10px] px-1.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono">
                  {favoriteCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setViewMode('recent')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === 'recent'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <History className="h-3.5 w-3.5" />
              <span>Recent</span>
              {recentCount > 0 && (
                <span className="text-[10px] px-1.5 rounded bg-muted text-muted-foreground font-mono">
                  {recentCount}
                </span>
              )}
            </button>
          </div>

          <div className="text-xs text-muted-foreground hidden sm:block">
            Press <kbd className="font-mono bg-muted px-1.5 py-0.5 rounded border border-border">⌘K</kbd> to jump to any tool
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? TOOLS.length
                : TOOLS.filter((t) => t.category === cat.id).length;

            const isSelected = selectedCategory === cat.id;

            return (
              <Button
                key={cat.id}
                type="button"
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className={`h-8 rounded-full text-xs font-medium gap-1.5 transition-all ${
                  isSelected
                    ? 'shadow-sm'
                    : 'text-muted-foreground hover:text-foreground bg-card'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {count}
                </span>
              </Button>
            );
          })}
        </div>
      </section>

      {/* Tool Grid Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {viewMode === 'favorites'
                ? 'Starred Favorite Tools'
                : viewMode === 'recent'
                ? 'Recently Opened Tools'
                : selectedCategory === 'all'
                ? 'All Developer Tools'
                : `${selectedCategory} Tools`}
            </h2>
            <Badge variant="outline" className="text-xs">
              {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </Badge>
          </div>
        </div>

        {filteredTools.length > 0 ? (
          <ToolGrid tools={filteredTools} />
        ) : viewMode === 'favorites' ? (
          <EmptyState
            type="info"
            title="No favorite tools yet"
            description="Star any developer tool using the star icon on its card to quickly access your favorite utilities here."
            actionLabel="View All Tools"
            onAction={() => setViewMode('all')}
          />
        ) : viewMode === 'recent' ? (
          <EmptyState
            type="info"
            title="No recently opened tools"
            description="As you open and use developer utilities, they will automatically appear here for quick access."
            actionLabel="Browse All Tools"
            onAction={() => setViewMode('all')}
          />
        ) : (
          <EmptyState
            type="search"
            title="No matching tools found"
            description={`No utility tools match your search query "${searchQuery}". Try a different keyword or reset filters.`}
            actionLabel="Reset Search & Filters"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setViewMode('all');
            }}
          />
        )}
      </section>
    </div>
  );
}
