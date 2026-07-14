import { expect, test } from "@playwright/test";

import {
  assertAttributeEquals,
  assertCount,
  assertEnabled,
  assertHidden,
  assertTextContains,
  assertTextEquals,
  assertVisible,
  currentMode,
  softGroup
} from "../../assertions";
import { xPage } from "../../framework/core/xPage";

const fixturePage = `<!doctype html>
<html>
  <body>
    <h1 id="title" data-kind="heading">Dashboard</h1>
    <p id="status">signed-in</p>
    <button id="primary" type="button">Go</button>
    <ul id="list">
      <li>one</li>
      <li>two</li>
      <li>three</li>
    </ul>
    <div id="hidden" style="display:none">secret</div>
  </body>
</html>`;

class AssertionFixturePage extends xPage {
  readonly hidden = this.$("#hidden");
  readonly items = this.$("#list li");
  readonly path = "about:blank";
  readonly primary = this.$("#primary");
  readonly status = this.$("#status");
  readonly title = this.$("#title");

  async isOpened(): Promise<void> {
    await assertVisible(this.title);
  }
}

test("assertion helpers resolve against the live DOM in hard mode @ui", async ({ page }) => {
  await page.setContent(fixturePage);
  const fixture = new AssertionFixturePage(page);

  await assertVisible(fixture.title);
  await assertTextEquals(fixture.title, "Dashboard");
  await assertTextContains(fixture.status, "signed");
  await assertAttributeEquals(fixture.title, "data-kind", "heading");
  await assertEnabled(fixture.primary);
  await assertCount(fixture.items, 3);
  await assertHidden(fixture.hidden);
});

test("hard assertion failure throws immediately @ui", async ({ page }) => {
  await page.setContent(fixturePage);
  const fixture = new AssertionFixturePage(page);

  await expect(async () => {
    await assertTextEquals(fixture.title, "Not Dashboard", {
      message: "hard failure",
      timeout: 200
    });
  }).rejects.toThrow();
});

test("softGroup keeps executing after a failing assertion @ui", async ({ page }) => {
  test.fail();
  await page.setContent(fixturePage);
  const fixture = new AssertionFixturePage(page);

  let executed = 0;
  const runOnce = async (fn: () => Promise<void>): Promise<void> => {
    await fn();
    executed += 1;
  };

  await softGroup("dashboard checks", async () => {
    await runOnce(() =>
      assertTextEquals(fixture.title, "Not Dashboard", {
        message: "soft-fail-1",
        timeout: 200
      })
    );
    await runOnce(() =>
      assertTextContains(fixture.status, "signed", {
        message: "soft-pass"
      })
    );
    await runOnce(() =>
      assertTextEquals(fixture.status, "pending", {
        message: "soft-fail-2",
        timeout: 200
      })
    );
  });

  expect(executed).toBe(3);
});

test("softGroup body receives soft mode and restores hard mode afterwards @ui", async ({
  page
}) => {
  await page.setContent(fixturePage);
  const fixture = new AssertionFixturePage(page);

  expect(currentMode()).toBe("hard");

  await softGroup("scoped group", async () => {
    expect(currentMode()).toBe("soft");
    await assertVisible(fixture.title);
  });

  expect(currentMode()).toBe("hard");
});
