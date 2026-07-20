import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ToolPart from "../ToolPart";

vi.mock("ai", () => ({
  getToolName: vi.fn((part: { toolName?: string }) => part.toolName ?? "scoreLead"),
}));

function makeToolPart(overrides: Record<string, unknown>) {
  return {
    type: "tool",
    toolCallId: "call-1",
    toolName: "scoreLead",
    ...overrides,
  } as unknown as Parameters<typeof ToolPart>[0]["part"];
}

describe("ToolPart", () => {
  it("renders input-streaming state", () => {
    const part = makeToolPart({ state: "input-streaming" });
    render(<ToolPart part={part} />);

    expect(screen.getByText("Preparing Lead Analysis...")).toBeInTheDocument();
  });

  it("renders input-available state with lead info", () => {
    const part = makeToolPart({
      state: "input-available",
      input: { name: "Alice", company: "Alpha Inc", budget: 50000 },
    });
    render(<ToolPart part={part} />);

    expect(screen.getByText("Lead Information")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Alpha Inc")).toBeInTheDocument();
    expect(screen.getByText("$50,000")).toBeInTheDocument();
  });

  it("renders output-available state as LeadScoreCard", () => {
    const part = makeToolPart({
      state: "output-available",
      output: {
        name: "Bob",
        company: "Beta Corp",
        score: 85,
        recommendation: "High priority lead. Contact immediately.",
      },
    });
    render(<ToolPart part={part} />);

    expect(screen.getByText("Lead Score")).toBeInTheDocument();
    expect(screen.getByText("High Priority")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Beta Corp")).toBeInTheDocument();
  });

  it("renders output-error state", () => {
    const part = makeToolPart({
      state: "output-error",
      errorText: "The scoring service is unavailable.",
    });
    render(<ToolPart part={part} />);

    expect(screen.getByText("Tool Error")).toBeInTheDocument();
    expect(
      screen.getByText("The scoring service is unavailable."),
    ).toBeInTheDocument();
  });

  it("renders default error text when errorText is missing", () => {
    const part = makeToolPart({
      state: "output-error",
      errorText: undefined,
    });
    render(<ToolPart part={part} />);

    expect(
      screen.getByText("An unknown error occurred."),
    ).toBeInTheDocument();
  });
});
