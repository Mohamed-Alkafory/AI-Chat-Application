"use client";

export function ErrorCard({
  errorType,
  hasPartialAssistant,
  onRetry,
  retrying,
}: {
  errorType: "network" | "rate-limit" | "tool" | "api" | "mid-stream" | null;
  hasPartialAssistant: boolean;
  onRetry: () => void;
  retrying: boolean;
}) {
  const config = getErrorConfig(errorType, hasPartialAssistant);

  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
          <svg
            width="16"
            height="16"
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
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-red-400 mb-1">{config.title}</p>
          <p className="text-sm text-red-300/80">{config.message}</p>
        </div>
      </div>
      <button
        onClick={onRetry}
        disabled={retrying}
        className="w-full py-2 rounded-lg border border-red-500/30 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {retrying ? "Retrying..." : "Retry"}
      </button>
    </div>
  );
}

function getErrorConfig(
  type: string | null,
  partial: boolean,
): { title: string; message: string } {
  if (partial) {
    return {
      title: "Connection lost while generating",
      message:
        "The response was interrupted. Your conversation is preserved. Click retry to continue.",
    };
  }

  switch (type) {
    case "network":
      return {
        title: "Network error",
        message:
          "Unable to reach the AI service. Please check your internet connection and try again.",
      };
    case "rate-limit":
      return {
        title: "Rate limit exceeded",
        message:
          "Too many requests. Please wait a moment before sending another message.",
      };
    case "tool":
      return {
        title: "Tool error",
        message:
          "The tool encountered an issue. Please rephrase your request and try again.",
      };
    default:
      return {
        title: "Something went wrong",
        message:
          "An unexpected error occurred. Please try again or rephrase your message.",
      };
  }
}
