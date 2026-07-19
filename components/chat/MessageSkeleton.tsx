"use client";

export function MessageSkeleton() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-card border border-border px-4 py-3 space-y-2.5">
        <div className="h-3.5 w-48 rounded-full bg-muted animate-pulse" />
        <div className="h-3.5 w-36 rounded-full bg-muted animate-pulse" />
      </div>
    </div>
  );
}
