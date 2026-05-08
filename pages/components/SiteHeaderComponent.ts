import type { xLocator } from "../../framework/core/xLocator";
import { xComponent } from "../../framework/core/xComponent";

export class SiteHeaderComponent extends xComponent {
  readonly cart = this.$("a[href='/view_cart']");
  readonly contactUs = this.$("a[href='/contact_us']");
  readonly deleteAccount = this.$("a[href='/delete_account']");
  readonly home = this.$("a[href='/']");
  readonly logout = this.$("a[href='/logout']");
  readonly products = this.$("a[href='/products']");
  readonly signupLogin = this.$("a[href='/login']");
  readonly testCases = this.$("a[href='/test_cases']");

  loggedInAs(name: string): xLocator {
    return this.root.getByText(`Logged in as ${name}`) as xLocator;
  }

  async deleteCurrentAccount(): Promise<void> {
    await this.deleteAccount.click();
  }

  async openHome(): Promise<void> {
    await this.home.click();
  }

  async openProducts(): Promise<void> {
    await this.products.click();
  }

  async openSignupLogin(): Promise<void> {
    await this.signupLogin.click();
  }

  async logoutCurrentUser(): Promise<void> {
    await this.logout.click();
  }
}
