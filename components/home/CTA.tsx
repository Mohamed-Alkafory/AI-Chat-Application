"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-primary/15 to-primary/8 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mx-auto mb-6"
          aria-hidden="true"
        >
          <Sparkles className="w-7 h-7 text-primary" />
        </div>
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
        >
          Ready to build with{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI
          </span>
          ?
        </h2>
        <p className="mt-4 text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto">
          Start building your AI-powered application today with FlowChat AI.
        </p>
        <div className="mt-8">
          <a
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-lg hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Start Chat
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
