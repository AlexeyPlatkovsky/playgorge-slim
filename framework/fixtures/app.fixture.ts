import { type RouteHandler, htmlResponse } from "./fixture-server";
import { test as base, type BaseTestFixtures } from "./base.fixture";

export interface MountHtmlFixture {
  mountHtml: (html: string, path?: string) => Promise<string>;
}

export type TestFixtures = BaseTestFixtures & MountHtmlFixture;

export const test = base.extend<MountHtmlFixture>({
  mountHtml: async ({ fixtureServer }, use) => {
    const routes: Record<string, RouteHandler> = {};
    const mount = (html: string, path = "/"): Promise<string> => {
      routes[path] = htmlResponse(html);
      fixtureServer.setRoutes(routes);
      return Promise.resolve(`${fixtureServer.baseURL}${path}`);
    };
    await use(mount);
    fixtureServer.setRoutes({});
  }
});

export { expect } from "@playwright/test";
