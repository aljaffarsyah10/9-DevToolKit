'use client';

import React, { useState } from 'react';
import { Binary, ArrowLeftRight, Play, CheckCircle2, FileCode } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { ErrorMessage } from '@/components/feedback/error-message';
import { EmptyState } from '@/components/feedback/empty-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { encodeBase64, decodeBase64 } from '@/features/base64/utils/base64';

type Base64Mode = 'encode' | 'decode';

const SAMPLE_TEXT = 'Welcome to DevToolkit! Fast, private & client-side. 🚀';
const SAMPLE_BASE64 = 'V2VsY29tZSB0byBEZXZUb29sa2l0ISBGYXN0LCBwcml2YXRlICYgY2xpZW50LXNpZGUuIPCfmYA=';

export function Base64View() {
  const [mode, setMode] = useState<Base64Mode>('encode');
  const [input, setInput] = useState<string>(SAMPLE_TEXT);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);

  const handleProcess = () => {
    if (!input.trim()) {
      setError('Please provide input text or Base64 string.');
      setOutput('');
      setSuccessStatus(null);
      return;
    }

    try {
      if (mode === 'encode') {
        const res = encodeBase64(input);
        setOutput(res);
        setSuccessStatus('Successfully encoded to UTF-8 Base64.');
      } else {
        const res = decodeBase64(input);
        setOutput(res);
        setSuccessStatus('Successfully decoded from Base64.');
      }
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Base64 processing error';
      setError(msg);
      setOutput('');
      setSuccessStatus(null);
    }
  };

  const handleSwap = () => {
    if (!output) return;
    const nextMode: Base64Mode = mode === 'encode' ? 'decode' : 'encode';
    setInput(output);
    setOutput('');
    setMode(nextMode);
    setError(null);
    setSuccessStatus(null);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setSuccessStatus(null);
  };

  const handleLoadSample = () => {
    if (mode === 'encode') {
      setInput(SAMPLE_TEXT);
    } else {
      setInput(SAMPLE_BASE64);
    }
    setOutput('');
    setError(null);
    setSuccessStatus(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        title="Base64 Encoder / Decoder"
        description="Encode and decode text strings with full UTF-8 support (including unicode and emojis)."
        category="Encoders"
        icon={Binary}
      />

      {error && (
        <ErrorMessage
          message="Base64 Decoding / Encoding Error"
          details={error}
        />
      )}

      {successStatus && !error && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>{successStatus}</span>
        </div>
      )}

      <ToolLayout
        toolbar={
          <>
            <div className="flex flex-wrap items-center gap-2">
              {/* Mode switch */}
              <div className="flex items-center rounded-lg border border-border p-0.5 bg-muted/40">
                <Button
                  type="button"
                  variant={mode === 'encode' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setMode('encode');
                    setOutput('');
                    setError(null);
                    setSuccessStatus(null);
                  }}
                  className="h-7 text-xs font-medium"
                >
                  Encode (Text ➔ Base64)
                </Button>
                <Button
                  type="button"
                  variant={mode === 'decode' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setMode('decode');
                    setOutput('');
                    setError(null);
                    setSuccessStatus(null);
                  }}
                  className="h-7 text-xs font-medium"
                >
                  Decode (Base64 ➔ Text)
                </Button>
              </div>

              {/* Action Button */}
              <Button size="sm" onClick={handleProcess} className="gap-1.5 h-8 text-xs font-medium">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>{mode === 'encode' ? 'Encode Text' : 'Decode Base64'}</span>
              </Button>

              {/* Swap Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwap}
                disabled={!output}
                className="gap-1.5 h-8 text-xs"
                title="Swap input and output values"
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
                Engine Integrated
              </Badge>
            </div>
          </>
        }
        input={
          <InputPanel
            title={mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
            charCount={input.length}
            onClear={handleClear}
          >
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(null);
                if (successStatus) setSuccessStatus(null);
              }}
              placeholder={
                mode === 'encode'
                  ? 'Enter plain text or unicode characters to encode...'
                  : 'Enter Base64 string to decode...'
              }
              className="w-full flex-1 min-h-[380px] resize-none bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          </InputPanel>
        }
        output={
          <OutputPanel
            title={mode === 'encode' ? 'Base64 Output' : 'Decoded Text Output'}
            value={output}
            charCount={output.length}
          >
            {output ? (
              <pre className="w-full flex-1 min-h-[380px] overflow-auto font-mono text-xs text-foreground leading-relaxed p-1 break-all">
                {output}
              </pre>
            ) : (
              <EmptyState
                title="No Output Generated"
                description={`Provide input on the left and click "${mode === 'encode' ? 'Encode Text' : 'Decode Base64'}" to see the converted result.`}
                actionLabel="Load Sample Data"
                onAction={handleLoadSample}
              />
            )}
          </OutputPanel>
        }
        footerNote="Proper UTF-8 encoding is used so emojis and non-ASCII scripts are preserved safely without corruption."
      />
    </div>
  );
}
