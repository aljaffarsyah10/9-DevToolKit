import React from 'react';
import { Metadata } from 'next';
import { JwtDecoderView } from '@/features/jwt-decoder/components/jwt-decoder-view';

export const metadata: Metadata = {
  title: 'JWT Decoder — DevToolkit',
  description: 'Decode and inspect JSON Web Token headers, payload claims, and token expiration status safely in-memory.',
};

export default function JwtDecoderPage() {
  return <JwtDecoderView />;
}
