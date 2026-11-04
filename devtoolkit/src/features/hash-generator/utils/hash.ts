/**
 * Hash Generator Engine
 * Pure business logic for generating cryptographic hashes using Web Crypto Subtle API.
 */

export type HashAlgorithm = 'SHA-256' | 'SHA-512' | 'SHA-1';

export async function generateHash(input: string, algorithm: HashAlgorithm = 'SHA-256'): Promise<string> {
  if (input === '') {
    return '';
  }

  if (typeof crypto === 'undefined' || !crypto.subtle || typeof crypto.subtle.digest !== 'function') {
    throw new Error('Web Crypto subtle.digest API is not supported in this environment.');
  }

  const encodedData = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest(algorithm, encodedData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

