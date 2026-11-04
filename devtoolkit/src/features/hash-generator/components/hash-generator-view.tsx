'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Play, CheckCircle2, FileCode } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { ErrorMessage } from '@/components/feedback/error-message';
import { EmptyState } from '@/components/feedback/empty-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generateHash, HashAlgorithm } from '@/features/hash-generator/utils/hash';
import { useToolPreferences } from '@/hooks/use-tool-preferences';

const SAMPLE_INPUT = 'The quick brown fox jumps over the lazy dog';

export function HashGeneratorView() {
  const [input, setInput] = useState<string>(SAMPLE_INPUT);
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [hashOutput, setHashOutput] = useState<string>('');
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const { addRecentlyUsed } = useToolPreferences();

  useEffect(() => {
    addRecentlyUsed('hash-generator');
  }, [addRecentlyUsed]);

  const handleComputeHash = async () => {
    if (!input) {
      setError('Please provide input text to compute hash.');
      setHashOutput('');
      setStatusMsg(null);
      return;
    }

    try {
      const hex = await generateHash(input, algorithm);
      const formatted = uppercase ? hex.toUpperCase() : hex.toLowerCase();
      setHashOutput(formatted);
      setError(null);
      setStatusMsg(`Computed ${algorithm} hash successfully.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Hash calculation failed';
      setError(msg);
      setHashOutput('');
      setStatusMsg(null);
    }
  };

  const handleClear = () => {
    setInput('');
    setHashOutput('');
    setError(null);
    setStatusMsg(null);
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_INPUT);
    setHashOutput('');
    setError(null);
    setStatusMsg(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        toolId="hash-generator"
        title="Hash Generator"
        description="Compute cryptographic hashes (SHA-256, SHA-512, SHA-1) client-side using Web Crypto."
        category="Security"
        icon={Shield}
      />

      {error && <ErrorMessage message="Hash Calculation Error" details={error} />}

      {statusMsg && !error && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>{statusMsg}</span>
        </div>
      )}

      <ToolLayout
        toolbar={
          <>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium mr-1">Algorithm:</span>
              {(['SHA-256', 'SHA-512', 'SHA-1'] as const).map((algo) => (
                <Button
                  key={algo}
                  type="button"
                  variant={algorithm === algo ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setAlgorithm(algo);
                    setHashOutput('');
                  }}
                  className={`h-7 px-2.5 text-xs font-mono ${
                    algorithm === algo ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {algo}
                </Button>
              ))}

              <div className="h-4 w-px bg-border mx-1" />

              <Button
                type="button"
                variant={uppercase ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setUppercase(!uppercase);
                  if (hashOutput) {
                    setHashOutput(uppercase ? hashOutput.toLowerCase() : hashOutput.toUpperCase());
                  }
                }}
                className="h-7 text-xs font-mono"
              >
                Uppercase
              </Button>

              <Button size="sm" onClick={handleComputeHash} className="gap-1.5 h-8 text-xs font-medium ml-1">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Calculate Hash</span>
              </Button>

              <div className="h-4 w-px bg-border mx-1" />

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLoadSample}
                className="gap-1 h-8 text-xs text-muted-foreground hover:text-foreground"
              >
                <FileCode className="h-3.5 w-3.5" />
                <span>Load Sample</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground">
                crypto.subtle
              </Badge>
            </div>
          </>
        }
        input={
          <InputPanel
            title="Input Text String"
            charCount={input.length}
            onClear={handleClear}
          >
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(null);
                if (statusMsg) setStatusMsg(null);
              }}
              placeholder="Enter text to compute cryptographic hash digest..."
              className="w-full flex-1 min-h-[380px] resize-none bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          </InputPanel>
        }
        output={
          <OutputPanel
            title={`${algorithm} Hex Digest`}
            value={hashOutput}
            charCount={hashOutput.length}
            actions={
              hashOutput && (
                <span className="text-[11px] font-mono text-muted-foreground mr-2">
                  {hashOutput.length * 4} bits
                </span>
              )
            }
          >
            {hashOutput ? (
              <pre className="w-full flex-1 min-h-[380px] overflow-auto font-mono text-xs text-foreground leading-relaxed p-1 break-all">
                {hashOutput}
              </pre>
            ) : (
              <EmptyState
                title="No Hash Generated"
                description={`Enter input on the left and click 'Calculate Hash' to produce the ${algorithm} digest.`}
                actionLabel="Load Sample Text"
                onAction={handleLoadSample}
              />
            )}
          </OutputPanel>
        }
        footerNote="Processed using the browser's hardware-accelerated Web Crypto Subtle API with zero network latency."
      />
    </div>
  );
}
