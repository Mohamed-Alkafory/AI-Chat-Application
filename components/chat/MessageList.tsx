"use client";

import type { UIMessage } from "ai";
import { isTextUIPart, isToolUIPart } from "ai";
import { motion } from "framer-motion";
import { Bot, User, MessageSquare } from "lucide-react";
import ToolPart from "./ToolPart";
import { MessageSkeleton } from "./MessageSkeleton";
import MarkdownRenderer from "./MarkdownRenderer";

const EXAMPLE_PROMPTS = [
  "Score a lead for Sarah from InnoTech with a $60,000 budget",
  "Evaluate a lead from Acme Corp with a $15,000 budget",
  "Score John from StartupXYZ with a $5,000 budget",
];

function UserMessage({ message }: { message: UIMessage }) {
  const textParts = message.parts.filter(isTextUIPart);
  const content = textParts.map((p) => p.text).join("");

  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3 justify-end"
    >
      <div className="max-w-[80%]">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
          <p className="text-sm text-primary-foreground whitespace-pre-wrap leading-relaxed">
            {content}
          </p>
        </div>
      </div>
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 mt-1 shadow-md">
        <User className="w-4 h-4 text-white" aria-hidden="true" />
      </div>
    </motion.div>
  );
}

function AssistantMessage({ message }: { message: UIMessage }) {
  const hasContent = message.parts.some(
    (part) => (isTextUIPart(part) && part.text) || isToolUIPart(part),
  );

  if (!hasContent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3"
    >
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 mt-1 border border-border/50 shadow-sm">
        <Bot className="w-4 h-4 text-primary" aria-hidden="true" />
      </div>
      <div className="space-y-3 flex-1 min-w-0">
        {message.parts.map((part, index) => {
          if (isTextUIPart(part)) {
            if (!part.text) return null;
            return (
              <div key={index} className="max-w-[90%]">
                <div className="rounded-2xl rounded-bl-sm bg-card border border-border/50 px-4 py-3 shadow-sm">
                  <div className="text-sm text-foreground leading-relaxed prose prose-invert max-w-none">
                    <MarkdownRenderer text={part.text} />
                  </div>
                </div>
              </div>
            );
          }

          if (isToolUIPart(part)) {
            return (
              <div key={part.toolCallId} className="max-w-[90%]">
                <ToolPart part={part} />
              </div>
            );
          }

          return null;
        })}
      </div>
    </motion.div>
  );
}

function EmptyState({
  onExamplePrompt,
}: {
  onExamplePrompt: (prompt: string) => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center max-w-lg space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg shadow-primary/10"
        >
          <Bot className="w-10 h-10 text-primary" aria-hidden="true" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Start a conversation
          </h2>
          <p className="text-muted-foreground">
            Try one of these example prompts to score a lead:
          </p>
        </div>

        <div
          className="space-y-3"
          role="group"
          aria-label="Example prompts"
        >
          {EXAMPLE_PROMPTS.map((prompt, index) => (
            <motion.div
              key={prompt}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <button
                onClick={() => onExamplePrompt(prompt)}
                className="w-full text-left px-5 py-3.5 rounded-xl glass text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-card-hover transition-all duration-200 flex items-center gap-3 group"
              >
                <MessageSquare className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors shrink-0" aria-hidden="true" />
                <span>{prompt}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NoResultsState() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 mt-1 border border-border/50">
        <Bot className="w-4 h-4 text-primary" aria-hidden="true" />
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-card border border-border/50 px-4 py-3">
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
    <div
      className="flex-1 space-y-5 overflow-y-auto px-4 py-5 scroll-smooth"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      tabIndex={0}
    >
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
        <div className="space-y-5">
          <MessageSkeleton />
          <div className="flex items-center gap-3" aria-hidden="true">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20" />
            <div className="flex items-center gap-1.5 bg-card border border-border/50 rounded-full px-4 py-2.5">
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-dot-1" />
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-dot-2" />
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-dot-3" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
