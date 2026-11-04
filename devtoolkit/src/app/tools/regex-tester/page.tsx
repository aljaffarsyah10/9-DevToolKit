import React from 'react';
import { Metadata } from 'next';
import { RegexTesterView } from '@/features/regex-tester/components/regex-tester-view';

export const metadata: Metadata = {
  title: 'Regex Tester — DevToolkit',
  description: 'Test and debug regular expressions in real-time with pattern match highlighting and infinite-loop protections.',
};

export default function RegexTesterPage() {
  return <RegexTesterView />;
}
