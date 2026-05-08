import { expect } from "@playwright/test";

import { xPage } from "../framework/core/xPage";

export class AccountDeletedPage extends xPage {
  readonly continueButton = this.$("[data-qa='continue-button']");
  readonly message = this.$("[data-qa='account-deleted']");
  readonly path = "/delete_account";

  async isOpened(): Promise<void> {
    await expect(this.message).toBeVisible();
    await expect(this.page).toHaveURL(/\/delete_account$/);
  }
}
