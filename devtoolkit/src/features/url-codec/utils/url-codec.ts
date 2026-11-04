/**
 * URL Encoder / Decoder Engine
 * Pure business logic for percent-encoding and decoding query strings and URIs.
 */

export function encodeUrl(input: string): string {
  if (input === '') return '';
  try {
    return encodeURIComponent(input);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'URL encode failed';
    throw new Error(`Failed to encode URL: ${msg}`);
  }
}

export function decodeUrl(input: string): string {
  if (input === '') return '';
  try {
    return decodeURIComponent(input.replace(/\+/g, ' '));
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'URL decode failed';
    throw new Error(`Failed to decode URL: ${msg}`);
  }
}

