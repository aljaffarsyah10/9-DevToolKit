'use client';

import React from 'react';
import Link from 'next/link';
import {
  Braces,
  Binary,
  KeyRound,
  SearchCode,
  Hash,
  Link2,
  Calendar,
  Shield,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ToolMetadata } from '@/types/tool';
import { useToolPreferences } from '@/hooks/use-tool-preferences';

interface ToolCardProps {
  tool: ToolMetadata;
}

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

const CATEGORY_COLOR_MAP: Record<string, string> = {
  formatters: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  encoders: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  security: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  testers: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  generators: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
};

export function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = ICON_MAP[tool.iconName] || Braces;
  const categoryClass = CATEGORY_COLOR_MAP[tool.category] || 'bg-muted text-muted-foreground border-border';
  const { isFavorite, toggleFavorite, isLoaded } = useToolPreferences();
  const favorited = isLoaded && isFavorite(tool.id);

  const handleStarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(tool.id);
  };

  return (
    <Link href={`/tools/${tool.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
      <Card className="h-full border border-border/80 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 relative">
        <CardHeader className="p-5 pb-3">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
              <IconComponent className="h-5 w-5" />
            </div>

            <div className="flex items-center gap-1.5">
              <Badge variant="outline" className={`text-[11px] font-medium border ${categoryClass}`}>
                {tool.categoryLabel}
              </Badge>

              {/* Favorite Star Button */}
              <button
                type="button"
                onClick={handleStarClick}
                className={`p-1.5 rounded-md hover:bg-muted transition-colors ${
                  favorited ? 'text-amber-500' : 'text-muted-foreground/60 hover:text-amber-500'
                }`}
                title={favorited ? 'Remove from favorites' : 'Add to favorites'}
                aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star className={`h-4 w-4 ${favorited ? 'fill-amber-500' : ''}`} />
              </button>
            </div>
          </div>

          <CardTitle className="text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {tool.name}
          </CardTitle>

          <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
            {tool.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 pt-0 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 text-[11px]">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            Client-side
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Open tool
            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
