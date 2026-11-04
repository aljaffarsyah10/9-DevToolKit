import React from 'react';
import { Metadata } from 'next';
import { HashGeneratorView } from '@/features/hash-generator/components/hash-generator-view';

export const metadata: Metadata = {
  title: 'Hash Generator (SHA-256 / SHA-512 / SHA-1) — DevToolkit',
  description: 'Generate cryptographic hash digests locally in your browser using the Web Crypto API.',
};

export default function HashGeneratorPage() {
  return <HashGeneratorView />;
}

