'use client';

import React, { ReactNode } from 'react';
import { CopyButton } from './copy-button';

interface OutputPanelProps {
  title?: string;
  value?: string;
  charCount?: number;
  lineCount?: number;
  actions?: ReactNode;
  children: ReactNode;
}

export function OutputPanel({
  title = 'Output',
  value = '',
  charCount,
  lineCount,
  actions,
  children,
}: OutputPanelProps) {
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
          <CopyButton value={value} size="sm" className="h-7 text-xs" />
        </div>
      </div>

      {/* Panel Body */}
      <div className="flex-1 p-3 flex flex-col">{children}</div>
    </div>
  );
}

