"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function ChatPreview() {
  return (
    <section className="py-24 relative" aria-labelledby="chat-preview-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-background to-primary/3 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4"
            aria-hidden="true"
          >
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h2
            id="chat-preview-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            See It in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            A glimpse of the conversational experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl glass shadow-2xl shadow-primary/10 overflow-hidden"
        >
          <div
            className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-card/30"
            aria-hidden="true"
          >
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-muted-foreground font-medium">
              FlowChat AI · Online
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-5 min-h-[340px] flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex justify-end"
            >
              <div className="bg-gradient-to-r from-primary to-accent rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%] sm:max-w-[70%] shadow-sm">
                <p className="text-sm text-primary-foreground">
                  How can I build an AI chatbot?
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex justify-start"
            >
              <div className="bg-card-hover rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%] sm:max-w-[70%] border border-border/50">
                <p className="text-sm text-foreground leading-relaxed">
                  Let&apos;s build it together using Next.js and Claude. Start by
                  creating a new Next.js project, then integrate the AI SDK for
                  streaming responses. I&apos;ll guide you through the architecture,
                  from API routes to the chat UI components.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 1.0 }}
              className="flex justify-start items-center gap-2 pl-1"
              aria-hidden="true"
            >
              <div className="flex items-center gap-1.5 bg-card-hover rounded-full px-3 py-2 border border-border/30">
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-dot-1" />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-dot-2" />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-dot-3" />
              </div>
              <span className="text-xs text-muted-foreground">
                AI is thinking...
              </span>
            </motion.div>
          </div>

          <div className="px-5 py-3.5 border-t border-border bg-card/20" aria-hidden="true">
            <div className="flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm text-muted-foreground">
              <span>Type your message...</span>
              <div className="ml-auto w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                  aria-hidden="true"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
