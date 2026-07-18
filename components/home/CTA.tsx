"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Ready to build with{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI
          </span>
          ?
        </h2>
        <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
          Start building your AI-powered application today with FlowChat AI.
        </p>
        <div className="mt-8">
          <a
            href="#"
            className="inline-flex px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            Start Chat
          </a>
        </div>
      </motion.div>
    </section>
  );
}
