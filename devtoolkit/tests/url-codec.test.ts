import { describe, it, expect } from 'vitest';
import { encodeUrl, decodeUrl } from '../src/features/url-codec/utils/url-codec';

describe('URL Encoder / Decoder Engine', () => {
  it('should encode standard URLs and query parameters', () => {
    const raw = 'https://example.com/search?q=developer tools&filter=active#section';
    const encoded = encodeUrl(raw);
    expect(encoded).toBe('https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Ddeveloper%20tools%26filter%3Dactive%23section');
  });

  it('should encode special characters, spaces and unicode emojis', () => {
    const input = 'hello world! 🚀 @#$%^&*()';
    const encoded = encodeUrl(input);
    expect(encoded).toContain('%20');
    expect(encoded).toContain('%F0%9F%9A%80'); // rocket emoji
  });

  it('should return empty string on empty input', () => {
    expect(encodeUrl('')).toBe('');
    expect(decodeUrl('')).toBe('');
  });

  it('should decode percent-encoded URLs and strings', () => {
    const encoded = 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Ddeveloper%20tools%26filter%3Dactive%23section';
    const decoded = decodeUrl(encoded);
    expect(decoded).toBe('https://example.com/search?q=developer tools&filter=active#section');
  });

  it('should decode plus signs (+) as spaces', () => {
    const encoded = 'hello+world+test';
    const decoded = decodeUrl(encoded);
    expect(decoded).toBe('hello world test');
  });

  it('should throw an informative error on malformed percent encoding', () => {
    expect(() => decodeUrl('%E0%A4%A')).toThrow(/Failed to decode URL/i);
    expect(() => decodeUrl('%999')).toThrow(/Failed to decode URL/i);
  });
});

