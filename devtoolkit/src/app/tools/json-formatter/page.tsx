'use client';

import React, { useState } from 'react';
import { Braces, Play, Indent, Minimize2, Sparkles } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { Button } from '@/components/ui/button';

export default function JsonFormatterPage() {
  const [input, setInput] = useState('{\n  "message": "Welcome to DevToolkit",\n  "status": "success",\n  "version": 1\n}');
  const [output, setOutput] = useState('');

  const handleFormatPlaceholder = () => {
    // Phase 4 UI Skeleton interaction placeholder
    setOutput(input ? `// Formatted result preview (Full engine in Phase 6)\n${input}` : '');
  };

  const handleMinifyPlaceholder = () => {
    setOutput(input ? `// Minified result preview (Full engine in Phase 6)\n${input.replace(/\s+/g, ' ')}` : '');
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        title="JSON Formatter & Validator"
        description="Format, validate, prettify, and minify your JSON data with custom indentation."
        category="Formatters"
        icon={Braces}
      />

      <ToolLayout
        toolbar={
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={handleFormatPlaceholder} className="gap-1.5 h-8 text-xs">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Format JSON</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleMinifyPlaceholder} className="gap-1.5 h-8 text-xs">
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Minify</span>
              </Button>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-2">
                <Indent className="h-3.5 w-3.5" />
                <span>Indent: 2 spaces</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground font-mono">
              Phase 4: UI Shell & Skeleton
            </div>
          </>
        }
        input={
          <InputPanel
            title="JSON Input"
            charCount={input.length}
            lineCount={input ? input.split('\n').length : 0}
            onClear={() => {
              setInput('');
              setOutput('');
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste raw JSON here..."
              className="w-full flex-1 min-h-[360px] resize-none bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
              spellCheck={false}
            />
          </InputPanel>
        }
        output={
          <OutputPanel
            title="Formatted Result"
            value={output}
            charCount={output.length}
            lineCount={output ? output.split('\n').length : 0}
          >
            {output ? (
              <pre className="w-full flex-1 min-h-[360px] overflow-auto font-mono text-xs text-foreground">
                {output}
              </pre>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                <Sparkles className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-xs">Formatted and validated JSON will appear here.</p>
                <p className="text-[11px] opacity-75 mt-1">Click &quot;Format JSON&quot; above to preview output.</p>
              </div>
            )}
          </OutputPanel>
        }
        footerNote="JSON formatting and parsing is performed 100% locally in your browser. No data is transmitted to any server."
      />
    </div>
  );
}

