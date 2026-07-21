"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ToolError({ errorText }: { errorText: string }) {
  return (
    <div
      className="rounded-xl border border-error/20 bg-error/5 p-4 space-y-3 shadow-sm"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-4.5 h-4.5 text-error" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-sm font-semibold text-error">Tool Error</p>
          <p className="text-sm text-error/80 mt-0.5">{errorText}</p>
          <p className="text-xs text-error/60 mt-1.5 flex items-center gap-1">
            <RefreshCw className="w-3 h-3" aria-hidden="true" />
            You can try again or rephrase your request.
          </p>
        </div>
      </div>
    </div>
  );
}
