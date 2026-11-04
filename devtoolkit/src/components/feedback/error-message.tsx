import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  details?: string;
  className?: string;
}

export function ErrorMessage({ message, details, className = '' }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive ${className}`}
    >
      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-destructive" />
      <div className="flex-1 space-y-0.5">
        <p className="font-medium">{message}</p>
        {details && <p className="text-[11px] opacity-90 font-mono">{details}</p>}
      </div>
    </div>
  );
}

