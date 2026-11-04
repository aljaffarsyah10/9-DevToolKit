/**
 * Unix Timestamp Converter Engine
 * Pure business logic for converting timestamps between Unix seconds, milliseconds, ISO 8601, and local formats.
 */

export interface TimestampDetails {
  unixSeconds: number;
  unixMillis: number;
  iso8601: string;
  utcString: string;
  localString: string;
  relativeTime: string;
}

export function getCurrentUnixSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

export function getCurrentUnixMillis(): number {
  return Date.now();
}

/**
 * Calculates a friendly relative time string (e.g., "5 minutes ago", "in 2 hours").
 */
export function getRelativeTimeString(date: Date, now: Date = new Date()): string {
  const diffSec = Math.round((date.getTime() - now.getTime()) / 1000);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(diffSec) < 60) {
    return rtf.format(diffSec, 'second');
  }
  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffMin) < 60) {
    return rtf.format(diffMin, 'minute');
  }
  const diffHour = Math.round(diffMin / 60);
  if (Math.abs(diffHour) < 24) {
    return rtf.format(diffHour, 'hour');
  }
  const diffDay = Math.round(diffHour / 24);
  if (Math.abs(diffDay) < 30) {
    return rtf.format(diffDay, 'day');
  }
  const diffMonth = Math.round(diffDay / 30);
  if (Math.abs(diffMonth) < 12) {
    return rtf.format(diffMonth, 'month');
  }
  const diffYear = Math.round(diffDay / 365);
  return rtf.format(diffYear, 'year');
}

/**
 * Parses a variety of timestamp inputs (Unix seconds, milliseconds, or ISO date string).
 */
export function convertTimestamp(input: string | number): TimestampDetails {
  let date: Date;

  if (typeof input === 'number') {
    // Determine whether input is seconds (< 1e11) or milliseconds
    date = input < 1e11 ? new Date(input * 1000) : new Date(input);
  } else {
    const trimmed = input.trim();
    if (!trimmed) {
      throw new Error('Timestamp input cannot be empty.');
    }

    // Check if numeric string
    if (/^-?\d+$/.test(trimmed)) {
      const num = parseInt(trimmed, 10);
      date = num < 1e11 ? new Date(num * 1000) : new Date(num);
    } else {
      // Parse as ISO / date string
      date = new Date(trimmed);
    }
  }

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date or timestamp format.');
  }

  const unixMillis = date.getTime();
  const unixSeconds = Math.floor(unixMillis / 1000);

  return {
    unixSeconds,
    unixMillis,
    iso8601: date.toISOString(),
    utcString: date.toUTCString(),
    localString: date.toLocaleString(),
    relativeTime: getRelativeTimeString(date),
  };
}

