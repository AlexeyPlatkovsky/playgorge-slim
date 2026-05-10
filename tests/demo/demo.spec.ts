import { assertVisible } from "../../assertions";
import { test } from "../../framework/fixtures/app.fixture";
import { HomePage } from "../../pages/HomePage";
import { ProductsPage } from "../../pages/ProductsPage";

test("home page loads and navigation to products works @smoke @ui", async ({ page }) => {
  const homePage = await new HomePage(page).open();

  await assertVisible(homePage.heroHeading);

  await homePage.header.openProducts();

  const productsPage = new ProductsPage(page);
  await productsPage.isOpened();
});
