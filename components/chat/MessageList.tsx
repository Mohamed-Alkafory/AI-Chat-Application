"use client";

import type { UIMessage } from "ai";
import { isTextUIPart, isToolUIPart } from "ai";
import ToolPart from "./ToolPart";
import { MessageSkeleton } from "./MessageSkeleton";

const EXAMPLE_PROMPTS = [
  'Score a lead for Sarah from InnoTech with a $60,000 budget',
  'Evaluate a lead from Acme Corp with a $15,000 budget',
  'Score John from StartupXYZ with a $5,000 budget',
];

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
  const hasContent = message.parts.some(
    (part) => (isTextUIPart(part) && part.text) || isToolUIPart(part),
  );

  if (!hasContent) return null;

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

function EmptyState({
  onExamplePrompt,
}: {
  onExamplePrompt: (prompt: string) => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center max-w-md space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
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
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Start a conversation
          </h3>
          <p className="text-sm text-muted-foreground">
            Try one of these example prompts to score a lead:
          </p>
        </div>
        <div className="space-y-2.5">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onExamplePrompt(prompt)}
              className="w-full text-left px-4 py-3 rounded-xl bg-card border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-card-hover transition-all duration-200"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NoResultsState() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-card border border-border px-4 py-3">
        <p className="text-sm text-muted-foreground">
          I wasn&apos;t able to process that request. Try rephrasing or providing
          lead details like name, company, and budget.
        </p>
      </div>
    </div>
  );
}

export default function MessageList({
  messages,
  isLoading,
  retrying,
  onExamplePrompt,
}: {
  messages: UIMessage[];
  isLoading: boolean;
  retrying: boolean;
  onExamplePrompt: (prompt: string) => void;
}) {
  if (messages.length === 0) {
    return <EmptyState onExamplePrompt={onExamplePrompt} />;
  }

  const lastAssistant = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");
  const showNoResults =
    lastAssistant &&
    !isLoading &&
    !retrying &&
    lastAssistant.parts.every(
      (part) =>
        (isTextUIPart(part) && !part.text) ||
        (isToolUIPart(part) && part.state === "output-error"),
    );

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 scroll-smooth">
      {messages.map((message) => {
        if (message.role === "user") {
          return <UserMessage key={message.id} message={message} />;
        }

        if (message.role === "assistant") {
          return <AssistantMessage key={message.id} message={message} />;
        }

        return null;
      })}

      {showNoResults && <NoResultsState />}

      {isLoading && (
        <>
          <MessageSkeleton />
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 bg-card border border-border rounded-full px-4 py-2.5">
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-dot-1" />
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-dot-2" />
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-dot-3" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
