'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, RefreshCw, Play, Copy, Check } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { ErrorMessage } from '@/components/feedback/error-message';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  convertTimestamp,
  getCurrentUnixSeconds,
  TimestampDetails,
} from '@/features/timestamp-converter/utils/timestamp';
import { copyToClipboard } from '@/lib/clipboard';

export function TimestampConverterView() {
  const [currentSeconds, setCurrentSeconds] = useState<number>(1700000000);
  const [input, setInput] = useState<string>('1700000000');
  const [details, setDetails] = useState<TimestampDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live timer for current Unix timestamp & initial sync on client mount
  useEffect(() => {
    const sec = getCurrentUnixSeconds();
    setCurrentSeconds(sec);
    setInput(String(sec));
    try {
      setDetails(convertTimestamp(sec));
    } catch {
      // Ignore
    }

    const timer = setInterval(() => {
      setCurrentSeconds(getCurrentUnixSeconds());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleConvert = () => {
    if (!input.trim()) {
      setError('Please provide a Unix timestamp or date string.');
      setDetails(null);
      return;
    }

    try {
      const res = convertTimestamp(input);
      setDetails(res);
      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid timestamp format';
      setError(msg);
      setDetails(null);
    }
  };

  const handleUseCurrent = () => {
    const sec = getCurrentUnixSeconds();
    setInput(String(sec));
    setError(null);
    try {
      setDetails(convertTimestamp(sec));
    } catch {
      // Ignore
    }
  };

  const handleCopyField = async (value: string, key: string) => {
    try {
      await copyToClipboard(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      // fallback
    }
  };

  const fullOutputText = details
    ? `Unix Seconds: ${details.unixSeconds}\nUnix Millis: ${details.unixMillis}\nISO 8601: ${details.iso8601}\nUTC: ${details.utcString}\nLocal: ${details.localString}\nRelative: ${details.relativeTime}`
    : '';

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        toolId="timestamp-converter"
        title="Unix Timestamp Converter"
        description="Convert Unix timestamps (seconds & milliseconds) to human-readable dates and ISO 8601 formats."
        category="Generators"
        icon={Calendar}
      />

      {/* Live Current Timestamp Ticker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">Current Unix Timestamp (Epoch seconds):</span>
          <span className="font-mono text-sm font-bold text-foreground">{currentSeconds}</span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleUseCurrent}
          className="h-7 text-xs gap-1.5"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Insert Current Timestamp</span>
        </Button>
      </div>

      {error && <ErrorMessage message="Conversion Error" details={error} />}

      <ToolLayout
        toolbar={
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={handleConvert} className="gap-1.5 h-8 text-xs font-medium">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Convert Timestamp</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleUseCurrent}
                className="gap-1.5 h-8 text-xs"
              >
                <span>Reset to Now</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground">
                UTC & Local
              </Badge>
            </div>
          </>
        }
        input={
          <InputPanel
            title="Input Timestamp / Date String"
            charCount={input.length}
            onClear={() => {
              setInput('');
              setDetails(null);
            }}
          >
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter Unix seconds (e.g. 1700000000), milliseconds, or ISO string (e.g. 2026-11-04T08:00:00Z)..."
                className="w-full flex-1 min-h-[200px] resize-none bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed"
                spellCheck={false}
              />

              <div className="p-3 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">Supported Input Formats:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  <li>Unix Epoch in seconds (e.g. <code>1700000000</code>)</li>
                  <li>Unix Epoch in milliseconds (e.g. <code>1700000000000</code>)</li>
                  <li>ISO 8601 strings (e.g. <code>2026-11-04T12:00:00.000Z</code>)</li>
                </ul>
              </div>
            </div>
          </InputPanel>
        }
        output={
          <OutputPanel
            title="Converted Date Formats"
            value={fullOutputText}
            charCount={fullOutputText.length}
          >
            {details ? (
              <div className="w-full flex-1 overflow-auto space-y-2.5 p-1 font-mono text-xs">
                {[
                  { label: 'Unix Seconds', val: String(details.unixSeconds), key: 'sec' },
                  { label: 'Unix Milliseconds', val: String(details.unixMillis), key: 'ms' },
                  { label: 'ISO 8601', val: details.iso8601, key: 'iso' },
                  { label: 'UTC String', val: details.utcString, key: 'utc' },
                  { label: 'Local Timezone', val: details.localString, key: 'local' },
                  { label: 'Relative Time', val: details.relativeTime, key: 'rel' },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="p-2.5 rounded-lg border border-border/70 bg-muted/20 space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold uppercase tracking-wider">{item.label}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyField(item.val, item.key)}
                        className="h-6 px-2 text-[10px]"
                      >
                        {copiedKey === item.key ? (
                          <Check className="h-3 w-3 text-emerald-500 mr-1" />
                        ) : (
                          <Copy className="h-3 w-3 mr-1" />
                        )}
                        <span>{copiedKey === item.key ? 'Copied' : 'Copy'}</span>
                      </Button>
                    </div>
                    <div className="p-1.5 rounded bg-background border border-border/50 text-foreground break-all select-all">
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                <Calendar className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-xs">Converted date representations will appear here.</p>
              </div>
            )}
          </OutputPanel>
        }
        footerNote="Converts dates instantaneously in your browser with support for local and UTC timezones."
      />
    </div>
  );
}
