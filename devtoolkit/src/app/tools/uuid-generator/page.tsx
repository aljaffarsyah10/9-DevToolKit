import React from 'react';
import { Metadata } from 'next';
import { UuidGeneratorView } from '@/features/uuid-generator/components/uuid-generator-view';

export const metadata: Metadata = {
  title: 'UUID Generator — DevToolkit',
  description: 'Generate bulk cryptographically secure RFC4122 version 4 UUIDs using browser Web Crypto.',
};

export default function UuidGeneratorPage() {
  return <UuidGeneratorView />;
}
