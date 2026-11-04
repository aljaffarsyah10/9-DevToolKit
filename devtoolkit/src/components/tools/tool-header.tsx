import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ToolHeaderProps {
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
}

export function ToolHeader({ title, description, category, icon: Icon }: ToolHeaderProps) {
  return (
    <div className="space-y-4 mb-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
        <Link href="/" className="hover:text-foreground transition-colors">
          Tools
        </Link>
        <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
        <span className="text-foreground font-medium">{title}</span>
      </nav>

      {/* Main Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{title}</h1>
              <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold">
                {category}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>

        {/* Client-side guarantee badge */}
        <div className="self-start sm:self-auto flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>100% Client-Side</span>
        </div>
      </div>
    </div>
  );
}

