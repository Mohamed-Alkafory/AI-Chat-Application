"use client";

import { motion } from "framer-motion";
import { Zap, Layers, Palette, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Streaming Responses",
    description:
      "Real-time token-by-token streaming delivers responses as they're generated, just like a natural conversation.",
    gradient: "from-primary/20 to-accent/20",
    iconColor: "text-primary",
  },
  {
    icon: Layers,
    title: "AI Tool Calling",
    description:
      "Seamlessly invoke tools and functions during conversations for code execution, data lookup, and more.",
    gradient: "from-accent/20 to-purple-500/20",
    iconColor: "text-accent",
  },
  {
    icon: Palette,
    title: "Modern UI",
    description:
      "Clean, responsive interface built with Tailwind CSS and Framer Motion for a premium user experience.",
    gradient: "from-primary/20 to-purple-500/20",
    iconColor: "text-primary",
  },
  {
    icon: Shield,
    title: "Secure Server API",
    description:
      "All API calls are proxied through your server, keeping your keys secure and your data private.",
    gradient: "from-accent/20 to-primary/20",
    iconColor: "text-accent",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 relative"
      aria-labelledby="features-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            Built for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Modern AI
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Everything you need to build powerful AI-powered applications with a focus on developer experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="group relative rounded-2xl glass p-6 hover:bg-card-hover hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  aria-hidden="true"
                >
                  <Icon className={`w-5 h-5 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
