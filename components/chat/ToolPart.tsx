"use client";

import type { ToolUIPart, DynamicToolUIPart } from "ai";
import { getToolName } from "ai";
import LeadScoreCard from "./LeadScoreCard";
import ToolError from "./ToolError";

type ToolPartData = ToolUIPart | DynamicToolUIPart;

export default function ToolPart({ part }: { part: ToolPartData }) {
  const toolName = getToolName(part);
  const displayName = toolName === "scoreLead" ? "Lead Analysis" : toolName;

  if (part.state === "input-streaming") {
    return (
      <div className="rounded-xl border border-border bg-card p-4 space-y-3 w-full">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-sm font-medium text-foreground">
            Preparing {displayName}...
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
        </div>
      </div>
    );
  }

  if (part.state === "input-available") {
    const input = part.input as Record<string, unknown> | undefined;
    if (!input) return null;

    return (
      <div className="rounded-xl border border-border bg-card p-4 space-y-3 w-full">
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span className="text-sm font-medium text-foreground">
            Lead Information
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Name</p>
            <p className="font-medium text-foreground">
              {String(input.name ?? "-")}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Company</p>
            <p className="font-medium text-foreground">
              {String(input.company ?? "-")}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Budget</p>
            <p className="font-medium text-foreground">
              ${Number(input.budget).toLocaleString() ?? "-"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Scoring lead...
        </div>
      </div>
    );
  }

  if (part.state === "output-available") {
    const output = part.output as Record<string, unknown> | undefined;
    if (!output) return null;

    return (
      <LeadScoreCard
        result={
          output as {
            name: string;
            company: string;
            score: number;
            recommendation: string;
          }
        }
      />
    );
  }

  if (part.state === "output-error") {
    return (
      <ToolError errorText={part.errorText ?? "An unknown error occurred."} />
    );
  }

  return null;
}
