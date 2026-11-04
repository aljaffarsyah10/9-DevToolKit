/**
 * Base64 Encoding & Decoding Engine
 * Pure business logic utilities with full UTF-8 Unicode support.
 */

/**
 * Encodes a UTF-8 string into its Base64 representation.
 * Supports arbitrary Unicode characters, emojis, and multilingual text.
 */
export function encodeBase64(input: string): string {
  if (input === '') {
    return '';
  }

  try {
    const bytes = new TextEncoder().encode(input);
    let binary = '';
    const len = bytes.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Encoding failed';
    throw new Error(`Failed to encode string to Base64: ${msg}`);
  }
}

/**
 * Decodes a Base64 string back into its original UTF-8 text representation.
 * Throws an informative error if the input contains invalid Base64 characters or malformed padding.
 */
export function decodeBase64(input: string): string {
  if (input === '') {
    return '';
  }

  // Strip whitespaces, line breaks, and tabs
  const cleaned = input.trim().replace(/\s+/g, '');

  if (cleaned === '') {
    return '';
  }

  // Check valid Base64 alphabet and padding
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned)) {
    throw new Error('Invalid Base64 string: contains illegal characters.');
  }

  if (cleaned.length % 4 !== 0) {
    throw new Error('Invalid Base64 string: length must be a multiple of 4.');
  }

  try {
    const binary = atob(cleaned);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Decoding failed';
    throw new Error(`Failed to decode Base64 string: ${msg}`);
  }
}

