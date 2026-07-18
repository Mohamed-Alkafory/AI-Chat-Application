"use client";

import type { UIMessage } from "ai";
import { isTextUIPart, isToolUIPart } from "ai";
import ToolPart from "./ToolPart";

function UserMessage({ message }: { message: UIMessage }) {
  const textParts = message.parts.filter(isTextUIPart);
  const content = textParts.map((p) => p.text).join("");

  if (!content) return null;

  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-gradient-to-r from-primary to-accent px-4 py-2.5">
        <p className="text-sm text-primary-foreground whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}

function AssistantMessage({ message }: { message: UIMessage }) {
  return (
    <div className="space-y-3">
      {message.parts.map((part, index) => {
        if (isTextUIPart(part)) {
          if (!part.text) return null;
          return (
            <div key={index} className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-card border border-border px-4 py-2.5">
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {part.text}
                </p>
              </div>
            </div>
          );
        }

        if (isToolUIPart(part)) {
          return (
            <div key={part.toolCallId} className="flex justify-start max-w-[85%]">
              <ToolPart part={part} />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

export default function MessageList({
  messages,
  isLoading,
}: {
  messages: UIMessage[];
  isLoading: boolean;
}) {
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Start a conversation
          </h3>
          <p className="text-sm text-muted-foreground">
            Try asking: &ldquo;Score a lead for John from Acme Corp with a
            budget of $50,000&rdquo;
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-1">
      {messages.map((message) => {
        if (message.role === "user") {
          return <UserMessage key={message.id} message={message} />;
        }

        if (message.role === "assistant") {
          return <AssistantMessage key={message.id} message={message} />;
        }

        return null;
      })}

      {isLoading && (
        <div className="flex justify-start">
          <div className="flex items-center gap-1.5 bg-card border border-border rounded-full px-4 py-2.5">
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-dot-1" />
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-dot-2" />
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-dot-3" />
          </div>
        </div>
      )}
    </div>
  );
}
