import { assertTextEquals, assertVisible } from "../../assertions";
import { test } from "../../framework/fixtures/app.fixture";
import { AccountCreatedPage } from "../../pages/AccountCreatedPage";
import { AccountDeletedPage } from "../../pages/AccountDeletedPage";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { SignupPage } from "../../pages/SignupPage";

test("new user can create an account and sign in with it @ui", async ({ page }, testInfo) => {
  const uniqueSuffix = `${String(Date.now())}-${String(testInfo.workerIndex)}`;
  const account = {
    email: `playforge-${uniqueSuffix}@example.com`,
    name: `Playforge User ${uniqueSuffix}`,
    password: "Playforge123!"
  };

  const homePage = await new HomePage(page).open();
  await homePage.header.openSignupLogin();

  const loginPage = new LoginPage(page);
  await loginPage.isOpened();
  await loginPage.startSignup(account);

  const signupPage = new SignupPage(page);
  await signupPage.isOpened();
  await signupPage.createAccount({
    address: "100 Main Street",
    city: "New York",
    company: "Playforge",
    country: "United States",
    day: "10",
    firstName: "Playforge",
    lastName: "User",
    mobileNumber: "5550101234",
    month: "5",
    password: account.password,
    state: "New York",
    year: "1990",
    zipCode: "10001"
  });

  const accountCreatedPage = new AccountCreatedPage(page);
  await accountCreatedPage.isOpened();
  await assertTextEquals(accountCreatedPage.message, "Account Created!");
  await accountCreatedPage.continueToSite();

  await homePage.isOpened();
  await assertVisible(homePage.header.loggedInAs(account.name));
  await homePage.header.logoutCurrentUser();

  await loginPage.isOpened();
  await loginPage.login(account);

  await homePage.isOpened();
  await assertVisible(homePage.header.loggedInAs(account.name));
  await homePage.header.deleteCurrentAccount();

  const accountDeletedPage = new AccountDeletedPage(page);
  await accountDeletedPage.isOpened();
  await assertTextEquals(accountDeletedPage.message, "Account Deleted!");
});
