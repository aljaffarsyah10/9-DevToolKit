import React from 'react';
import { Metadata } from 'next';
import { JsonFormatterView } from '@/features/json-formatter/components/json-formatter-view';

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator — DevToolkit',
  description: 'Format, prettify, minify, and validate JSON data instantly in your browser with custom indentation.',
};

export default function JsonFormatterPage() {
  return <JsonFormatterView />;
}
