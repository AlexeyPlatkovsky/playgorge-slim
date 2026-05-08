import { expect } from "@playwright/test";

import { xPage } from "../framework/core/xPage";

export class AccountCreatedPage extends xPage {
  readonly continueButton = this.$("[data-qa='continue-button']");
  readonly message = this.$("[data-qa='account-created']");
  readonly path = "/account_created";

  async isOpened(): Promise<void> {
    await expect(this.message).toBeVisible();
    await expect(this.page).toHaveURL(/\/account_created$/);
  }

  async continueToSite(): Promise<void> {
    await this.continueButton.click();
  }
}
