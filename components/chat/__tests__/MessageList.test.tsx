import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MessageList from "../MessageList";

vi.mock("../ToolPart", () => ({
  default: ({ part }: { part: { state: string } }) => (
    <div data-testid="tool-part">Tool part state: {part.state}</div>
  ),
}));

function makeUserMessage(id: string, text: string) {
  return {
    id,
    role: "user" as const,
    parts: [{ type: "text" as const, text }],
  };
}

function makeAssistantMessage(id: string, text: string) {
  return {
    id,
    role: "assistant" as const,
    parts: [{ type: "text" as const, text }],
  };
}

describe("MessageList", () => {
  const defaultProps = {
    messages: [],
    isLoading: false,
    retrying: false,
    onExamplePrompt: vi.fn(),
  };

  it("shows empty state with example prompts when no messages", () => {
    render(<MessageList {...defaultProps} />);

    expect(screen.getByText("Start a conversation")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Score a lead for Sarah from InnoTech with a $60,000 budget",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Evaluate a lead from Acme Corp with a $15,000 budget"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Score John from StartupXYZ with a $5,000 budget"),
    ).toBeInTheDocument();
  });

  it("renders a user message", () => {
    const messages = [makeUserMessage("1", "Hello, can you score a lead?")];
    render(<MessageList {...defaultProps} messages={messages} />);

    expect(
      screen.getByText("Hello, can you score a lead?"),
    ).toBeInTheDocument();
  });

  it("renders an assistant message", () => {
    const messages = [makeAssistantMessage("2", "Sure! Please provide the details.")];
    render(<MessageList {...defaultProps} messages={messages} />);

    expect(
      screen.getByText("Sure! Please provide the details."),
    ).toBeInTheDocument();
  });

  it("renders both user and assistant messages in order", () => {
    const messages = [
      makeUserMessage("1", "Hi there"),
      makeAssistantMessage("2", "Hello! How can I help?"),
    ];
    render(<MessageList {...defaultProps} messages={messages} />);

    expect(screen.getByText("Hi there")).toBeInTheDocument();
    expect(screen.getByText("Hello! How can I help?")).toBeInTheDocument();
  });

  it("shows loading skeleton and typing dots when isLoading", () => {
    const messages = [makeUserMessage("1", "Score a lead")];
    render(<MessageList {...defaultProps} messages={messages} isLoading={true} />);

    const typingDots = screen.getAllByRole("generic");
    const hasDot = typingDots.some(
      (el) => el.className.includes("animate-dot-1") || el.className.includes("animate-pulse"),
    );
    expect(hasDot).toBe(true);
  });
});
