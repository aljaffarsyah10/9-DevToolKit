'use client';

import React, { useState } from 'react';
import { SearchCode, Play, CheckCircle2, FileCode } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { ErrorMessage } from '@/components/feedback/error-message';
import { EmptyState } from '@/components/feedback/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { testRegex, RegexMatch } from '@/features/regex-tester/utils/regex';

const SAMPLE_PATTERN = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}';
const SAMPLE_TEXT =
  'Welcome to DevToolkit! You can reach dev support at support@devtoolkit.io or inquiries at team@devtoolkit.io.';

export function RegexTesterView() {
  const [pattern, setPattern] = useState<string>(SAMPLE_PATTERN);
  const [flags, setFlags] = useState<string>('g');
  const [testString, setTestString] = useState<string>(SAMPLE_TEXT);
  const [matches, setMatches] = useState<RegexMatch[]>([]);
  const [hasTested, setHasTested] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFlag = (flagChar: string) => {
    setFlags((prev) =>
      prev.includes(flagChar) ? prev.replace(flagChar, '') : prev + flagChar
    );
  };

  const handleTestRegex = () => {
    if (!pattern) {
      setError('Please provide a regular expression pattern.');
      setMatches([]);
      setHasTested(true);
      return;
    }

    try {
      const result = testRegex(pattern, flags, testString);
      setMatches(result.matches);
      setError(null);
      setHasTested(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid Regular Expression syntax';
      setError(msg);
      setMatches([]);
      setHasTested(true);
    }
  };

  const handleClear = () => {
    setPattern('');
    setTestString('');
    setMatches([]);
    setHasTested(false);
    setError(null);
  };

  const handleLoadSample = () => {
    setPattern(SAMPLE_PATTERN);
    setFlags('g');
    setTestString(SAMPLE_TEXT);
    setError(null);
  };

  const formattedOutput = matches
    .map(
      (m, idx) =>
        `[Match ${idx + 1}] (index ${m.index}..${m.index + m.value.length}): "${m.value}"`
    )
    .join('\n');

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        toolId="regex-tester"
        title="Regex Tester"
        description="Test and debug regular expressions in real-time with pattern matching and infinite-loop protection."
        category="Testers"
        icon={SearchCode}
      />

      {error && (
        <ErrorMessage
          message="Regular Expression Syntax Error"
          details={error}
        />
      )}

      {hasTested && !error && (
        <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-700 dark:text-emerald-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>Pattern successfully compiled.</span>
          </div>
          <Badge variant="outline" className="border-emerald-500/30 font-mono text-[11px]">
            {matches.length} {matches.length === 1 ? 'match' : 'matches'} found
          </Badge>
        </div>
      )}

      <ToolLayout
        toolbar={
          <>
            {/* Pattern Input & Flags */}
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="flex items-center gap-1.5 flex-1 min-w-[240px]">
                <span className="font-mono text-base font-bold text-muted-foreground">/</span>
                <Input
                  value={pattern}
                  onChange={(e) => {
                    setPattern(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Regex pattern (e.g. [a-z0-9]+)..."
                  className="font-mono text-xs h-8 bg-background border-border"
                />
                <span className="font-mono text-base font-bold text-muted-foreground">/</span>
              </div>

              {/* Flags */}
              <div className="flex items-center gap-1">
                {(['g', 'i', 'm', 's', 'u'] as const).map((flag) => {
                  const isActive = flags.includes(flag);
                  return (
                    <Button
                      key={flag}
                      type="button"
                      variant={isActive ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleFlag(flag)}
                      className={`h-7 w-7 p-0 font-mono text-xs ${
                        isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                      }`}
                      title={`Toggle flag: ${flag}`}
                    >
                      {flag}
                    </Button>
                  );
                })}
              </div>

              <Button size="sm" onClick={handleTestRegex} className="gap-1.5 h-8 text-xs font-medium">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Test Regex</span>
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
            title="Test String Input"
            charCount={testString.length}
            onClear={handleClear}
          >
            <textarea
              value={testString}
              onChange={(e) => {
                setTestString(e.target.value);
                if (hasTested) setHasTested(false);
              }}
              placeholder="Paste or type test string to evaluate against regex..."
              className="w-full flex-1 min-h-[380px] resize-none bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed"
              spellCheck={false}
            />
          </InputPanel>
        }
        output={
          <OutputPanel
            title="Matches & Captures"
            value={formattedOutput}
            charCount={formattedOutput.length}
            actions={
              matches.length > 0 && (
                <span className="text-[11px] font-mono text-muted-foreground mr-2">
                  {matches.length} matches
                </span>
              )
            }
          >
            {matches.length > 0 ? (
              <div className="w-full flex-1 overflow-auto space-y-2 p-1 font-mono text-xs">
                {matches.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-border/80 bg-muted/20 space-y-1 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold text-primary">Match #{idx + 1}</span>
                      <span>
                        Index: {item.index}..{item.index + item.value.length} ({item.value.length} chars)
                      </span>
                    </div>
                    <div className="p-2 rounded bg-background border border-border/60 text-foreground break-all">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : hasTested ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                <SearchCode className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-xs font-medium">No matches found for this pattern and test string.</p>
                <p className="text-[11px] opacity-75 mt-1">Adjust pattern or flags to find matches.</p>
              </div>
            ) : (
              <EmptyState
                title="No Regex Test Executed"
                description="Enter your pattern and test string, then click 'Test Regex' to view matched items."
                actionLabel="Load Sample Regex"
                onAction={handleLoadSample}
              />
            )}
          </OutputPanel>
        }
        footerNote="Includes zero-length match protections to ensure the browser never hangs during global regex execution."
      />
    </div>
  );
}
