/**
 * JSON Formatter, Minifier, and Validator Engine
 * Pure business logic utilities for JSON data manipulation.
 */

export interface JsonValidationResult {
  valid: boolean;
  error?: string;
  line?: number;
  column?: number;
}

/**
 * Parses and formats a JSON string with the specified indentation.
 * Throws a descriptive error if the input is malformed or empty.
 */
export function formatJson(input: string, spaces: number | string = 2): string {
  if (!input || !input.trim()) {
    throw new Error('Input cannot be empty.');
  }

  // Cap input size defensively (e.g. 20MB)
  if (input.length > 20 * 1024 * 1024) {
    throw new Error('JSON input exceeds the maximum supported size of 20MB.');
  }

  try {
    const parsed = JSON.parse(input);
    const indent = typeof spaces === 'string' ? spaces : spaces;
    return JSON.stringify(parsed, null, indent);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid JSON syntax';
    throw new Error(`Failed to format JSON: ${message}`);
  }
}

/**
 * Minifies a JSON string by removing all unnecessary whitespace.
 * Throws an error if input is malformed.
 */
export function minifyJson(input: string): string {
  if (!input || !input.trim()) {
    throw new Error('Input cannot be empty.');
  }

  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid JSON syntax';
    throw new Error(`Failed to minify JSON: ${message}`);
  }
}

/**
 * Validates a JSON string and returns a validation result object.
 * Safe function that does not throw exceptions.
 */
export function validateJson(input: string): JsonValidationResult {
  if (!input || !input.trim()) {
    return {
      valid: false,
      error: 'Input is empty.',
    };
  }

  try {
    JSON.parse(input);
    return { valid: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid JSON syntax';

    // Extract line/column information if present in error message
    let line: number | undefined;
    let column: number | undefined;

    const lineColMatch = message.match(/line (\d+) column (\d+)/i);
    if (lineColMatch) {
      line = parseInt(lineColMatch[1], 10);
      column = parseInt(lineColMatch[2], 10);
    } else {
      const posMatch = message.match(/position (\d+)/i);
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const upToPos = input.slice(0, pos);
        const lines = upToPos.split('\n');
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }
    }

    return {
      valid: false,
      error: message,
      line,
      column,
    };
  }
}

