'use client';

import React, { useState, useEffect } from 'react';
import { Link2, ArrowLeftRight, Play, CheckCircle2, FileCode } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { ErrorMessage } from '@/components/feedback/error-message';
import { EmptyState } from '@/components/feedback/empty-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { encodeUrl, decodeUrl } from '@/features/url-codec/utils/url-codec';
import { useToolPreferences } from '@/hooks/use-tool-preferences';

type UrlMode = 'encode' | 'decode';

const SAMPLE_RAW = 'https://example.com/search?q=developer tools&filter=fast & private! 🚀';
const SAMPLE_ENCODED = 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Ddeveloper%20tools%26filter%3Dfast%20%26%20private!%20%F0%9F%9A%80';

export function UrlCodecView() {
  const [mode, setMode] = useState<UrlMode>('encode');
  const [input, setInput] = useState<string>(SAMPLE_RAW);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const { addRecentlyUsed } = useToolPreferences();

  useEffect(() => {
    addRecentlyUsed('url-codec');
  }, [addRecentlyUsed]);

  const handleProcess = () => {
    if (!input.trim()) {
      setError('Please provide input to encode or decode.');
      setOutput('');
      setStatusMsg(null);
      return;
    }

    try {
      if (mode === 'encode') {
        const res = encodeUrl(input);
        setOutput(res);
        setStatusMsg('Successfully percent-encoded URL.');
      } else {
        const res = decodeUrl(input);
        setOutput(res);
        setStatusMsg('Successfully decoded URL.');
      }
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'URL processing error';
      setError(msg);
      setOutput('');
      setStatusMsg(null);
    }
  };

  const handleSwap = () => {
    if (!output) return;
    const nextMode: UrlMode = mode === 'encode' ? 'decode' : 'encode';
    setInput(output);
    setOutput('');
    setMode(nextMode);
    setError(null);
    setStatusMsg(null);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setStatusMsg(null);
  };

  const handleLoadSample = () => {
    if (mode === 'encode') {
      setInput(SAMPLE_RAW);
    } else {
      setInput(SAMPLE_ENCODED);
    }
    setOutput('');
    setError(null);
    setStatusMsg(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        toolId="url-codec"
        title="URL Encoder / Decoder"
        description="Encode and decode URLs and URI query parameters with standard percent-encoding."
        category="Encoders"
        icon={Link2}
      />

      {error && <ErrorMessage message="URL Processing Error" details={error} />}

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
              <div className="flex items-center rounded-lg border border-border p-0.5 bg-muted/40">
                <Button
                  type="button"
                  variant={mode === 'encode' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setMode('encode');
                    setOutput('');
                    setError(null);
                    setStatusMsg(null);
                  }}
                  className="h-7 text-xs font-medium"
                >
                  Encode URL
                </Button>
                <Button
                  type="button"
                  variant={mode === 'decode' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setMode('decode');
                    setOutput('');
                    setError(null);
                    setStatusMsg(null);
                  }}
                  className="h-7 text-xs font-medium"
                >
                  Decode URL
                </Button>
              </div>

              <Button size="sm" onClick={handleProcess} className="gap-1.5 h-8 text-xs font-medium">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>{mode === 'encode' ? 'Encode' : 'Decode'}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSwap}
                disabled={!output}
                className="gap-1.5 h-8 text-xs"
                title="Swap input and output"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
                <span>Swap</span>
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
                RFC 3986
              </Badge>
            </div>
          </>
        }
        input={
          <InputPanel
            title={mode === 'encode' ? 'Raw URL or Query Input' : 'Encoded URL Input'}
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
              placeholder={
                mode === 'encode'
                  ? 'Enter raw URI or query string to encode...'
                  : 'Enter percent-encoded URL to decode...'
              }
              className="w-full flex-1 min-h-[380px] resize-none bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          </InputPanel>
        }
        output={
          <OutputPanel
            title={mode === 'encode' ? 'Encoded URL Output' : 'Decoded URL Output'}
            value={output}
            charCount={output.length}
          >
            {output ? (
              <pre className="w-full flex-1 min-h-[380px] overflow-auto font-mono text-xs text-foreground leading-relaxed p-1 break-all">
                {output}
              </pre>
            ) : (
              <EmptyState
                title="No URL Output"
                description={`Provide input on the left and click "${mode === 'encode' ? 'Encode' : 'Decode'}" to process.`}
                actionLabel="Load Sample URL"
                onAction={handleLoadSample}
              />
            )}
          </OutputPanel>
        }
        footerNote="Converts reserved and non-ASCII characters into compliant UTF-8 percent-encoded sequences."
      />
    </div>
  );
}
