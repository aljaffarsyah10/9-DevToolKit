import React from 'react';
import { Metadata } from 'next';
import { UrlCodecView } from '@/features/url-codec/components/url-codec-view';

export const metadata: Metadata = {
  title: 'URL Encoder / Decoder — DevToolkit',
  description: 'Encode and decode URLs and query parameters with percent-encoding locally in your browser.',
};

export default function UrlCodecPage() {
  return <UrlCodecView />;
}

