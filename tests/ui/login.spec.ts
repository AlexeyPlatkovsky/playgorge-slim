import { assertTextEquals, assertVisible } from "../../assertions";
import { test } from "../../framework/fixtures/app.fixture";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";

test("user can log in and see the success message @ui", async ({ page }) => {
  const homePage = await new HomePage(page).open();
  await homePage.header.openSignupLogin();

  const loginPage = new LoginPage(page);
  await loginPage.isOpened();
  await loginPage.login({ email: "test_epam_course@test.com", password: "test_course" });

  await homePage.isOpened();
  await assertVisible(homePage.loginSuccessMessage);
  await assertTextEquals(homePage.loginSuccessMessage, "You successfully logged in");
});
