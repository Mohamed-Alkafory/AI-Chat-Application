import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ToolError from "../ToolError";

describe("ToolError", () => {
  it("renders error text", () => {
    render(<ToolError errorText="Something went wrong with the tool." />);

    expect(screen.getByText("Tool Error")).toBeInTheDocument();
    expect(
      screen.getByText("Something went wrong with the tool."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("You can try again or rephrase your request."),
    ).toBeInTheDocument();
  });

  it("renders a different error message", () => {
    render(<ToolError errorText="Budget must be a positive number." />);

    expect(
      screen.getByText("Budget must be a positive number."),
    ).toBeInTheDocument();
  });
});
