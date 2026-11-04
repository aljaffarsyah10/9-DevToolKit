/**
 * File Download Utility
 * Triggers a browser download of text content as a file without server interaction.
 */

export function downloadTextFile(filename: string, content: string, mimeType = 'text/plain'): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

