import { test, expect } from "@playwright/test";

test.describe("Chat flow", () => {
  test("sends a message and displays the assistant response", async ({ page }) => {
    await page.goto("/chat");

    await expect(page.getByText("Start a conversation")).toBeVisible();

    const examplePrompts = page.getByText(
      "Score a lead for Sarah from InnoTech with a $60,000 budget",
    );
    await expect(examplePrompts).toBeVisible();

    const mockBody =
      'data: {"type":"start"}\n\n' +
      'data: {"type":"text-start","id":"mock-1"}\n\n' +
      'data: {"type":"text-delta","id":"mock-1","delta":"I can help you score that lead! "}\n\n' +
      'data: {"type":"text-delta","id":"mock-1","delta":"Here is the analysis."}\n\n' +
      'data: {"type":"text-end","id":"mock-1"}\n\n' +
      "data: [DONE]\n\n";

    await page.route("**/api/chat", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body: mockBody,
      });
    });

    await examplePrompts.click();

    await expect(
      page.getByText("I can help you score that lead!"),
    ).toBeVisible({ timeout: 15000 });

    await expect(
      page.getByText("Here is the analysis."),
    ).toBeVisible();
  });
});
