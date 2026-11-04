import { describe, it, expect } from 'vitest';
import { generateSingleV4Uuid, generateUUID } from '@/features/uuid-generator/utils/uuid';

describe('UUID Generator Engine', () => {
  const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  it('generates a valid RFC4122 version 4 UUID', () => {
    const uuid = generateSingleV4Uuid();
    expect(uuid).toMatch(UUID_V4_REGEX);
  });

  it('generates a batch of UUIDs matching the requested count', () => {
    const list = generateUUID(10);
    expect(list).toHaveLength(10);
    list.forEach((uuid) => {
      expect(uuid).toMatch(UUID_V4_REGEX);
    });
  });

  it('ensures all generated UUIDs in a batch are unique', () => {
    const list = generateUUID(100);
    const uniqueSet = new Set(list);
    expect(uniqueSet.size).toBe(100);
  });

  it('supports uppercase formatting option', () => {
    const uuid = generateSingleV4Uuid({ uppercase: true });
    expect(uuid).toBe(uuid.toUpperCase());
    expect(uuid).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/);
  });

  it('supports no-hyphens formatting option', () => {
    const uuid = generateSingleV4Uuid({ hyphens: false });
    expect(uuid).not.toContain('-');
    expect(uuid).toHaveLength(32);
    expect(uuid).toMatch(/^[0-9a-f]{32}$/);
  });

  it('throws error when count is less than 1 or exceeds 1000', () => {
    expect(() => generateUUID(0)).toThrow('Count must be at least 1');
    expect(() => generateUUID(-5)).toThrow('Count must be at least 1');
    expect(() => generateUUID(1001)).toThrow('Cannot generate more than 1000 UUIDs');
  });
});
