"use client";

import type { ToolUIPart, DynamicToolUIPart } from "ai";
import { getToolName } from "ai";
import { Loader2, FileText } from "lucide-react";
import LeadScoreCard from "./LeadScoreCard";
import ToolError from "./ToolError";

type ToolPartData = ToolUIPart | DynamicToolUIPart;

export default function ToolPart({ part }: { part: ToolPartData }) {
  const toolName = getToolName(part);
  const displayName = toolName === "scoreLead" ? "Lead Analysis" : toolName;

  if (part.state === "input-streaming") {
    return (
      <div
        className="rounded-xl glass p-5 space-y-4 w-full"
        role="status"
        aria-label={`Preparing ${displayName}`}
      >
        <div className="flex items-center gap-2.5">
          <Loader2 className="w-5 h-5 text-primary animate-spin" aria-hidden="true" />
          <span className="text-sm font-medium text-foreground">
            Preparing {displayName}...
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden" aria-hidden="true">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
        </div>
      </div>
    );
  }

  if (part.state === "input-available") {
    const input = part.input as Record<string, unknown> | undefined;
    if (!input) return null;

    return (
      <div
        className="rounded-xl glass p-5 space-y-4 w-full"
        role="status"
        aria-label="Lead information being processed"
      >
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold text-foreground">
            Lead Information
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="rounded-lg bg-card p-3">
            <p className="text-xs text-muted-foreground mb-0.5">Name</p>
            <p className="font-medium text-foreground">
              {String(input.name ?? "-")}
            </p>
          </div>
          <div className="rounded-lg bg-card p-3">
            <p className="text-xs text-muted-foreground mb-0.5">Company</p>
            <p className="font-medium text-foreground">
              {String(input.company ?? "-")}
            </p>
          </div>
          <div className="rounded-lg bg-card p-3">
            <p className="text-xs text-muted-foreground mb-0.5">Budget</p>
            <p className="font-medium text-foreground">
              ${Number(input.budget).toLocaleString() ?? "-"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground" aria-hidden="true">
          <Loader2 className="w-3 h-3 text-accent animate-spin" />
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
