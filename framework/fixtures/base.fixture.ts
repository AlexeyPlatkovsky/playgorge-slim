import { test as base } from "@playwright/test";

import { xLogger } from "../core/xLogger";
import { type FixtureServerHandle, startFixtureServer } from "./fixture-server";

export interface BaseWorkerFixtures {
  fixtureServer: FixtureServerHandle;
}

export interface BaseTestFixtures {
  logger: typeof xLogger;
}

export const test = base.extend<BaseTestFixtures, BaseWorkerFixtures>({
  fixtureServer: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      const server = await startFixtureServer();
      await use(server);
      await server.close();
    },
    { scope: "worker" }
  ],
  // eslint-disable-next-line no-empty-pattern
  logger: async ({}, use) => {
    xLogger.resetForTesting();
    await use(xLogger);
    xLogger.resetForTesting();
  }
});

export { expect } from "@playwright/test";
