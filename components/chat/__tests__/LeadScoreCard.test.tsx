import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LeadScoreCard from "../LeadScoreCard";

describe("LeadScoreCard", () => {
  it("renders high priority score", () => {
    render(
      <LeadScoreCard
        result={{
          name: "Jane Doe",
          company: "TechCorp",
          score: 92,
          recommendation: "High priority lead. Contact immediately.",
        }}
      />,
    );

    expect(screen.getByText("Lead Score")).toBeInTheDocument();
    expect(screen.getByText("High Priority")).toBeInTheDocument();
    expect(screen.getByText("92")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("TechCorp")).toBeInTheDocument();
    expect(
      screen.getByText("High priority lead. Contact immediately."),
    ).toBeInTheDocument();
  });

  it("renders medium priority score", () => {
    render(
      <LeadScoreCard
        result={{
          name: "John Smith",
          company: "MidCorp",
          score: 65,
          recommendation: "Medium priority lead. Follow up within 24 hours.",
        }}
      />,
    );

    expect(screen.getByText("Medium Priority")).toBeInTheDocument();
    expect(screen.getByText("65")).toBeInTheDocument();
  });

  it("renders low priority score", () => {
    render(
      <LeadScoreCard
        result={{
          name: "Bob Low",
          company: "SmallBiz",
          score: 30,
          recommendation: "Low priority lead. Nurture with automated sequences.",
        }}
      />,
    );

    expect(screen.getByText("Low Priority")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });
});
