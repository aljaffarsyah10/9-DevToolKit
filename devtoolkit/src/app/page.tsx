'use client';

import React, { useState, useMemo } from 'react';
import { Search, Shield, Zap, Lock, Terminal, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToolGrid } from '@/components/tools/tool-grid';
import { EmptyState } from '@/components/feedback/empty-state';
import { TOOLS, CATEGORIES } from '@/data/tools';
import { ToolCategory } from '@/types/tool';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.some((k) => k.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          <span>DevToolkit v1.0 MVP — Core Utilities Suite</span>
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
            placeholder="Search tools by name, keyword, or action... (e.g., json, base64, jwt, regex, uuid)"
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
              {selectedCategory === 'all' ? 'All Developer Tools' : `${selectedCategory} Tools`}
            </h2>
            <Badge variant="outline" className="text-xs">
              {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </Badge>
          </div>
        </div>

        {filteredTools.length > 0 ? (
          <ToolGrid tools={filteredTools} />
        ) : (
          <EmptyState
            type="search"
            title="No matching tools found"
            description={`No utility tools match your search query "${searchQuery}". Try a different keyword or reset filters.`}
            actionLabel="Reset Search & Filters"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          />
        )}
      </section>
    </div>
  );
}
