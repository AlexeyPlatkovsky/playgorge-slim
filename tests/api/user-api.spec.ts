import { expect, test } from "@playwright/test";

import { buildUser, createUser, deleteUser } from "../../framework/factories/user.factory";

test("user factory builds deterministic data when seeded @api", () => {
  const first = buildUser({ seed: 42 });
  const second = buildUser({ seed: 42 });

  expect(first.email).toBe(second.email);
  expect(first.name).toBe(second.name);
  expect(first.firstName).toBe(second.firstName);
  expect(first.lastName).toBe(second.lastName);
  expect(first.city).toBe(second.city);
  expect(first.country).toBe("United States");
});

test("user can be created and deleted via the API @api", async () => {
  const user = await createUser();

  expect(user.email).toMatch(/@example\.com$/);
  expect(user.name).toBeTruthy();

  await deleteUser(user.email, user.password);
});
