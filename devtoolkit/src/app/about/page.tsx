import React from 'react';
import { Terminal, Shield, Zap, Code2, Cpu } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium">
          <Terminal className="h-3.5 w-3.5" />
          <span>About DevToolkit</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Built for Developers, by Developers
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          DevToolkit unites everyday utilities into a single, clean, fast platform without intrusive ads,
          mandatory registrations, or remote server data processing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-border/80">
          <CardHeader className="p-5 pb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
              <Zap className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-semibold">Sub-millisecond Speed</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-muted-foreground leading-relaxed">
            By avoiding unnecessary server roundtrips, operations like formatting JSON, encoding Base64,
            or evaluating Regex happen instantly right inside your browser memory.
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="p-5 pb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 mb-2">
              <Shield className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-semibold">100% Client-Side Privacy</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-muted-foreground leading-relaxed">
            Your tokens, payloads, passwords, and sensitive regular expressions never leave your device.
            We have zero server endpoints collecting user input.
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="p-5 pb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 mb-2">
              <Cpu className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-semibold">Modern Web Standards</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-muted-foreground leading-relaxed">
            Built using Next.js 16 App Router, React 19, TypeScript strict mode, Tailwind CSS v4, and standard
            browser APIs (Web Crypto API, TextEncoder, TextDecoder).
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="p-5 pb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 mb-2">
              <Code2 className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-semibold">Clean Architecture</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-muted-foreground leading-relaxed">
            Developed with a modular monolith structure where business logic is encapsulated in pure functions,
            guaranteeing testability, reliability, and ease of expansion.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

