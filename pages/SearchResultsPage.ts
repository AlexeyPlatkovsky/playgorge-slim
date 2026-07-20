import { expect } from "@playwright/test";

import { PaginationComponent } from "./components/PaginationComponent";
import { SiteHeaderComponent } from "./components/SiteHeaderComponent";
import { SubscriptionFooterComponent } from "./components/SubscriptionFooterComponent";
import { xPage } from "../framework/core/xPage";

export class SearchResultsPage extends xPage {
  readonly header = new SiteHeaderComponent(this.$("header"));
  readonly pagination = new PaginationComponent(this.$(".pagination"));
  readonly path = "/products";
  readonly resultCards = this.$(".product-image-wrapper");
  readonly searchButton = this.$("#submit_search");
  readonly searchInput = this.$("#search_product");
  readonly subscription = new SubscriptionFooterComponent(this.$("footer"));

  async isOpened(): Promise<void> {
    await expect(this.searchInput).toBeVisible();
    await expect(this.page).toHaveURL(/\/products\?search=.+/);
  }

  resultTitle(name: string) {
    return this.resultCards.filter({ hasText: name }).locator(".productinfo p").first();
  }

  async openProductDetails(name: string): Promise<void> {
    const link = this.resultCards
      .filter({ hasText: name })
      .locator("a[href*='/product_details/']")
      .first();

    await link.click();
  }
}
