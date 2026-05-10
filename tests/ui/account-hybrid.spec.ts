import { assertVisible } from "../../assertions";
import { test } from "../../framework/fixtures/app.fixture";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { createUser, deleteUser } from "../../framework/factories/user.factory";

test("user created via API can log in and is visible in the UI @e2e @ui", async ({ page }) => {
  const user = await createUser();

  try {
    const homePage = await new HomePage(page).open();
    await homePage.header.openSignupLogin();

    const loginPage = new LoginPage(page);
    await loginPage.isOpened();
    await loginPage.login({ email: user.email, password: user.password });

    await homePage.isOpened();
    await assertVisible(homePage.header.loggedInAs(user.name));
  } finally {
    await deleteUser(user.email, user.password);
  }
});
