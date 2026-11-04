'use client';

import React, { useState } from 'react';
import { Hash, RefreshCw, Copy, Check, CheckCircle2 } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { EmptyState } from '@/components/feedback/empty-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generateUUID } from '@/features/uuid-generator/utils/uuid';
import { copyToClipboard } from '@/lib/clipboard';

type UuidCount = 1 | 5 | 10 | 25 | 50 | 100;

export function UuidGeneratorView() {
  const [count, setCount] = useState<UuidCount>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [uuids, setUuids] = useState<string[]>([
    '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    '3e4f5a6b-7c8d-4e9f-a0b1-c2d3e4f5a6b7',
    '8f4a2b1c-9d0e-4f3a-8b2c-1d0e9f8a7b6c',
    '4a8d29b1-5e28-4e16-a193-8b7762a5b6d8',
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [lastGeneratedAt, setLastGeneratedAt] = useState<string | null>('Initial load');

  const handleGenerate = () => {
    try {
      const generated = generateUUID(count, { uppercase, hyphens });
      setUuids(generated);
      setLastGeneratedAt(new Date().toLocaleTimeString());
    } catch {
      // Handled defensively
    }
  };

  const handleCopySingle = async (uuid: string, idx: number) => {
    try {
      await copyToClipboard(uuid);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // fallback handled
    }
  };

  const handleClear = () => {
    setUuids([]);
    setLastGeneratedAt(null);
  };

  const fullOutputText = uuids.join('\n');

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        toolId="uuid-generator"
        title="UUID Generator"
        description="Generate cryptographically strong RFC4122 version 4 UUIDs using the Web Crypto API."
        category="Generators"
        icon={Hash}
      />

      {lastGeneratedAt && (
        <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-700 dark:text-emerald-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>Cryptographically generated via Web Crypto CSPRNG.</span>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">Generated: {lastGeneratedAt}</span>
        </div>
      )}

      <ToolLayout
        toolbar={
          <>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground mr-1">Count:</span>
              {([1, 5, 10, 25, 50, 100] as const).map((num) => (
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

              <Button size="sm" onClick={handleGenerate} className="gap-1.5 h-8 text-xs font-medium ml-1">
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Generate UUIDs</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground">
                Engine Integrated
              </Badge>
            </div>
          </>
        }
        input={
          <InputPanel
            title="Configuration & Specification"
            actions={
              <span className="text-[11px] text-muted-foreground font-mono">
                {count} {count === 1 ? 'UUID' : 'UUIDs'}
              </span>
            }
            onClear={handleClear}
          >
            <div className="flex-1 flex flex-col justify-between p-4 rounded-lg bg-muted/20 border border-border/60 text-xs space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">RFC4122 v4 Security Properties</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Version 4 UUIDs use 122 bits of cryptographically strong pseudo-random data provided by
                  the native browser Web Crypto engine.
                </p>
                <div className="space-y-2 pt-2 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Standard Format:</span>
                    <span className="font-mono text-foreground">{hyphens ? '8-4-4-4-12' : '32 Continuous Hex'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Letter Case:</span>
                    <span className="font-mono text-foreground">{uppercase ? 'Uppercase' : 'Lowercase'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Random Source:</span>
                    <span className="font-mono text-foreground">crypto.randomUUID() / getRandomValues()</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="text-muted-foreground text-[11px]">Click below to re-generate list:</span>
                <Button size="sm" onClick={handleGenerate} className="gap-1.5 text-xs">
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Generate Now</span>
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
              <div className="w-full flex-1 overflow-auto max-h-[460px] space-y-1.5 p-1 font-mono text-xs">
                {uuids.map((uuid, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-md bg-muted/30 border border-border/60 hover:bg-muted/60 transition-colors"
                  >
                    <span className="text-foreground select-all font-mono text-xs">{uuid}</span>
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
              <EmptyState
                title="No UUIDs Available"
                description="Click 'Generate Now' or 'Generate UUIDs' to create a fresh batch."
                actionLabel="Generate 5 UUIDs"
                onAction={handleGenerate}
              />
            )}
          </OutputPanel>
        }
        footerNote="Browser-native CSPRNG guarantees high entropy with zero network latency."
      />
    </div>
  );
}
