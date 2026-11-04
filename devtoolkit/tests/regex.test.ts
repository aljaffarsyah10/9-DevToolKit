import { describe, it, expect } from 'vitest';
import { testRegex } from '@/features/regex-tester/utils/regex';

describe('Regex Tester Engine', () => {
  it('evaluates simple match with index', () => {
    const result = testRegex('hello', 'i', 'Hello World');
    expect(result.count).toBe(1);
    expect(result.matches[0].value).toBe('Hello');
    expect(result.matches[0].index).toBe(0);
  });

  it('finds multiple global matches', () => {
    const text = 'foo bar foo baz foo';
    const result = testRegex('foo', 'g', text);
    expect(result.count).toBe(3);
    expect(result.matches.map((m) => m.index)).toEqual([0, 8, 16]);
  });

  it('prevents infinite loop on zero-length matches with global flag', () => {
    // Pattern a* on 'bbb' matches zero-length empty string at each position
    // Without index advancement safeguard, this causes an infinite while loop
    const result = testRegex('a*', 'g', 'bbb');
    expect(result.count).toBeGreaterThan(0);
    expect(result.count).toBeLessThan(100);
  });

  it('returns empty result when pattern is empty', () => {
    const result = testRegex('', 'g', 'sample text');
    expect(result.count).toBe(0);
    expect(result.matches).toEqual([]);
  });

  it('throws descriptive error on invalid regular expression pattern', () => {
    expect(() => testRegex('([unclosed', 'g', 'test')).toThrow(/Regex compilation error/);
  });

  it('filters out invalid flags safely', () => {
    const result = testRegex('test', 'gXYZ123', 'test sample test');
    expect(result.count).toBe(2);
  });
});
