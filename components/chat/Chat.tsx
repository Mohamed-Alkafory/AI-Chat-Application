"use client";

import { useState, type FormEvent, useCallback, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Square } from "lucide-react";
import Sidebar from "./Sidebar";
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
    if (
      msg.includes("429") ||
      msg.includes("rate limit") ||
      msg.includes("quota")
    )
      return "rate-limit";
    if (
      msg.includes("fetch") ||
      msg.includes("network") ||
      msg.includes("econnrefused") ||
      msg.includes("enotfound")
    )
      return "network";
    if (msg.includes("tool")) return "tool";
    return "api";
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MessageList
          messages={messages}
          isLoading={isLoading}
          retrying={retrying}
          onExamplePrompt={handleExamplePrompt}
        />

        {isError && (
          <div className="px-4 pb-3 max-w-3xl mx-auto w-full">
            <ErrorCard
              errorType={hasPartialAssistant ? "mid-stream" : getErrorType()}
              hasPartialAssistant={hasPartialAssistant}
              onRetry={handleRetry}
              retrying={retrying}
            />
          </div>
        )}

        <div className="border-t border-border bg-background/80 backdrop-blur-lg">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto w-full px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
            aria-label="Chat message form"
          >
            <div className="flex items-end gap-2 glass rounded-2xl p-1.5 shadow-lg shadow-primary/5">
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about scoring a lead..."
                  disabled={isLoading || retrying}
                  className="w-full rounded-xl border-0 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 transition-all"
                  aria-label="Message input"
                />
              </div>
              {isLoading ? (
                <button
                  type="button"
                  onClick={stop}
                  className="shrink-0 w-10 h-10 rounded-xl bg-muted text-muted-foreground hover:text-foreground hover:bg-card-hover flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                  aria-label="Stop generating response"
                >
                  <Square className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || retrying}
                  className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center justify-center hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.05] active:scale-[0.95] transition-all duration-200 disabled:opacity-40 disabled:hover:shadow-none disabled:hover:scale-100 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
