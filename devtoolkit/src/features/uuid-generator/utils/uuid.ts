/**
 * UUID v4 Generator Engine
 * Pure business logic for generating RFC4122 version 4 cryptographically secure UUIDs.
 */

export interface UuidOptions {
  uppercase?: boolean;
  hyphens?: boolean;
}

/**
 * Generates a single RFC4122 version 4 UUID.
 * Uses native Web Crypto crypto.randomUUID when available, with crypto.getRandomValues fallback.
 * Strictly avoids Math.random().
 */
export function generateSingleV4Uuid(options?: UuidOptions): string {
  let uuid: string;

  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    uuid = crypto.randomUUID();
  } else if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    // RFC4122 v4 compliance:
    // Set 4 most significant bits of the 7th byte to 0100 (version 4)
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    // Set 2 most significant bits of the 9th byte to 10 (variant RFC4122)
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  } else {
    throw new Error('Web Crypto API is not available in the current environment.');
  }

  if (options?.hyphens === false) {
    uuid = uuid.replace(/-/g, '');
  }

  if (options?.uppercase === true) {
    uuid = uuid.toUpperCase();
  } else {
    uuid = uuid.toLowerCase();
  }

  return uuid;
}

/**
 * Generates an array of UUID v4 strings.
 * @param count Number of UUIDs to generate (1 to 1000)
 * @param options Optional formatting options (uppercase, hyphens)
 */
export function generateUUID(count: number, options?: UuidOptions): string[] {
  if (count < 1) {
    throw new Error('Count must be at least 1.');
  }

  if (count > 1000) {
    throw new Error('Cannot generate more than 1000 UUIDs in a single batch.');
  }

  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    results.push(generateSingleV4Uuid(options));
  }

  return results;
}

