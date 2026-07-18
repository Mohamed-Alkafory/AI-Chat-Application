"use client";

export default function ToolError({ errorText }: { errorText: string }) {
  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-red-500/15 flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-400"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <span className="text-sm font-medium text-red-400">Tool Error</span>
      </div>
      <p className="text-sm text-red-300/80">{errorText}</p>
      <p className="text-xs text-red-400/60">
        You can try again or rephrase your request.
      </p>
    </div>
  );
}
