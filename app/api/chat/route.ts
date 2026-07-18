import { streamText, isStepCount, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";
import { scoreLeadTool } from "@/tools/scoreLead";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: "Invalid request: messages array is required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(
        JSON.stringify({
          error:
            "GOOGLE_GENERATIVE_AI_API_KEY is not configured. Set it in your environment variables.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system:
        "You are an AI assistant with access to a lead scoring tool. " +
        "When the user provides lead information (name, company, and budget), " +
        "call the scoreLead tool to evaluate the lead. " +
        "Present the results clearly to the user.",
      tools: {
        scoreLead: scoreLeadTool,
      },
      stopWhen: isStepCount(5),
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
