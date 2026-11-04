import React, { ReactNode } from 'react';

interface ToolLayoutProps {
  toolbar?: ReactNode;
  input: ReactNode;
  output: ReactNode;
  footerNote?: ReactNode;
}

export function ToolLayout({ toolbar, input, output, footerNote }: ToolLayoutProps) {
  return (
    <div className="space-y-4">
      {/* Top Toolbar */}
      {toolbar && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/80 bg-card p-3 shadow-sm">
          {toolbar}
        </div>
      )}

      {/* Main Workspace (Split Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[460px]">
        <div className="flex flex-col min-h-[300px] lg:min-h-full">{input}</div>
        <div className="flex flex-col min-h-[300px] lg:min-h-full">{output}</div>
      </div>

      {/* Footer Note / Tips */}
      {footerNote && (
        <div className="rounded-lg border border-border/60 bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
          {footerNote}
        </div>
      )}
    </div>
  );
}

