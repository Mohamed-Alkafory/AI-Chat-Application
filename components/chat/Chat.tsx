"use client";

import { useState, type FormEvent, useCallback, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import MessageList from "./MessageList";
import { ErrorCard } from "./ErrorCard";

export default function Chat() {
  const [input, setInput] = useState("");
  const [retrying, setRetrying] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const testError =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("testError")
      : null;

  const transport = testError
    ? new DefaultChatTransport({ body: { testError } })
    : undefined;

  const { messages, sendMessage, status, error, regenerate, stop } = useChat({
    transport,
  });

  const isLoading = status === "submitted" || status === "streaming";
  const isError = status === "error" && error;

  const hasPartialAssistant = messages.some(
    (m) => m.role === "assistant" && m.parts.length > 0,
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading || retrying) return;
      sendMessage({ text: input.trim() });
      setInput("");
    },
    [input, isLoading, retrying, sendMessage],
  );

  const handleRetry = useCallback(async () => {
    if (retrying || isLoading) return;
    setRetrying(true);
    try {
      await regenerate();
    } catch {
      /* ignore retry errors */
    } finally {
      setRetrying(false);
    }
  }, [retrying, isLoading, regenerate]);

  const handleExamplePrompt = useCallback(
    (prompt: string) => {
      if (isLoading || retrying) return;
      sendMessage({ text: prompt });
    },
    [isLoading, retrying, sendMessage],
  );

  const getErrorType = () => {
    if (!error) return null;
    const msg = error.message?.toLowerCase() || "";
    if (msg.includes("429") || msg.includes("rate limit") || msg.includes("quota")) return "rate-limit";
    if (msg.includes("fetch") || msg.includes("network") || msg.includes("econnrefused") || msg.includes("enotfound")) return "network";
    if (msg.includes("tool")) return "tool";
    return "api";
  };

  return (
    <div className="flex flex-col h-full">
      <MessageList
        messages={messages}
        isLoading={isLoading}
        retrying={retrying}
        onExamplePrompt={handleExamplePrompt}
      />

      {isError && (
        <div className="mx-4 mb-3">
          <ErrorCard
            errorType={hasPartialAssistant ? "mid-stream" : getErrorType()}
            hasPartialAssistant={hasPartialAssistant}
            onRetry={handleRetry}
            retrying={retrying}
          />
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="border-t border-border p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-background/50 backdrop-blur-sm"
      >
        <div className="flex items-end gap-2 max-w-3xl mx-auto">
          <div className="flex-1 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about scoring a lead..."
              disabled={isLoading || retrying}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 disabled:opacity-50 transition-all"
            />
          </div>
          {isLoading && (
            <button
              type="button"
              onClick={stop}
              className="shrink-0 px-3 h-10 rounded-xl bg-muted text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
            >
              Stop
            </button>
          )}
          <button
            type="submit"
            disabled={!input.trim() || isLoading || retrying}
            className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center justify-center hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-40 disabled:hover:shadow-none"
            aria-label="Send message"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
