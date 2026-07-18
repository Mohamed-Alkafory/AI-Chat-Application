import { tool } from "ai";
import { z } from "zod";

const scoreLeadInputSchema = z.object({
  name: z.string().describe("The lead name"),
  company: z.string().describe("The company name"),
  budget: z.number().positive().describe("The budget in USD"),
});

export type ScoreLeadInput = z.infer<typeof scoreLeadInputSchema>;

export type ScoreLeadOutput = {
  name: string;
  company: string;
  score: number;
  recommendation: string;
};

export const scoreLeadTool = tool({
  description:
    "Score a sales lead based on their name, company, and budget. Returns a score from 0-100 and a recommendation.",
  inputSchema: scoreLeadInputSchema,
  execute: async ({
    name,
    company,
    budget,
  }: ScoreLeadInput): Promise<ScoreLeadOutput> => {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    let score: number;
    if (budget >= 50000) {
      score = 85 + Math.floor(Math.random() * 16);
    } else if (budget >= 20000) {
      score = 65 + Math.floor(Math.random() * 21);
    } else if (budget >= 10000) {
      score = 45 + Math.floor(Math.random() * 21);
    } else {
      score = 20 + Math.floor(Math.random() * 26);
    }

    const recommendation =
      score >= 80
        ? "High priority lead. Contact immediately."
        : score >= 60
          ? "Medium priority lead. Follow up within 24 hours."
          : "Low priority lead. Nurture with automated sequences.";

    return { name, company, score, recommendation };
  },
});
