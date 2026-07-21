"use client";

import { RefreshCw, WifiOff, Ban, Terminal, Brain } from "lucide-react";

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

  const Icon = config.icon;

  return (
    <div
      className="rounded-xl border border-error/20 bg-error/5 p-5 space-y-4 shadow-lg shadow-error/5"
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-error" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-sm font-semibold text-error mb-1">
            {config.title}
          </p>
          <p className="text-sm text-error/80 leading-relaxed">
            {config.message}
          </p>
        </div>
      </div>
      <button
        onClick={onRetry}
        disabled={retrying}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-error/25 text-sm font-medium text-error hover:bg-error/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-error focus-visible:outline-offset-2"
        aria-label={retrying ? "Retrying request" : "Retry request"}
      >
        <RefreshCw
          className={`w-4 h-4 ${retrying ? "animate-spin" : ""}`}
          aria-hidden="true"
        />
        {retrying ? "Retrying..." : "Try again"}
      </button>
    </div>
  );
}

function getErrorConfig(
  type: string | null,
  partial: boolean,
): { title: string; message: string; icon: React.ComponentType<{ className?: string }> } {
  if (partial) {
    return {
      title: "Connection lost",
      message:
        "The response was interrupted. Your conversation is preserved.",
      icon: WifiOff,
    };
  }

  switch (type) {
    case "network":
      return {
        title: "Network error",
        message:
          "Unable to reach the AI service. Please check your internet connection.",
        icon: WifiOff,
      };
    case "rate-limit":
      return {
        title: "Rate limit exceeded",
        message:
          "Too many requests. Please wait a moment before sending another message.",
        icon: Ban,
      };
    case "tool":
      return {
        title: "Tool error",
        message:
          "The tool encountered an issue. Please rephrase your request and try again.",
        icon: Terminal,
      };
    default:
      return {
        title: "Something went wrong",
        message:
          "An unexpected error occurred. Please try again or rephrase your message.",
        icon: Brain,
      };
  }
}
