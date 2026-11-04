import { describe, it, expect } from 'vitest';
import { encodeBase64, decodeBase64 } from '@/features/base64/utils/base64';

describe('Base64 Utility Engine', () => {
  it('encodes and decodes standard ASCII text', () => {
    const text = 'Hello, DevToolkit!';
    const encoded = encodeBase64(text);
    expect(encoded).toBe('SGVsbG8sIERldlRvb2xraXQh');
    const decoded = decodeBase64(encoded);
    expect(decoded).toBe(text);
  });

  it('supports Unicode, multilingual characters and emojis seamlessly', () => {
    const unicodeText = 'Halo Dunia! 🚀 程序员 日本語 Русский язык 🇮🇩';
    const encoded = encodeBase64(unicodeText);
    expect(encoded).toBeDefined();
    const decoded = decodeBase64(encoded);
    expect(decoded).toBe(unicodeText);
  });

  it('handles empty strings gracefully', () => {
    expect(encodeBase64('')).toBe('');
    expect(decodeBase64('')).toBe('');
  });

  it('strips newlines and spaces before decoding', () => {
    const original = 'Test string';
    const encoded = encodeBase64(original);
    const withWhitespace = `  \n${encoded.slice(0, 4)}\n${encoded.slice(4)}  \r\n`;
    expect(decodeBase64(withWhitespace)).toBe(original);
  });

  it('throws descriptive error on invalid Base64 characters', () => {
    expect(() => decodeBase64('Not Valid Base64!@#$')).toThrow(/Invalid Base64 string/);
  });

  it('throws error when Base64 length is not a multiple of 4', () => {
    expect(() => decodeBase64('ABCDE')).toThrow(/multiple of 4/);
  });
});

