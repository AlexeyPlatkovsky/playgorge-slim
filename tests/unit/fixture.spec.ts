import type { Page } from "@playwright/test";

import { test, expect } from "../../framework/fixtures/app.fixture";
import { assertTextEquals, assertVisible } from "../../assertions";
import { xPage } from "../../framework/core/xPage";

const html = `<!doctype html>
<html>
  <body>
    <main>
      <h1 id="title">Mounted page</h1>
      <p id="msg">served from the worker-scoped fixture</p>
    </main>
  </body>
</html>`;

class MountedHtmlPage extends xPage {
  readonly msg = this.$("#msg");
  readonly path: string;
  readonly title = this.$("#title");

  constructor(page: Page, url: string) {
    super(page);
    this.path = url;
  }

  async isOpened(): Promise<void> {
    await assertVisible(this.title);
  }
}

class MountedButtonPage extends xPage {
  readonly btn = this.$("#btn");
  readonly path: string;

  constructor(page: Page, url: string) {
    super(page);
    this.path = url;
  }

  async isOpened(): Promise<void> {
    await assertVisible(this.btn);
  }
}

test("worker-scoped fixture server serves mounted HTML @ui", async ({ page, mountHtml }) => {
  const url = await mountHtml(html, "/mounted");
  const mountedPage = new MountedHtmlPage(page, url);
  await mountedPage.open();

  await assertVisible(mountedPage.title);
  await assertTextEquals(mountedPage.title, "Mounted page");
  await assertTextEquals(mountedPage.msg, "served from the worker-scoped fixture");
});

test("logger fixture resets history between tests @ui", async ({ logger, mountHtml, page }) => {
  const url = await mountHtml("<button id='btn'>Hi</button>", "/btn");
  const mountedPage = new MountedButtonPage(page, url);
  await mountedPage.open();

  await mountedPage.btn.click();

  expect(logger.history()).toEqual(["Click on btn (#btn)"]);
});
