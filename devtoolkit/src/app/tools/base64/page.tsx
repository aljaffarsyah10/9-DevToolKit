'use client';

import React, { useState } from 'react';
import { Binary, ArrowLeftRight, Sparkles } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { Button } from '@/components/ui/button';

export default function Base64Page() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('Hello, DevToolkit! 🚀');
  const [output, setOutput] = useState('');

  const handleProcessPlaceholder = () => {
    // Phase 4 UI Skeleton interaction placeholder
    setOutput(
      input
        ? mode === 'encode'
          ? `// Base64 Encoded preview (Full engine in Phase 6)\nSGVsbG8sIERldlRvb2xraXQhIPCfmYA=`
          : `// Base64 Decoded preview (Full engine in Phase 6)\nHello, DevToolkit! 🚀`
        : ''
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        title="Base64 Encoder / Decoder"
        description="Safely encode and decode UTF-8 text strings to and from Base64 representation."
        category="Encoders"
        icon={Binary}
      />

      <ToolLayout
        toolbar={
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={mode === 'encode' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setMode('encode');
                  setOutput('');
                }}
                className="h-8 text-xs font-medium"
              >
                Encode Mode
              </Button>
              <Button
                variant={mode === 'decode' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setMode('decode');
                  setOutput('');
                }}
                className="h-8 text-xs font-medium"
              >
                Decode Mode
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleProcessPlaceholder}
                className="gap-1.5 h-8 text-xs"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
                <span>{mode === 'encode' ? 'Run Encode' : 'Run Decode'}</span>
              </Button>
            </div>

            <div className="text-xs text-muted-foreground font-mono">
              Mode: {mode === 'encode' ? 'Text ➔ Base64' : 'Base64 ➔ Text'}
            </div>
          </>
        }
        input={
          <InputPanel
            title={mode === 'encode' ? 'Plain Text Input (UTF-8)' : 'Base64 Input String'}
            charCount={input.length}
            onClear={() => {
              setInput('');
              setOutput('');
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === 'encode'
                  ? 'Enter plain text to encode into Base64...'
                  : 'Enter Base64 string to decode...'
              }
              className="w-full flex-1 min-h-[360px] resize-none bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
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
              <pre className="w-full flex-1 min-h-[360px] overflow-auto font-mono text-xs text-foreground">
                {output}
              </pre>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                <Sparkles className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-xs">
                  {mode === 'encode' ? 'Encoded Base64' : 'Decoded UTF-8 string'} will appear here.
                </p>
                <p className="text-[11px] opacity-75 mt-1">
                  Click &quot;{mode === 'encode' ? 'Run Encode' : 'Run Decode'}&quot; to preview.
                </p>
              </div>
            )}
          </OutputPanel>
        }
        footerNote="Supports full UTF-8 encoding (including emojis and multilingual text) using native browser TextEncoder/TextDecoder."
      />
    </div>
  );
}

