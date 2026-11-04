import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import HomePage from '../src/app/page';
import { JsonFormatterView } from '../src/features/json-formatter/components/json-formatter-view';
import { AppShell } from '../src/components/layout/app-shell';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
}));

describe('End-to-End User Workflows (Simulated Client Browser)', () => {
  it('Homepage: filters tools via search input in real time', () => {
    render(<HomePage />);

    // Initially all tools rendered
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument();
    expect(screen.getByText('Base64 Encoder / Decoder')).toBeInTheDocument();

    // Type query "jwt"
    const searchInput = screen.getByPlaceholderText(/Search tools by name/i);
    fireEvent.change(searchInput, { target: { value: 'jwt' } });

    // JWT decoder should remain, others filtered
    expect(screen.getByText('JWT Decoder')).toBeInTheDocument();
    expect(screen.queryByText('Base64 Encoder / Decoder')).not.toBeInTheDocument();

    // Clear search
    const clearBtn = screen.getByRole('button', { name: /Clear/i });
    fireEvent.click(clearBtn);
    expect(screen.getByText('Base64 Encoder / Decoder')).toBeInTheDocument();
  });

  it('Homepage: toggles category tabs', () => {
    render(<HomePage />);

    // Click "Security" category
    const securityBtn = screen.getByRole('button', { name: /^Security/i });
    fireEvent.click(securityBtn);

    expect(screen.getByText('JWT Decoder')).toBeInTheDocument();
    expect(screen.getByText('Hash Generator')).toBeInTheDocument();
    expect(screen.queryByText('JSON Formatter')).not.toBeInTheDocument();
  });

  it('Tool Workflow: user pastes JSON, formats with indentation, and validates error state', () => {
    render(<JsonFormatterView />);

    const inputArea = screen.getByPlaceholderText(/Paste raw or unformatted JSON here/i);
    fireEvent.change(inputArea, { target: { value: '{"theme":"dark","version":1}' } });

    // Click Format
    const formatBtn = screen.getByRole('button', { name: /^Format$/i });
    fireEvent.click(formatBtn);

    expect(screen.getByText(/"theme": "dark"/)).toBeInTheDocument();
    expect(screen.getByText(/Valid JSON structure confirmed/i)).toBeInTheDocument();

    // Click Minify
    const minifyBtn = screen.getByRole('button', { name: /^Minify$/i });
    fireEvent.click(minifyBtn);
    expect(screen.getAllByText('{"theme":"dark","version":1}').length).toBeGreaterThanOrEqual(1);

    // Invalid JSON shows error
    fireEvent.change(inputArea, { target: { value: 'not valid json' } });
    fireEvent.click(formatBtn);
    expect(screen.getByText(/JSON Validation \/ Parsing Error/i)).toBeInTheDocument();
  });

  it('Application Shell: opens Command Palette on Cmd+K and Shortcuts modal on ?', () => {
    render(
      <AppShell>
        <div data-testid="main-content">DevToolkit Suite</div>
      </AppShell>
    );

    expect(screen.getByTestId('main-content')).toBeInTheDocument();

    // Trigger Cmd+K
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    expect(screen.getByRole('dialog', { name: /Command Palette/i })).toBeInTheDocument();

    // Press Escape to dismiss
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /Command Palette/i })).not.toBeInTheDocument();

    // Trigger ? key
    fireEvent.keyDown(window, { key: '?' });
    expect(screen.getByRole('dialog', { name: /Keyboard Shortcuts/i })).toBeInTheDocument();
  });
});
