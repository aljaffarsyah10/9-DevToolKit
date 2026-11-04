import React from 'react';
import { Metadata } from 'next';
import { Base64View } from '@/features/base64/components/base64-view';

export const metadata: Metadata = {
  title: 'Base64 Encoder / Decoder — DevToolkit',
  description: 'Safely encode and decode UTF-8 text strings to and from Base64 representation in your browser.',
};

export default function Base64Page() {
  return <Base64View />;
}
