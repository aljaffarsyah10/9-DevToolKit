import React from 'react';
import { ShieldCheck, Lock, EyeOff, ServerOff, DatabaseZap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Privacy by Design Guarantee</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Privacy Policy & Security Statement
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          At DevToolkit, user privacy is not an afterthought—it is the foundational architectural principle of the application.
        </p>
      </div>

      <div className="space-y-4">
        <Card className="border-border/80">
          <CardHeader className="p-5 pb-2 flex flex-row items-center gap-3 space-y-0">
            <ServerOff className="h-5 w-5 text-emerald-500" />
            <CardTitle className="text-sm font-semibold">1. Zero Server-Side Processing</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-muted-foreground leading-relaxed">
            All data formatting, decoding, encoding, regular expression testing, and UUID generations are
            performed exclusively inside your local browser runtime. We run zero backend APIs that receive or process
            your raw input payloads.
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="p-5 pb-2 flex flex-row items-center gap-3 space-y-0">
            <DatabaseZap className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-sm font-semibold">2. No Database or Remote Storage</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-muted-foreground leading-relaxed">
            DevToolkit operates without a database on MVP. When you close the browser tab or refresh the page,
            any input text or decoded tokens held in component state are immediately discarded and garbage collected.
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="p-5 pb-2 flex flex-row items-center gap-3 space-y-0">
            <Lock className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-sm font-semibold">3. Strict JWT & Secret Handling</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-muted-foreground leading-relaxed">
            JSON Web Tokens provided to the JWT Decoder are only decoded for payload inspection. We do not prompt
            for cryptographic secret keys, and tokens are never written to URL parameters, cookies, or remote logs.
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="p-5 pb-2 flex flex-row items-center gap-3 space-y-0">
            <EyeOff className="h-5 w-5 text-purple-500" />
            <CardTitle className="text-sm font-semibold">4. Zero Invasiveness & No Third-Party Trackers</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-muted-foreground leading-relaxed">
            We do not use invasive session recording tools, keyloggers, advertising scripts, or marketing trackers.
            Your development workflow remains entirely confidential.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

