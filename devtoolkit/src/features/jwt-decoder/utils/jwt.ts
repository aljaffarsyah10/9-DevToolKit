/**
 * JWT Decoder Engine
 * Pure business logic for inspecting JSON Web Tokens without cryptographic verification.
 */

export interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  expiresAt?: number;
  isExpired?: boolean;
}

/**
 * Decodes a Base64URL string into a UTF-8 text string.
 */
function decodeBase64Url(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Decodes a JSON Web Token (JWT) into its constituent header, payload claims, and signature.
 * Calculates expiration status if the 'exp' claim is present.
 * NOTE: This function does NOT perform cryptographic signature verification.
 */
export function decodeJwt(token: string): DecodedJwt {
  if (!token || !token.trim()) {
    throw new Error('JWT token string cannot be empty.');
  }

  const parts = token.trim().split('.');
  if (parts.length < 2 || parts.length > 3) {
    throw new Error(
      `Invalid JWT format: A valid JWT consists of 2 or 3 dot-separated segments (found ${parts.length}).`
    );
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  // 1. Parse Header
  let header: Record<string, unknown>;
  try {
    const headerStr = decodeBase64Url(headerB64);
    header = JSON.parse(headerStr);
    if (typeof header !== 'object' || header === null || Array.isArray(header)) {
      throw new Error('JWT header must be a JSON object.');
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid header encoding';
    throw new Error(`Failed to decode JWT header: ${msg}`);
  }

  // 2. Parse Payload
  let payload: Record<string, unknown>;
  try {
    const payloadStr = decodeBase64Url(payloadB64);
    payload = JSON.parse(payloadStr);
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      throw new Error('JWT payload must be a JSON object.');
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid payload encoding';
    throw new Error(`Failed to decode JWT payload: ${msg}`);
  }

  // 3. Signature segment (raw Base64Url)
  const signature = signatureB64 || '';

  // 4. Calculate expiration
  let expiresAt: number | undefined;
  let isExpired: boolean | undefined;

  if (typeof payload.exp === 'number') {
    expiresAt = payload.exp;
    // Current time in seconds
    const currentEpoch = Math.floor(Date.now() / 1000);
    isExpired = currentEpoch > payload.exp;
  }

  return {
    header,
    payload,
    signature,
    expiresAt,
    isExpired,
  };
}

