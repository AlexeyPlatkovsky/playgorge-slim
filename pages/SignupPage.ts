import { expect } from "@playwright/test";

import type { xLocator } from "../framework/core/xLocator";
import { xPage } from "../framework/core/xPage";

export interface NewAccountDetails {
  address: string;
  city: string;
  company?: string;
  country: string;
  day: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  month: string;
  password: string;
  state: string;
  year: string;
  zipCode: string;
}

export class SignupPage extends xPage {
  readonly accountInformationTitle = this.$(".login-form h2").filter({
    hasText: "Enter Account Information"
  }) as xLocator;
  readonly address = this.$("[data-qa='address']");
  readonly city = this.$("[data-qa='city']");
  readonly company = this.$("[data-qa='company']");
  readonly country = this.$("[data-qa='country']");
  readonly createAccountButton = this.$("[data-qa='create-account']");
  readonly day = this.$("[data-qa='days']");
  readonly firstName = this.$("[data-qa='first_name']");
  readonly lastName = this.$("[data-qa='last_name']");
  readonly mobileNumber = this.$("[data-qa='mobile_number']");
  readonly month = this.$("[data-qa='months']");
  readonly password = this.$("[data-qa='password']");
  readonly path = "/signup";
  readonly state = this.$("[data-qa='state']");
  readonly titleMr = this.$("#id_gender1");
  readonly year = this.$("[data-qa='years']");
  readonly zipCode = this.$("[data-qa='zipcode']");

  async isOpened(): Promise<void> {
    await expect(this.accountInformationTitle).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.page).toHaveURL(/\/signup$/);
  }

  async createAccount(details: NewAccountDetails): Promise<void> {
    await this.titleMr.check();
    await this.password.fill(details.password);
    await this.day.selectOption(details.day);
    await this.month.selectOption(details.month);
    await this.year.selectOption(details.year);
    await this.firstName.fill(details.firstName);
    await this.lastName.fill(details.lastName);

    if (details.company !== undefined) {
      await this.company.fill(details.company);
    }

    await this.address.fill(details.address);
    await this.country.selectOption(details.country);
    await this.state.fill(details.state);
    await this.city.fill(details.city);
    await this.zipCode.fill(details.zipCode);
    await this.mobileNumber.fill(details.mobileNumber);
    await this.createAccountButton.click();
  }
}
