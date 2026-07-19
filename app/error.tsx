"use client";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background p-6">
      <div className="max-w-md text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/15 flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-400"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-muted-foreground">
            An unexpected error occurred. Please try again.
          </p>
        </div>
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
