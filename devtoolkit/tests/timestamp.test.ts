import { describe, it, expect } from 'vitest';
import {
  convertTimestamp,
  getCurrentUnixSeconds,
  getCurrentUnixMillis,
  getRelativeTimeString,
} from '../src/features/timestamp-converter/utils/timestamp';

describe('Unix Timestamp Converter Engine', () => {
  it('should convert Unix epoch seconds correctly', () => {
    // 1700000000 = Wed Nov 15 2023 00:00:00 UTC (millis = 1700000000000)
    const result = convertTimestamp(1700000000);
    expect(result.unixSeconds).toBe(1700000000);
    expect(result.unixMillis).toBe(1700000000000);
    expect(result.iso8601).toBe('2023-11-14T22:13:20.000Z');
    expect(result.utcString).toBe('Tue, 14 Nov 2023 22:13:20 GMT');
  });

  it('should convert Unix epoch seconds passed as string', () => {
    const result = convertTimestamp('1700000000');
    expect(result.unixSeconds).toBe(1700000000);
    expect(result.unixMillis).toBe(1700000000000);
  });

  it('should convert Unix milliseconds (13 digits)', () => {
    const result = convertTimestamp(1700000000000);
    expect(result.unixSeconds).toBe(1700000000);
    expect(result.unixMillis).toBe(1700000000000);
  });

  it('should convert ISO 8601 date string', () => {
    const result = convertTimestamp('2025-01-01T00:00:00.000Z');
    expect(result.iso8601).toBe('2025-01-01T00:00:00.000Z');
    expect(result.unixSeconds).toBe(1735689600);
  });

  it('should calculate relative time strings', () => {
    const now = new Date('2025-01-01T12:00:00Z');
    const past = new Date('2025-01-01T11:55:00Z'); // 5 minutes ago
    const future = new Date('2025-01-01T14:00:00Z'); // in 2 hours

    expect(getRelativeTimeString(past, now)).toMatch(/5 minutes ago/i);
    expect(getRelativeTimeString(future, now)).toMatch(/in 2 hours/i);
  });

  it('should return valid current seconds and milliseconds', () => {
    const sec = getCurrentUnixSeconds();
    const millis = getCurrentUnixMillis();
    expect(sec).toBeGreaterThan(1700000000);
    expect(millis).toBeGreaterThan(1700000000000);
    expect(Math.floor(millis / 1000)).toBe(sec);
  });

  it('should throw on empty or invalid inputs', () => {
    expect(() => convertTimestamp('')).toThrow(/cannot be empty/i);
    expect(() => convertTimestamp('invalid-date-format-xyz')).toThrow(/Invalid date/i);
  });
});

