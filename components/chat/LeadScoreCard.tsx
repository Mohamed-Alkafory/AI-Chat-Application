"use client";

import type { ScoreLeadOutput } from "@/tools/scoreLead";
import { motion } from "framer-motion";

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
  if (score >= 80)
    return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  if (score >= 60)
    return "bg-amber-500/15 text-amber-400 border-amber-500/30";
  return "bg-red-500/15 text-red-400 border-red-500/30";
}

export default function LeadScoreCard({
  result,
}: {
  result: ScoreLeadOutput;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-xl glass p-5 space-y-4 w-full"
      role="region"
      aria-label="Lead score result"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Lead Score</h3>
        <span
          className={`text-xs px-3 py-0.5 rounded-full border font-medium ${getPriorityBadgeColor(result.score)}`}
        >
          {getPriorityLabel(result.score)}
        </span>
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
        className="flex items-end gap-3"
      >
        <span
          className={`text-5xl font-bold ${getScoreColor(result.score)}`}
          aria-label={`Score ${result.score} out of 100`}
        >
          {result.score}
        </span>
        <span className="text-sm text-muted-foreground mb-1.5" aria-hidden="true">
          / 100
        </span>
      </motion.div>

      <div
        className="h-2.5 rounded-full bg-muted overflow-hidden"
        role="meter"
        aria-valuenow={result.score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Lead score: ${result.score}%`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${result.score}%` }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className={`h-full rounded-full ${getScoreBarColor(result.score)}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="rounded-lg bg-card p-3">
          <p className="text-xs text-muted-foreground mb-0.5">Name</p>
          <p className="text-sm font-medium text-foreground">
            {result.name}
          </p>
        </div>
        <div className="rounded-lg bg-card p-3">
          <p className="text-xs text-muted-foreground mb-0.5">Company</p>
          <p className="text-sm font-medium text-foreground">
            {result.company}
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-primary/5 border border-primary/10 p-3.5">
        <p className="text-xs text-muted-foreground mb-1">Recommendation</p>
        <p className="text-sm text-foreground leading-relaxed">
          {result.recommendation}
        </p>
      </div>
    </motion.div>
  );
}
