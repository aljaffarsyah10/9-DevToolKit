export type ToolCategory = 'all' | 'formatters' | 'encoders' | 'security' | 'testers' | 'generators';

export interface ToolMetadata {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ToolCategory;
  categoryLabel: string;
  iconName: string;
  keywords: string[];
  isP0: boolean;
  status: 'available' | 'coming-soon';
}

