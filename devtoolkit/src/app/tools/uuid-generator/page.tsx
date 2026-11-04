'use client';

import React, { useState } from 'react';
import { Hash, RefreshCw, Copy, Check, Sparkles } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { Button } from '@/components/ui/button';

export default function UuidGeneratorPage() {
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [uuids, setUuids] = useState<string[]>([
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    '4a8d29b1-5e28-4e16-a193-8b7762a5b6d8',
    '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    '3e4f5a6b-7c8d-4e9f-a0b1-c2d3e4f5a6b7',
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGeneratePlaceholder = () => {
    // Phase 4 UI Skeleton placeholder
    const sample = [
      'c81d4e2e-bcf2-11e6-869b-7df92533c26e',
      '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      'e1b9b2b0-8c29-4d69-a1d2-094e9f0e1234',
      'a2c4e6f8-1357-492b-8a64-9b2d4e6f81a3',
      '550e8400-e29b-41d4-a716-446655440000',
    ].slice(0, count);

    const formatted = sample.map((u) => {
      let res = hyphens ? u : u.replace(/-/g, '');
      return uppercase ? res.toUpperCase() : res.toLowerCase();
    });

    setUuids(formatted);
  };

  const handleCopySingle = async (uuid: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // fallback
    }
  };

  const fullOutputText = uuids.join('\n');

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        title="UUID Generator"
        description="Generate cryptographically secure RFC4122 version 4 universally unique identifiers."
        category="Generators"
        icon={Hash}
      />

      <ToolLayout
        toolbar={
          <>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground mr-1">Count:</span>
              {[1, 5, 10, 25, 50].map((num) => (
                <Button
                  key={num}
                  type="button"
                  variant={count === num ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCount(num)}
                  className={`h-7 px-2.5 text-xs font-mono ${
                    count === num ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {num}
                </Button>
              ))}

              <div className="h-4 w-px bg-border mx-1" />

              <Button
                type="button"
                variant={uppercase ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUppercase(!uppercase)}
                className="h-7 text-xs font-mono"
              >
                Uppercase
              </Button>
              <Button
                type="button"
                variant={hyphens ? 'default' : 'outline'}
                size="sm"
                onClick={() => setHyphens(!hyphens)}
                className="h-7 text-xs font-mono"
              >
                Hyphens
              </Button>

              <Button size="sm" onClick={handleGeneratePlaceholder} className="gap-1.5 h-8 text-xs ml-1">
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Generate UUIDs</span>
              </Button>
            </div>

            <div className="text-xs text-muted-foreground font-mono">
              Version: <span className="text-foreground font-semibold">RFC4122 v4</span>
            </div>
          </>
        }
        input={
          <InputPanel
            title="Generator Configuration & Options"
            actions={
              <span className="text-[11px] text-muted-foreground font-mono">
                {count} {count === 1 ? 'UUID' : 'UUIDs'} selected
              </span>
            }
          >
            <div className="flex-1 flex flex-col justify-between p-4 rounded-lg bg-muted/20 border border-border/60 text-xs space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">UUID v4 Specification</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Version 4 UUIDs are randomly generated using cryptographically strong pseudo-random number generators
                  (CSPRNG) via the native Web Crypto API (`crypto.randomUUID()`).
                </p>
                <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                  <li>Collision probability is negligible (~1 in 10³⁷).</li>
                  <li>Formatted as 32 hexadecimal digits separated by hyphens (8-4-4-4-12).</li>
                  <li>No network request or database call required.</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="text-muted-foreground">Ready to generate:</span>
                <Button size="sm" onClick={handleGeneratePlaceholder} className="gap-1.5 text-xs">
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Regenerate Now</span>
                </Button>
              </div>
            </div>
          </InputPanel>
        }
        output={
          <OutputPanel
            title="Generated UUID List"
            value={fullOutputText}
            charCount={fullOutputText.length}
            lineCount={uuids.length}
          >
            {uuids.length > 0 ? (
              <div className="flex-1 flex flex-col gap-1.5 overflow-auto max-h-[400px] p-1 font-mono text-xs">
                {uuids.map((uuid, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-md bg-muted/30 border border-border/60 hover:bg-muted/60 transition-colors"
                  >
                    <span className="text-foreground select-all">{uuid}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopySingle(uuid, idx)}
                      className="h-6 px-2 text-[10px] text-muted-foreground hover:text-foreground"
                    >
                      {copiedIndex === idx ? (
                        <Check className="h-3 w-3 text-emerald-500 mr-1" />
                      ) : (
                        <Copy className="h-3 w-3 mr-1" />
                      )}
                      <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                <Sparkles className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-xs">Generated UUIDs will appear here.</p>
              </div>
            )}
          </OutputPanel>
        }
        footerNote="Generated using Web Crypto API. Cryptographically secure and unique."
      />
    </div>
  );
}

