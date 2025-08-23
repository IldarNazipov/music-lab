import test, { expect } from "@playwright/test";

import currentUser from "../auth/mocks/current-user";

test.describe("Фича: смена темы", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("*/**/users/me", async (route) => {
      await route.fulfill({
        status: 200,
        json: currentUser,
      });
    });

    await page.goto("/");
  });

  test("Если нажать на кнопку смены темы, то тема сменится", async ({
    page,
  }) => {
    const noClass = await page.locator("html").getAttribute("class");
    expect(noClass).toBeNull();

    await page.getByLabel("Открыть меню").click();
    await page.getByLabel("Сменить тему").click();

    const darkClass = await page.locator("html").getAttribute("class");
    expect(darkClass).toEqual("dark");
  });

  test("Если обновить страницу, то настройка темы сохранится", async ({
    page,
  }) => {
    await page.getByLabel("Открыть меню").click();
    await page.getByLabel("Сменить тему").click();

    const classBeforeRefresh = await page.locator("html").getAttribute("class");
    expect(classBeforeRefresh).toEqual("dark");

    await page.reload();

    const classAfterRefresh = await page.locator("html").getAttribute("class");
    expect(classAfterRefresh).toEqual(classBeforeRefresh);
  });
});
