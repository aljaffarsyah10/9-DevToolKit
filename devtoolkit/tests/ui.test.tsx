import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { JsonFormatterView } from '@/features/json-formatter/components/json-formatter-view';
import { Base64View } from '@/features/base64/components/base64-view';
import { JwtDecoderView } from '@/features/jwt-decoder/components/jwt-decoder-view';
import { RegexTesterView } from '@/features/regex-tester/components/regex-tester-view';
import { UuidGeneratorView } from '@/features/uuid-generator/components/uuid-generator-view';

describe('Phase 5 — Core Frontend UI Features', () => {
  it('renders JSON Formatter interface with controls', () => {
    render(<JsonFormatterView />);
    expect(
      screen.getByRole('heading', { name: /JSON Formatter & Validator/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Format$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Minify$/i })).toBeInTheDocument();
  });

  it('renders Base64 interface with mode switches', () => {
    render(<Base64View />);
    expect(
      screen.getByRole('heading', { name: /Base64 Encoder \/ Decoder/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Encode (Text ➔ Base64)')).toBeInTheDocument();
    expect(screen.getByText('Decode (Base64 ➔ Text)')).toBeInTheDocument();
  });

  it('renders JWT Decoder interface with security notice', () => {
    render(<JwtDecoderView />);
    expect(
      screen.getByRole('heading', { name: /JWT Decoder/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Client-Side Decoder Notice')).toBeInTheDocument();
  });

  it('renders Regex Tester interface with pattern input and flags', () => {
    render(<RegexTesterView />);
    expect(
      screen.getByRole('heading', { name: /Regex Tester/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Test Regex/i })).toBeInTheDocument();
  });

  it('renders UUID Generator interface with quantity options', () => {
    render(<UuidGeneratorView />);
    expect(
      screen.getByRole('heading', { name: /UUID Generator/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Generate UUIDs/i })[0]).toBeInTheDocument();
  });
});
