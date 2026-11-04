/**
 * Clipboard Utility
 * Safe asynchronous clipboard writing with fallback support for non-secure / older browser contexts.
 */

/**
 * Copies a text string to the system clipboard.
 * Throws an error if clipboard operations are blocked or unsupported.
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (typeof text !== 'string') {
    throw new Error('Text to copy must be a string.');
  }

  // 1. Try modern asynchronous Clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Permission denied or non-secure context, attempt legacy fallback
    }
  }

  // 2. Fallback using document.execCommand('copy') in browser DOM
  if (typeof document !== 'undefined') {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // Hide offscreen
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (!successful) {
        throw new Error('document.execCommand copy was unsuccessful.');
      }
      return;
    } catch (err: unknown) {
      document.body.removeChild(textArea);
      const msg = err instanceof Error ? err.message : 'Fallback copy failed';
      throw new Error(`Clipboard copy failed: ${msg}`);
    }
  }

  throw new Error('Clipboard API is not available in this environment.');
}

