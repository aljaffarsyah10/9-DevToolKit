'use client';

import React, { useState } from 'react';
import { KeyRound, ShieldAlert, Play, Clock, AlertTriangle, CheckCircle, FileCode, Layers } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { ErrorMessage } from '@/components/feedback/error-message';
import { EmptyState } from '@/components/feedback/empty-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { decodeJwt } from '@/features/jwt-decoder/utils/jwt';

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZXYtMTIzNDUiLCJuYW1lIjoiQWxleCBEZXZlbG9wZXIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTk1OTY2OTAyMn0.3pM0n_K1-vW4rQ5_sample_signature_not_verified';

export function JwtDecoderView() {
  const [token, setToken] = useState<string>(SAMPLE_JWT);
  const [headerJson, setHeaderJson] = useState<string>('');
  const [payloadJson, setPayloadJson] = useState<string>('');
  const [signature, setSignature] = useState<string>('');
  const [expiryStatus, setExpiryStatus] = useState<{
    status: 'active' | 'expired' | 'no-expiry';
    message: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    if (!token.trim()) {
      setError('Please provide a JWT token string to decode.');
      setHeaderJson('');
      setPayloadJson('');
      setSignature('');
      setExpiryStatus(null);
      return;
    }

    try {
      const decoded = decodeJwt(token);
      setHeaderJson(JSON.stringify(decoded.header, null, 2));
      setPayloadJson(JSON.stringify(decoded.payload, null, 2));
      setSignature(decoded.signature || '(No signature segment provided)');

      if (decoded.expiresAt !== undefined && decoded.isExpired !== undefined) {
        const expDate = new Date(decoded.expiresAt * 1000);
        setExpiryStatus({
          status: decoded.isExpired ? 'expired' : 'active',
          message: decoded.isExpired
            ? `Token Expired on ${expDate.toLocaleString()}`
            : `Token Active (Expires on ${expDate.toLocaleString()})`,
        });
      } else {
        setExpiryStatus({
          status: 'no-expiry',
          message: 'No "exp" expiration claim found in token payload.',
        });
      }

      setError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to parse JWT parts';
      setError(msg);
      setHeaderJson('');
      setPayloadJson('');
      setSignature('');
      setExpiryStatus(null);
    }
  };

  const handleClear = () => {
    setToken('');
    setHeaderJson('');
    setPayloadJson('');
    setSignature('');
    setExpiryStatus(null);
    setError(null);
  };

  const handleLoadSample = () => {
    setToken(SAMPLE_JWT);
    setError(null);
  };

  const combinedOutput = payloadJson
    ? `// JWT HEADER\n${headerJson}\n\n// JWT PAYLOAD (CLAIMS)\n${payloadJson}\n\n// SIGNATURE (BASE64URL)\n${signature}`
    : '';

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        title="JWT Decoder"
        description="Decode, inspect, and verify expiration of JSON Web Token headers and payload claims."
        category="Security"
        icon={KeyRound}
      />

      {/* Mandatory Security Disclaimer */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs text-amber-800 dark:text-amber-300">
        <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
        <div className="space-y-1">
          <p className="font-semibold">Client-Side Decoder Notice</p>
          <p className="opacity-90 leading-relaxed">
            This tool decodes the token payload for debugging purposes. It does <strong>not</strong> cryptographically
            verify the signature against server secret keys. A decoded token should never be considered valid without server-side validation.
          </p>
        </div>
      </div>

      {error && (
        <ErrorMessage
          message="Invalid JWT Token"
          details={error}
        />
      )}

      {expiryStatus && !error && (
        <div
          className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs ${
            expiryStatus.status === 'active'
              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
              : expiryStatus.status === 'expired'
              ? 'border-destructive/20 bg-destructive/10 text-destructive'
              : 'border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400'
          }`}
        >
          {expiryStatus.status === 'active' && <CheckCircle className="h-4 w-4 text-emerald-500" />}
          {expiryStatus.status === 'expired' && <AlertTriangle className="h-4 w-4 text-destructive" />}
          {expiryStatus.status === 'no-expiry' && <Clock className="h-4 w-4 text-blue-500" />}
          <span className="font-medium">{expiryStatus.message}</span>
        </div>
      )}

      <ToolLayout
        toolbar={
          <>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={handleDecode} className="gap-1.5 h-8 text-xs font-medium">
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Decode JWT</span>
              </Button>

              <div className="h-4 w-px bg-border mx-1" />

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLoadSample}
                className="gap-1 h-8 text-xs text-muted-foreground hover:text-foreground"
              >
                <FileCode className="h-3.5 w-3.5" />
                <span>Load Sample JWT</span>
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
            title="Encoded JWT Token"
            charCount={token.length}
            onClear={handleClear}
          >
            <textarea
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                if (error) setError(null);
                if (expiryStatus) setExpiryStatus(null);
              }}
              placeholder="Paste raw JWT string (header.payload.signature)..."
              className="w-full flex-1 min-h-[380px] resize-none bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed break-all"
              spellCheck={false}
            />
          </InputPanel>
        }
        output={
          <OutputPanel
            title="Decoded Claims & Details"
            value={combinedOutput}
            charCount={combinedOutput.length}
          >
            {payloadJson ? (
              <div className="w-full flex-1 overflow-auto space-y-4 text-xs font-mono">
                {/* Header section */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground font-semibold text-[11px] uppercase tracking-wider">
                    <Layers className="h-3 w-3" />
                    <span>Header (Algorithm & Type)</span>
                  </div>
                  <pre className="p-2.5 rounded-lg bg-muted/30 border border-border/60 text-foreground overflow-auto">
                    {headerJson}
                  </pre>
                </div>

                {/* Payload section */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground font-semibold text-[11px] uppercase tracking-wider">
                    <KeyRound className="h-3 w-3" />
                    <span>Payload (Claims Data)</span>
                  </div>
                  <pre className="p-2.5 rounded-lg bg-muted/30 border border-border/60 text-foreground overflow-auto">
                    {payloadJson}
                  </pre>
                </div>

                {/* Signature section */}
                <div className="space-y-1">
                  <span className="text-muted-foreground font-semibold text-[11px] uppercase tracking-wider">
                    Signature
                  </span>
                  <pre className="p-2.5 rounded-lg bg-muted/30 border border-border/60 text-muted-foreground overflow-auto break-all">
                    {signature}
                  </pre>
                </div>
              </div>
            ) : (
              <EmptyState
                title="No Token Decoded"
                description="Paste an encoded JSON Web Token in the left panel and click 'Decode JWT' to inspect its contents."
                actionLabel="Load Sample JWT"
                onAction={handleLoadSample}
              />
            )}
          </OutputPanel>
        }
        footerNote="Decoding operates 100% locally in-memory. Your JWT tokens are never logged or transmitted over any network."
      />
    </div>
  );
}
