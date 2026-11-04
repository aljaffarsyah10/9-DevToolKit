'use client';

import React, { ReactNode } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InputPanelProps {
  title?: string;
  charCount?: number;
  lineCount?: number;
  onClear?: () => void;
  actions?: ReactNode;
  children: ReactNode;
}

export function InputPanel({
  title = 'Input',
  charCount,
  lineCount,
  onClear,
  actions,
  children,
}: InputPanelProps) {
  return (
    <div className="flex flex-col h-full rounded-xl border border-border/80 bg-card overflow-hidden shadow-sm">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-border/80 bg-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
            {title}
          </span>
          {(charCount !== undefined || lineCount !== undefined) && (
            <span className="text-[11px] font-mono text-muted-foreground">
              {lineCount !== undefined && `${lineCount} lines`}
              {charCount !== undefined && ` • ${charCount.toLocaleString()} chars`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {actions}
          {onClear && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
              title="Clear input"
              aria-label="Clear input"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              <span>Clear</span>
            </Button>
          )}
        </div>
      </div>

      {/* Panel Body */}
      <div className="flex-1 p-3 flex flex-col">{children}</div>
    </div>
  );
}

