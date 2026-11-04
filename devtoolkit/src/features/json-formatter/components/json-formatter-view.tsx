'use client';

import React, { useState } from 'react';
import { Braces, Play, Minimize2, CheckCircle, Indent, FileCode } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { ErrorMessage } from '@/components/feedback/error-message';
import { EmptyState } from '@/components/feedback/empty-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatJson, minifyJson, validateJson } from '@/features/json-formatter/utils/json';

type IndentOption = 2 | 4 | 'tab';

const SAMPLE_JSON = `{
  "product": "DevToolkit",
  "version": "1.0.0",
  "features": [
    "JSON Formatter",
    "Base64 Codec",
    "JWT Decoder",
    "Regex Tester",
    "UUID Generator"
  ],
  "settings": {
    "clientSide": true,
    "theme": "system",
    "privacyGuaranteed": true
  }
}`;

export function JsonFormatterView() {
  const [input, setInput] = useState<string>(SAMPLE_JSON);
  const [output, setOutput] = useState<string>('');
  const [indent, setIndent] = useState<IndentOption>(2);
  const [error, setError] = useState<string | null>(null);
  const [validationSuccess, setValidationSuccess] = useState<boolean | null>(null);

  const getIndentValue = (): number | string => (indent === 'tab' ? '\t' : indent);

  // Production integrated Format Handler
  const handleFormat = () => {
    if (!input.trim()) {
      setError('Please provide JSON input to format.');
      setOutput('');
      setValidationSuccess(null);
      return;
    }

    try {
      const formatted = formatJson(input, getIndentValue());
      setOutput(formatted);
      setError(null);
      setValidationSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid JSON format';
      setError(message);
      setOutput('');
      setValidationSuccess(false);
    }
  };

  // Production integrated Minify Handler
  const handleMinify = () => {
    if (!input.trim()) {
      setError('Please provide JSON input to minify.');
      setOutput('');
      setValidationSuccess(null);
      return;
    }

    try {
      const minified = minifyJson(input);
      setOutput(minified);
      setError(null);
      setValidationSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid JSON format';
      setError(message);
      setOutput('');
      setValidationSuccess(false);
    }
  };

  // Production integrated Validate Handler
  const handleValidate = () => {
    if (!input.trim()) {
      setError('Please provide JSON input to validate.');
      setValidationSuccess(null);
      return;
    }

    const result = validateJson(input);
    if (result.valid) {
      setError(null);
      setValidationSuccess(true);
    } else {
      const details = result.line && result.column
        ? `${result.error} (Line: ${result.line}, Column: ${result.column})`
        : result.error || 'Invalid JSON format';
      setError(details);
      setValidationSuccess(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setValidationSuccess(null);
  };

  const handleLoadSample = () => {
    setInput(SAMPLE_JSON);
    setOutput('');
    setError(null);
    setValidationSuccess(null);
  };

  // Intercept Tab key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const val = target.value;
      const indentStr = indent === 'tab' ? '\t' : ' '.repeat(indent);
      target.value = val.substring(0, start) + indentStr + val.substring(end);
      target.selectionStart = target.selectionEnd = start + indentStr.length;
      setInput(target.value);
    }
  };

  const inputLineCount = input ? input.split('\n').length : 0;
  const outputLineCount = output ? output.split('\n').length : 0;
  const outputBytes = new Blob([output]).size;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        toolId="json-formatter"
        title="JSON Formatter & Validator"
        description="Format, prettify, minify, and validate JSON data with custom indentation in your browser."
        category="Formatters"
        icon={Braces}
      />

      {/* Error / Validation Notification */}
      {error && (
        <ErrorMessage
          message="JSON Validation / Parsing Error"
          details={error}
        />
      )}

      {validationSuccess && !error && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-700 dark:text-emerald-400">
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>Valid JSON structure confirmed. Ready for formatting or copying.</span>
        </div>
      )}

      <ToolLayout
        toolbar={
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={handleFormat} className="gap-1.5 h-8 text-xs font-medium">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Format</span>
              </Button>

              <Button variant="outline" size="sm" onClick={handleMinify} className="gap-1.5 h-8 text-xs">
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Minify</span>
              </Button>

              <Button variant="outline" size="sm" onClick={handleValidate} className="gap-1.5 h-8 text-xs">
                <CheckCircle className="h-3.5 w-3.5 text-blue-500" />
                <span>Validate</span>
              </Button>

              <div className="h-4 w-px bg-border mx-1" />

              {/* Indent selector */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground mr-1 flex items-center gap-1">
                  <Indent className="h-3.5 w-3.5" />
                  <span>Indent:</span>
                </span>
                {([2, 4, 'tab'] as const).map((opt) => (
                  <Button
                    key={String(opt)}
                    type="button"
                    variant={indent === opt ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIndent(opt)}
                    className={`h-7 px-2 text-xs font-mono ${
                      indent === opt ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {opt === 'tab' ? 'Tab' : `${opt}sp`}
                  </Button>
                ))}
              </div>

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
            title="JSON Input"
            charCount={input.length}
            lineCount={inputLineCount}
            onClear={handleClear}
          >
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(null);
                if (validationSuccess !== null) setValidationSuccess(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Paste raw or unformatted JSON here..."
              className="w-full flex-1 min-h-[380px] resize-none bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          </InputPanel>
        }
        output={
          <OutputPanel
            title="Formatted JSON Result"
            value={output}
            charCount={output.length}
            lineCount={outputLineCount}
            actions={
              output && (
                <span className="text-[11px] font-mono text-muted-foreground mr-2">
                  {outputBytes.toLocaleString()} bytes
                </span>
              )
            }
          >
            {output ? (
              <pre className="w-full flex-1 min-h-[380px] overflow-auto font-mono text-xs text-foreground leading-relaxed p-1">
                {output}
              </pre>
            ) : (
              <EmptyState
                title="No Formatted Output"
                description="Enter or paste JSON into the left panel and click 'Format' or 'Minify' to inspect result."
                actionLabel="Load Sample JSON"
                onAction={handleLoadSample}
              />
            )}
          </OutputPanel>
        }
        footerNote="JSON formatting, validation, and minification occur strictly inside your browser memory. No data is transmitted to any external server."
      />
    </div>
  );
}
