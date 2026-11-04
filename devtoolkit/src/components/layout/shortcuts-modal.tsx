'use client';

import React from 'react';
import { Keyboard, X } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUT_GROUPS = [
  {
    title: 'Navigation & Search',
    items: [
      { keyCombo: ['⌘', 'K'], label: 'Open Command Palette & Tool Switcher' },
      { keyCombo: ['?'], label: 'Open Keyboard Shortcuts Reference' },
      { keyCombo: ['Esc'], label: 'Close Active Modal / Dropdown' },
    ],
  },
  {
    title: 'Editor & Utility Actions',
    items: [
      { keyCombo: ['Tab'], label: 'Insert indentation in monospace editors' },
      { keyCombo: ['Shift', 'Tab'], label: 'Navigate focus between panels' },
      { keyCombo: ['⌘', 'C'], label: 'Copy active selection or result' },
    ],
  },
  {
    title: 'Privacy & Offline Workflows',
    items: [
      { keyCombo: ['100% Local'], label: 'Zero network calls for processing payloads' },
      { keyCombo: ['Local Storage'], label: 'Saves only UI theme & tool favorites' },
    ],
  },
];

export function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard Shortcuts"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Keyboard className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Keyboard Shortcuts</h2>
              <p className="text-xs text-muted-foreground">DevToolkit power-user hotkeys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
            aria-label="Close shortcuts modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {SHORTCUT_GROUPS.map((group) => (
            <div key={group.title} className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </h3>
              <div className="space-y-1.5">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/50 text-xs"
                  >
                    <span className="text-foreground">{item.label}</span>
                    <div className="flex items-center gap-1 shrink-0 ml-3">
                      {item.keyCombo.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="h-5 min-w-5 px-1.5 flex items-center justify-center rounded border border-border bg-muted font-mono text-[10px] font-semibold text-muted-foreground"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-muted/30 px-5 py-3 text-right">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-foreground bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

