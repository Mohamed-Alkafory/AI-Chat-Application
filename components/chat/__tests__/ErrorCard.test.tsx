import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ErrorCard } from "../ErrorCard";

describe("ErrorCard", () => {
  it("renders network error", () => {
    render(
      <ErrorCard
        errorType="network"
        hasPartialAssistant={false}
        onRetry={vi.fn()}
        retrying={false}
      />,
    );

    expect(screen.getByText("Network error")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Unable to reach the AI service. Please check your internet connection.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Try again")).toBeInTheDocument();
  });

  it("renders rate-limit error", () => {
    render(
      <ErrorCard
        errorType="rate-limit"
        hasPartialAssistant={false}
        onRetry={vi.fn()}
        retrying={false}
      />,
    );

    expect(screen.getByText("Rate limit exceeded")).toBeInTheDocument();
  });

  it("renders tool error", () => {
    render(
      <ErrorCard
        errorType="tool"
        hasPartialAssistant={false}
        onRetry={vi.fn()}
        retrying={false}
      />,
    );

    expect(screen.getByText("Tool error")).toBeInTheDocument();
  });

  it("renders mid-stream error when hasPartialAssistant is true", () => {
    render(
      <ErrorCard
        errorType="api"
        hasPartialAssistant={true}
        onRetry={vi.fn()}
        retrying={false}
      />,
    );

    expect(
      screen.getByText("Connection lost"),
    ).toBeInTheDocument();
  });

  it("calls onRetry when button is clicked", async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();

    render(
      <ErrorCard
        errorType="api"
        hasPartialAssistant={false}
        onRetry={onRetry}
        retrying={false}
      />,
    );

    await user.click(screen.getByText("Try again"));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("disables retry button when retrying is true", () => {
    render(
      <ErrorCard
        errorType="api"
        hasPartialAssistant={false}
        onRetry={vi.fn()}
        retrying={true}
      />,
    );

    expect(screen.getByText("Retrying...")).toBeDisabled();
  });
});
