"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Plus, PanelLeftClose, PanelLeft, History } from "lucide-react";

interface ChatEntry {
  id: string;
  title: string;
  timestamp: Date;
}

const sampleHistory: ChatEntry[] = [
  { id: "1", title: "Score a lead for Sarah from InnoTech", timestamp: new Date() },
  { id: "2", title: "Evaluate a lead from Acme Corp", timestamp: new Date(Date.now() - 3600000) },
  { id: "3", title: "Score John from StartupXYZ", timestamp: new Date(Date.now() - 7200000) },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 56 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col border-r border-border bg-sidebar shrink-0 overflow-hidden"
      aria-label="Chat history"
    >
      <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2"
          >
            <History className="w-3.5 h-3.5" aria-hidden="true" />
            History
          </motion.span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-hover transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="w-4 h-4" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 overflow-y-auto p-3 space-y-1"
        >
          <button
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-hover border border-dashed border-border hover:border-primary/30 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            aria-label="New chat"
          >
            <Plus className="w-4 h-4 text-primary" aria-hidden="true" />
            <span>New chat</span>
          </button>

          <div className="pt-3 space-y-0.5">
            {sampleHistory.map((entry) => (
              <button
                key={entry.id}
                className="w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-hover transition-all duration-200 text-left focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span className="line-clamp-2 leading-snug">{entry.title}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {collapsed && (
        <div className="flex flex-col items-center gap-3 py-4 px-3">
          <button
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-sidebar-hover transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            aria-label="New chat"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </button>
          <div className="flex flex-col gap-2">
            {sampleHistory.map((entry) => (
              <button
                key={entry.id}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-sidebar-hover transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                aria-label={entry.title}
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.aside>
  );
}
