import { describe, it, expect } from 'vitest';
import { generateHash } from '../src/features/hash-generator/utils/hash';

describe('Hash Generator Engine', () => {
  it('should return empty string for empty input', async () => {
    const hash = await generateHash('');
    expect(hash).toBe('');
  });

  it('should calculate correct SHA-256 hash for hello world', async () => {
    // Known SHA-256 vector for "hello world"
    // b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
    const hash = await generateHash('hello world', 'SHA-256');
    expect(hash).toBe('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9');
  });

  it('should calculate correct SHA-512 hash', async () => {
    // Known SHA-512 vector for "hello world"
    // 309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f
    const hash = await generateHash('hello world', 'SHA-512');
    expect(hash).toBe(
      '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f'
    );
  });

  it('should calculate correct SHA-1 hash', async () => {
    // Known SHA-1 vector for "hello world"
    // 2aae6c35c94fcfb415dbe95f408b9ce91ee846ed
    const hash = await generateHash('hello world', 'SHA-1');
    expect(hash).toBe('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed');
  });
});

