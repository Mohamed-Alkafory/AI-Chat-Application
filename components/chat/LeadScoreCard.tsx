"use client";

import type { ScoreLeadOutput } from "@/tools/scoreLead";

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-amber-400";
  return "text-red-400";
}

function getScoreBarColor(score: number): string {
  if (score >= 80) return "bg-gradient-to-r from-emerald-500 to-emerald-400";
  if (score >= 60) return "bg-gradient-to-r from-amber-500 to-amber-400";
  return "bg-gradient-to-r from-red-500 to-red-400";
}

function getPriorityLabel(score: number): string {
  if (score >= 80) return "High Priority";
  if (score >= 60) return "Medium Priority";
  return "Low Priority";
}

function getPriorityBadgeColor(score: number): string {
  if (score >= 80) return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  if (score >= 60) return "bg-amber-500/15 text-amber-400 border-amber-500/30";
  return "bg-red-500/15 text-red-400 border-red-500/30";
}

export default function LeadScoreCard({ result }: { result: ScoreLeadOutput }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Lead Score</h3>
        <span
          className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${getPriorityBadgeColor(result.score)}`}
        >
          {getPriorityLabel(result.score)}
        </span>
      </div>

      <div className="flex items-end gap-3">
        <span className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
          {result.score}
        </span>
        <span className="text-sm text-muted-foreground mb-1">/ 100</span>
      </div>

      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getScoreBarColor(result.score)}`}
          style={{ width: `${result.score}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div>
          <p className="text-xs text-muted-foreground">Name</p>
          <p className="text-sm font-medium text-foreground">{result.name}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Company</p>
          <p className="text-sm font-medium text-foreground">{result.company}</p>
        </div>
      </div>

      <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
        <p className="text-xs text-muted-foreground mb-0.5">Recommendation</p>
        <p className="text-sm text-foreground">{result.recommendation}</p>
      </div>
    </div>
  );
}
