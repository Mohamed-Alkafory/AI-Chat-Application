"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            AI Conversations That{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-purple-300 bg-clip-text text-transparent">
              Feel Human
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            Experience real-time AI conversations powered by modern language models with streaming responses and intelligent tools.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              Start Chat
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-all duration-300"
            >
              View Source
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="rounded-2xl border border-border bg-card backdrop-blur-sm p-4 shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-muted-foreground">AI Chat</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-primary/20 rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
                  <p className="text-sm text-foreground">What can you help me with?</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-card-hover rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[80%]">
                  <p className="text-sm text-foreground">
                    I can help you with coding, writing, analysis, and more. What would you like to explore today?
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span>AI is typing</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
