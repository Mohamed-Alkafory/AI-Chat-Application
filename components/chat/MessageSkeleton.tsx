"use client";

import { Bot } from "lucide-react";

export function MessageSkeleton() {
  return (
    <div className="flex items-start gap-3" aria-hidden="true">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
        <Bot className="w-4 h-4 text-primary/60" />
      </div>
      <div className="flex-1 space-y-2.5">
        <div className="h-4 w-3/4 rounded-lg bg-[rgba(255,255,255,0.04)] animate-pulse" />
        <div className="h-4 w-1/2 rounded-lg bg-[rgba(255,255,255,0.04)] animate-pulse" />
      </div>
    </div>
  );
}
