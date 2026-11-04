import { describe, it, expect } from 'vitest';
import { formatJson, minifyJson, validateJson } from '@/features/json-formatter/utils/json';

describe('JSON Utility Engine', () => {
  const sampleObj = { name: 'DevToolkit', count: 5, active: true };
  const rawJson = '{"name":"DevToolkit","count":5,"active":true}';

  describe('formatJson', () => {
    it('formats raw JSON with default 2 spaces', () => {
      const formatted = formatJson(rawJson);
      expect(formatted).toBe(JSON.stringify(sampleObj, null, 2));
    });

    it('formats raw JSON with 4 spaces', () => {
      const formatted = formatJson(rawJson, 4);
      expect(formatted).toBe(JSON.stringify(sampleObj, null, 4));
    });

    it('formats raw JSON with tab indentation', () => {
      const formatted = formatJson(rawJson, '\t');
      expect(formatted).toBe(JSON.stringify(sampleObj, null, '\t'));
    });

    it('throws error on empty or whitespace input', () => {
      expect(() => formatJson('')).toThrow('Input cannot be empty');
      expect(() => formatJson('   ')).toThrow('Input cannot be empty');
    });

    it('throws descriptive error on malformed JSON', () => {
      expect(() => formatJson('{ name: invalid }')).toThrow(/Failed to format JSON/);
      expect(() => formatJson('{"trailing": true,}')).toThrow(/Failed to format JSON/);
    });
  });

  describe('minifyJson', () => {
    it('minifies pretty-printed JSON string', () => {
      const pretty = JSON.stringify(sampleObj, null, 4);
      const minified = minifyJson(pretty);
      expect(minified).toBe(rawJson);
    });

    it('throws error on malformed JSON for minification', () => {
      expect(() => minifyJson('{"incomplete":')).toThrow(/Failed to minify JSON/);
    });
  });

  describe('validateJson', () => {
    it('returns valid true for valid JSON', () => {
      const result = validateJson(rawJson);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('returns valid false with error details for malformed JSON', () => {
      const result = validateJson('{"key": "value",}');
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('returns valid false for empty input', () => {
      const result = validateJson('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Input is empty.');
    });
  });
});
