"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  }, [code]);

  const lang = language || "text";

  return (
    <div className="group relative my-3 rounded-xl bg-[#0a0a1a] border border-border/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0f0f2a] border-b border-border/30">
        <span className="text-xs text-muted-foreground font-mono">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-success" aria-hidden="true" />
              <span className="text-success">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre>
        <code className={`language-${lang}`}>{code}</code>
      </pre>
    </div>
  );
}

function parseMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      nodes.push(
        <CodeBlock key={nodes.length} language={language} code={codeLines.join("\n")} />,
      );
      continue;
    }

    // Inline formatting within regular text
    const processed = processInlineMarkdown(line);
    if (processed !== null) {
      nodes.push(
        <p key={nodes.length} className="mb-2 last:mb-0 leading-relaxed">
          {processed}
        </p>,
      );
    }
    i++;
  }

  return nodes;
}

function processInlineMarkdown(line: string): React.ReactNode[] | null {
  if (!line.trim()) return null;

  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  while (remaining.length > 0) {
    // Bold **text**
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    if (boldMatch) {
      parts.push(
        <strong key={key++} className="font-semibold text-foreground">
          {boldMatch[1]}
        </strong>,
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Inline code `text`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code key={key++}>{codeMatch[1]}</code>,
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Regular text until next special char
    const nextSpecial = remaining.search(/(\*\*|`)/);
    if (nextSpecial === 0) continue;
    if (nextSpecial === -1) {
      parts.push(remaining);
      break;
    }
    parts.push(remaining.slice(0, nextSpecial));
    remaining = remaining.slice(nextSpecial);
  }

  return parts.length > 0 ? parts : null;
}

export default function MarkdownRenderer({ text }: { text: string }) {
  const nodes = parseMarkdown(text);

  if (nodes.length === 0) return null;

  return <div className="space-y-1">{nodes}</div>;
}
