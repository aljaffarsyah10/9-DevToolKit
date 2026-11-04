'use client';

import React, { useState } from 'react';
import { KeyRound, ShieldAlert, Sparkles, Clock } from 'lucide-react';
import { ToolHeader } from '@/components/tools/tool-header';
import { ToolLayout } from '@/components/tools/tool-layout';
import { InputPanel } from '@/components/tools/input-panel';
import { OutputPanel } from '@/components/tools/output-panel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function JwtDecoderPage() {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIERldiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxOTE2MjM5MDIyfQ.4pcSaHGpnTTuzQf'
  );
  const [decodedPreview, setDecodedPreview] = useState('');

  const handleDecodePlaceholder = () => {
    // Phase 4 UI Skeleton interaction placeholder
    setDecodedPreview(
      token
        ? JSON.stringify(
            {
              header: { alg: 'HS256', typ: 'JWT' },
              payload: {
                sub: '1234567890',
                name: 'Alice Dev',
                iat: 1516239022,
                exp: 1916239022,
                _status: 'Active (Expires in the future)',
              },
            },
            null,
            2
          )
        : ''
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <ToolHeader
        title="JWT Decoder"
        description="Decode and inspect JSON Web Token header, payload claims, and token expiration."
        category="Security"
        icon={KeyRound}
      />

      {/* Security Disclaimer Banner */}
      <div className="flex items-center gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs text-amber-700 dark:text-amber-400">
        <ShieldAlert className="h-4 w-4 shrink-0" />
        <span>
          <strong>Security Note:</strong> JWT decoding is performed purely on the client side. Tokens are parsed
          for inspection only and are <strong>not</strong> cryptographically verified. Never paste production secrets.
        </span>
      </div>

      <ToolLayout
        toolbar={
          <>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handleDecodePlaceholder} className="gap-1.5 h-8 text-xs">
                <KeyRound className="h-3.5 w-3.5" />
                <span>Decode Token</span>
              </Button>
              <Badge variant="outline" className="text-[11px] gap-1 font-mono">
                <Clock className="h-3 w-3 text-emerald-500" />
                <span>Local Time Check</span>
              </Badge>
            </div>

            <div className="text-xs text-muted-foreground font-mono">
              Phase 4: UI Shell & Skeleton
            </div>
          </>
        }
        input={
          <InputPanel
            title="Encoded JWT String"
            charCount={token.length}
            onClear={() => {
              setToken('');
              setDecodedPreview('');
            }}
          >
            <textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste JWT string here (e.g. eyJhbGciOi...)"
              className="w-full flex-1 min-h-[360px] resize-none bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none break-all"
              spellCheck={false}
            />
          </InputPanel>
        }
        output={
          <OutputPanel
            title="Decoded Header & Claims"
            value={decodedPreview}
            charCount={decodedPreview.length}
          >
            {decodedPreview ? (
              <pre className="w-full flex-1 min-h-[360px] overflow-auto font-mono text-xs text-foreground bg-muted/20 p-3 rounded-lg">
                {decodedPreview}
              </pre>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                <Sparkles className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-xs">Decoded header and payload claims will appear here.</p>
                <p className="text-[11px] opacity-75 mt-1">Click &quot;Decode Token&quot; to preview parsed claims.</p>
              </div>
            )}
          </OutputPanel>
        }
        footerNote="Token payload is processed in-memory and never transmitted over any network."
      />
    </div>
  );
}

