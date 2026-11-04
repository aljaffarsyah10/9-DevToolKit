import React from 'react';
import { Metadata } from 'next';
import { TimestampConverterView } from '@/features/timestamp-converter/components/timestamp-converter-view';

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter — DevToolkit',
  description: 'Convert Unix epoch timestamps to human-readable dates and ISO 8601 strings in your browser.',
};

export default function TimestampConverterPage() {
  return <TimestampConverterView />;
}

