import { ToolCategory, ToolMetadata } from '@/types/tool';

export interface CategoryInfo {
  id: ToolCategory;
  label: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', label: 'All Tools' },
  { id: 'formatters', label: 'Formatters' },
  { id: 'encoders', label: 'Encoders' },
  { id: 'security', label: 'Security' },
  { id: 'testers', label: 'Testers' },
  { id: 'generators', label: 'Generators' },
];

export const TOOLS: ToolMetadata[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, minify, and validate JSON data with custom indentation.',
    category: 'formatters',
    categoryLabel: 'Formatters',
    iconName: 'Braces',
    keywords: ['json', 'format', 'prettify', 'minify', 'validate', 'beautify'],
    isP0: true,
    status: 'available',
  },
  {
    id: 'base64',
    name: 'Base64 Encoder / Decoder',
    slug: 'base64',
    description: 'Encode and decode UTF-8 text to and from Base64 representation.',
    category: 'encoders',
    categoryLabel: 'Encoders',
    iconName: 'Binary',
    keywords: ['base64', 'encode', 'decode', 'utf-8', 'binary', 'text'],
    isP0: true,
    status: 'available',
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Decode and inspect JSON Web Token header, payload, and expiry status.',
    category: 'security',
    categoryLabel: 'Security',
    iconName: 'KeyRound',
    keywords: ['jwt', 'token', 'decode', 'payload', 'claims', 'expiry', 'auth'],
    isP0: true,
    status: 'available',
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    slug: 'regex-tester',
    description: 'Test regular expressions in real-time with flags and match highlights.',
    category: 'testers',
    categoryLabel: 'Testers',
    iconName: 'SearchCode',
    keywords: ['regex', 'regexp', 'regular expression', 'pattern', 'test', 'match'],
    isP0: true,
    status: 'available',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    slug: 'uuid-generator',
    description: 'Generate bulk RFC4122 version 4 cryptographically secure UUIDs.',
    category: 'generators',
    categoryLabel: 'Generators',
    iconName: 'Hash',
    keywords: ['uuid', 'guid', 'v4', 'random', 'generate', 'id'],
    isP0: true,
    status: 'available',
  },
];

