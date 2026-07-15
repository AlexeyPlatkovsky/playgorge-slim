import type { xLocator } from "../../framework/core/xLocator";
import { xComponent } from "../../framework/core/xComponent";

export class PaginationComponent extends xComponent {
  readonly container = this.root;
  readonly currentPage = this.$("li.active");
  readonly nextButton = this.root.locator("a[rel='next']").first() as xLocator;
  readonly pageLinks = this.root.locator("li a") as xLocator;
  readonly pages = this.root.locator("li") as xLocator;
  readonly prevButton = this.root.locator("a[rel='prev']").first() as xLocator;

  async goToPage(pageNumber: number): Promise<void> {
    await this.pageLink(pageNumber).click();
  }

  async goToNextPage(): Promise<void> {
    await this.nextButton.click();
  }

  async goToPrevPage(): Promise<void> {
    await this.prevButton.click();
  }

  pageLink(pageNumber: number): xLocator {
    return this.root.locator(`a[data-page='${String(pageNumber)}']`).first() as xLocator;
  }
}
