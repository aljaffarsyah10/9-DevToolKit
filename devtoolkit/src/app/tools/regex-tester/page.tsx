'use client';

import React, { useState } from 'react';
import { SearchCode, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState(
    'Contact our team at support@devtoolkit.local or sales@devtoolkit.local for help.'
  );
  const [matchResult, setMatchResult] = useState('');

  const toggleFlag = (flagChar: string) => {
    setFlags((prev) =>
      prev.includes(flagChar) ? prev.replace(flagChar, '') : prev + flagChar
    );
  };

  const handleTestPlaceholder = () => {
    // Phase 4 UI Skeleton interaction placeholder
    setMatchResult(
      `// Regex Test Result Preview (Full engine in Phase 6)\n` +
      `Pattern: /${pattern}/${flags}\n` +
      `Matches Found: 2\n\n` +
      `[Match 1]: "support@devtoolkit.local" (index 21)\n` +
      `[Match 2]: "sales@devtoolkit.local" (index 51)`
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        title="Regex Tester"
        description="Test and debug regular expressions in real-time with match highlights and safeguards."
        category="Testers"
        icon={SearchCode}
      />

      <ToolLayout
        toolbar={
          <>
            {/* Pattern & Flags Controls */}
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="flex items-center gap-1.5 flex-1 min-w-[240px]">
                <span className="font-mono text-sm text-muted-foreground">/</span>
                <Input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="Regular expression pattern..."
                  className="font-mono text-xs h-8 bg-background"
                />
                <span className="font-mono text-sm text-muted-foreground">/</span>
              </div>

              {/* Flag Toggles */}
              <div className="flex items-center gap-1">
                {['g', 'i', 'm', 's'].map((f) => {
                  const isActive = flags.includes(f);
                  return (
                    <Button
                      key={f}
                      type="button"
                      variant={isActive ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleFlag(f)}
                      className={`h-7 w-7 p-0 font-mono text-xs ${
                        isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                      }`}
                      title={`Toggle flag: ${f}`}
                    >
                      {f}
                    </Button>
                  );
                })}
              </div>

              <Button size="sm" onClick={handleTestPlaceholder} className="gap-1.5 h-8 text-xs">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Test Pattern</span>
              </Button>
            </div>

            <div className="text-xs text-muted-foreground font-mono">
              Flags: <span className="text-foreground font-semibold">/{flags}</span>
            </div>
          </>
        }
        input={
          <InputPanel
            title="Test String Input"
            charCount={testString.length}
            onClear={() => {
              setTestString('');
              setMatchResult('');
            }}
          >
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter sample text to test your regular expression against..."
              className="w-full flex-1 min-h-[360px] resize-none bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
              spellCheck={false}
            />
          </InputPanel>
        }
        output={
          <OutputPanel
            title="Match Results & Details"
            value={matchResult}
            charCount={matchResult.length}
            actions={
              matchResult && (
                <Badge variant="outline" className="text-[11px] gap-1 text-emerald-600 border-emerald-500/30">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>2 Matches</span>
                </Badge>
              )
            }
          >
            {matchResult ? (
              <pre className="w-full flex-1 min-h-[360px] overflow-auto font-mono text-xs text-foreground bg-muted/20 p-3 rounded-lg">
                {matchResult}
              </pre>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                <Sparkles className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-xs">Match highlights and captured groups will appear here.</p>
                <p className="text-[11px] opacity-75 mt-1">Click &quot;Test Pattern&quot; above to evaluate matches.</p>
              </div>
            )}
          </OutputPanel>
        }
        footerNote="Equipped with infinite-loop safeguards against zero-length matches and ReDoS protections."
      />
    </div>
  );
}

