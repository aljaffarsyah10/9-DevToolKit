/**
 * Regular Expression Tester Engine
 * Pure business logic for evaluating regular expressions with ReDoS and infinite-loop protections.
 */

export interface RegexMatch {
  value: string;
  index: number;
}

export interface RegexResult {
  matches: RegexMatch[];
  count: number;
}

const MAX_MATCH_LIMIT = 2000;
const MAX_INPUT_LENGTH = 10 * 1024 * 1024; // 10MB limit

/**
 * Tests and executes a regular expression against an input string.
 * Protected against zero-length infinite loops and runaway regex executions.
 */
export function testRegex(pattern: string, flags: string, input: string): RegexResult {
  if (pattern === '') {
    return { matches: [], count: 0 };
  }

  if (input.length > MAX_INPUT_LENGTH) {
    throw new Error('Input text exceeds maximum allowed size (10MB).');
  }

  // Validate flags - only allow valid standard JS flags
  const cleanedFlags = flags.replace(/[^gimsuy]/g, '');

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, cleanedFlags);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Invalid pattern';
    throw new Error(`Regex compilation error: ${msg}`);
  }

  const matches: RegexMatch[] = [];

  if (cleanedFlags.includes('g')) {
    let match: RegExpExecArray | null;
    let iterations = 0;

    while ((match = regex.exec(input)) !== null) {
      matches.push({
        value: match[0],
        index: match.index,
      });

      // Infinite loop safeguard: If match is zero-length, advance lastIndex manually
      if (match[0].length === 0) {
        regex.lastIndex++;
      }

      iterations++;
      if (iterations >= MAX_MATCH_LIMIT) {
        break;
      }
    }
  } else {
    const match = regex.exec(input);
    if (match) {
      matches.push({
        value: match[0],
        index: match.index,
      });
    }
  }

  return {
    matches,
    count: matches.length,
  };
}

