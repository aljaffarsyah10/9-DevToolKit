import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { JsonFormatterView } from '@/features/json-formatter/components/json-formatter-view';
import { Base64View } from '@/features/base64/components/base64-view';
import { JwtDecoderView } from '@/features/jwt-decoder/components/jwt-decoder-view';
import { RegexTesterView } from '@/features/regex-tester/components/regex-tester-view';
import { UuidGeneratorView } from '@/features/uuid-generator/components/uuid-generator-view';
import { UrlCodecView } from '@/features/url-codec/components/url-codec-view';
import { TimestampConverterView } from '@/features/timestamp-converter/components/timestamp-converter-view';
import { HashGeneratorView } from '@/features/hash-generator/components/hash-generator-view';

describe('Phase 7 — Frontend & Backend Integration (End-to-End Flow)', () => {
  describe('JSON Formatter Integration', () => {
    it('formats unformatted JSON on Format button click', () => {
      render(<JsonFormatterView />);
      const inputArea = screen.getByPlaceholderText(/Paste raw or unformatted JSON here/i);
      fireEvent.change(inputArea, { target: { value: '{"name":"IntegrationTest","status":200}' } });

      const formatBtn = screen.getByRole('button', { name: /^Format$/i });
      fireEvent.click(formatBtn);

      expect(screen.getByText(/"name": "IntegrationTest"/)).toBeInTheDocument();
      expect(screen.getByText(/Valid JSON structure confirmed/i)).toBeInTheDocument();
    });

    it('shows error banner when invalid JSON is submitted', () => {
      render(<JsonFormatterView />);
      const inputArea = screen.getByPlaceholderText(/Paste raw or unformatted JSON here/i);
      fireEvent.change(inputArea, { target: { value: '{ invalid: json }' } });

      const formatBtn = screen.getByRole('button', { name: /^Format$/i });
      fireEvent.click(formatBtn);

      expect(screen.getByText(/JSON Validation \/ Parsing Error/i)).toBeInTheDocument();
    });
  });

  describe('Base64 Integration', () => {
    it('encodes UTF-8 text and decodes it back', () => {
      render(<Base64View />);
      const inputArea = screen.getByPlaceholderText(/Enter plain text/i);
      fireEvent.change(inputArea, { target: { value: 'Integration 🚀' } });

      const runBtn = screen.getByRole('button', { name: /Encode Text/i });
      fireEvent.click(runBtn);

      expect(screen.getByText('SW50ZWdyYXRpb24g8J+agA==')).toBeInTheDocument();
      expect(screen.getByText(/Successfully encoded to UTF-8 Base64/i)).toBeInTheDocument();
    });

    it('displays error on malformed Base64 decoding', () => {
      render(<Base64View />);
      // Switch to decode mode
      const decodeModeBtn = screen.getByText('Decode (Base64 ➔ Text)');
      fireEvent.click(decodeModeBtn);

      const inputArea = screen.getByPlaceholderText(/Enter Base64 string to decode/i);
      fireEvent.change(inputArea, { target: { value: 'Not-Valid-Base64!!!' } });

      const runBtn = screen.getByRole('button', { name: /Decode Base64/i });
      fireEvent.click(runBtn);

      expect(screen.getByText(/Base64 Decoding \/ Encoding Error/i)).toBeInTheDocument();
    });
  });

  describe('JWT Decoder Integration', () => {
    it('decodes real token and displays payload and active expiration', () => {
      render(<JwtDecoderView />);
      const decodeBtn = screen.getByRole('button', { name: /Decode JWT/i });
      fireEvent.click(decodeBtn);

      expect(screen.getByText(/"name": "Alex Developer"/)).toBeInTheDocument();
      expect(screen.getByText(/"role": "admin"/)).toBeInTheDocument();
      expect(screen.getByText(/Token Active/i)).toBeInTheDocument();
    });

    it('displays error message on malformed JWT string', () => {
      render(<JwtDecoderView />);
      const inputArea = screen.getByPlaceholderText(/Paste raw JWT string/i);
      fireEvent.change(inputArea, { target: { value: 'malformed.jwt' } });

      const decodeBtn = screen.getByRole('button', { name: /Decode JWT/i });
      fireEvent.click(decodeBtn);

      expect(screen.getByText(/Invalid JWT Token/i)).toBeInTheDocument();
    });
  });

  describe('Regex Tester Integration', () => {
    it('evaluates matches against test string using pure regex engine', () => {
      render(<RegexTesterView />);
      const testBtn = screen.getByRole('button', { name: /Test Regex/i });
      fireEvent.click(testBtn);

      expect(screen.getByText(/2 matches found/i)).toBeInTheDocument();
      expect(screen.getByText('support@devtoolkit.io')).toBeInTheDocument();
      expect(screen.getByText('team@devtoolkit.io')).toBeInTheDocument();
    });

    it('handles syntax errors safely without crash', () => {
      render(<RegexTesterView />);
      const patternInput = screen.getByPlaceholderText(/Regex pattern/i);
      fireEvent.change(patternInput, { target: { value: '(?invalid' } });

      const testBtn = screen.getByRole('button', { name: /Test Regex/i });
      fireEvent.click(testBtn);

      expect(screen.getByText(/Regular Expression Syntax Error/i)).toBeInTheDocument();
    });
  });

  describe('UUID Generator Integration', () => {
    it('generates real RFC4122 v4 UUIDs', () => {
      render(<UuidGeneratorView />);
      const generateBtn = screen.getAllByRole('button', { name: /Generate UUIDs/i })[0];
      fireEvent.click(generateBtn);

      expect(screen.getByText(/Cryptographically generated via Web Crypto/i)).toBeInTheDocument();
    });
  });

  describe('URL Codec Integration', () => {
    it('encodes and decodes URL strings', () => {
      render(<UrlCodecView />);
      const inputArea = screen.getByPlaceholderText(/Enter raw URI or query string/i);
      fireEvent.change(inputArea, { target: { value: 'https://devtoolkit.dev?q=test query' } });

      const encodeBtn = screen.getByRole('button', { name: /^Encode$/i });
      fireEvent.click(encodeBtn);

      expect(screen.getByText(/Successfully percent-encoded URL/i)).toBeInTheDocument();
    });
  });

  describe('Timestamp Converter Integration', () => {
    it('converts Unix epoch timestamp to ISO string', () => {
      render(<TimestampConverterView />);
      const inputArea = screen.getByPlaceholderText(/Enter Unix seconds/i);
      fireEvent.change(inputArea, { target: { value: '1700000000' } });

      const convertBtn = screen.getByRole('button', { name: /Convert Timestamp/i });
      fireEvent.click(convertBtn);

      expect(screen.getByText('2023-11-14T22:13:20.000Z')).toBeInTheDocument();
    });
  });

  describe('Hash Generator Integration', () => {
    it('generates SHA-256 hash digest asynchronously', async () => {
      render(<HashGeneratorView />);
      const inputArea = screen.getByPlaceholderText(/Enter text to compute cryptographic hash/i);
      fireEvent.change(inputArea, { target: { value: 'hello world' } });

      const hashBtn = screen.getByRole('button', { name: /Calculate Hash/i });
      fireEvent.click(hashBtn);

      expect(await screen.findByText(/b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9/)).toBeInTheDocument();
    });
  });
});

