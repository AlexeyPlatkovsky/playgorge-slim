import { expect } from "@playwright/test";

import { SiteHeaderComponent } from "./components/SiteHeaderComponent";
import { xPage } from "../framework/core/xPage";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupIdentity {
  email: string;
  name: string;
}

export class LoginPage extends xPage {
  readonly header = new SiteHeaderComponent(this.$("header"));
  readonly loginButton = this.$("[data-qa='login-button']");
  readonly loginEmail = this.$("[data-qa='login-email']");
  readonly loginPassword = this.$("[data-qa='login-password']");
  readonly path = "/login";
  readonly signupButton = this.$("[data-qa='signup-button']");
  readonly signupEmail = this.$("[data-qa='signup-email']");
  readonly signupName = this.$("[data-qa='signup-name']");

  async isOpened(): Promise<void> {
    await expect(this.signupName).toBeVisible();
    await expect(this.loginEmail).toBeVisible();
    await expect(this.page).toHaveURL(/\/login$/);
  }

  async login(credentials: LoginCredentials): Promise<void> {
    await this.loginEmail.fill(credentials.email);
    await this.loginPassword.fill(credentials.password);
    await this.loginButton.click();
  }

  async startSignup(identity: SignupIdentity): Promise<void> {
    await this.signupName.fill(identity.name);
    await this.signupEmail.fill(identity.email);
    await this.signupButton.click();
  }
}
