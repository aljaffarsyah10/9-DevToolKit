import { describe, it, expect } from 'vitest';
import { decodeJwt } from '@/features/jwt-decoder/utils/jwt';

describe('JWT Decoder Engine', () => {
  // Helper to generate a dummy JWT token without signature validation
  const createMockJwt = (
    header: Record<string, unknown>,
    payload: Record<string, unknown>,
    sig = 'mock_signature'
  ) => {
    const toB64Url = (obj: object) =>
      btoa(JSON.stringify(obj))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    return `${toB64Url(header)}.${toB64Url(payload)}.${sig}`;
  };

  it('decodes a standard valid 3-part JWT', () => {
    const token = createMockJwt(
      { alg: 'HS256', typ: 'JWT' },
      { sub: 'usr-42', name: 'John Doe', admin: true }
    );

    const result = decodeJwt(token);
    expect(result.header).toEqual({ alg: 'HS256', typ: 'JWT' });
    expect(result.payload.sub).toBe('usr-42');
    expect(result.payload.name).toBe('John Doe');
    expect(result.signature).toBe('mock_signature');
  });

  it('correctly calculates active expiration status', () => {
    const futureExp = Math.floor(Date.now() / 1000) + 3600; // 1 hour ahead
    const token = createMockJwt(
      { alg: 'HS256' },
      { sub: 'usr-42', exp: futureExp }
    );

    const result = decodeJwt(token);
    expect(result.expiresAt).toBe(futureExp);
    expect(result.isExpired).toBe(false);
  });

  it('correctly calculates expired expiration status', () => {
    const pastExp = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
    const token = createMockJwt(
      { alg: 'HS256' },
      { sub: 'usr-42', exp: pastExp }
    );

    const result = decodeJwt(token);
    expect(result.expiresAt).toBe(pastExp);
    expect(result.isExpired).toBe(true);
  });

  it('handles tokens without an exp claim', () => {
    const token = createMockJwt({ alg: 'HS256' }, { sub: 'usr-no-exp' });
    const result = decodeJwt(token);
    expect(result.expiresAt).toBeUndefined();
    expect(result.isExpired).toBeUndefined();
  });

  it('throws error on empty token string', () => {
    expect(() => decodeJwt('')).toThrow('JWT token string cannot be empty');
  });

  it('throws error when token has fewer than 2 segments', () => {
    expect(() => decodeJwt('single-segment-token')).toThrow(/Invalid JWT format/);
  });

  it('throws error when header contains malformed JSON', () => {
    const badHeader = btoa('invalid json').replace(/=+$/, '');
    const validPayload = btoa('{"valid":true}').replace(/=+$/, '');
    expect(() => decodeJwt(`${badHeader}.${validPayload}.sig`)).toThrow(/Failed to decode JWT header/);
  });
});
