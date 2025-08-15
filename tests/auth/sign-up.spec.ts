import { expect, test } from "@playwright/test";

import currentUser from "./mocks/current-user";

test.describe("Фича: регистрация", () => {
  test.describe("Дано: пользователь не авторизован", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/signup");
    });

    test("если перейти по пути /signup, то откроется страница регистрации", async ({
      page,
    }) => {
      await expect(page.getByPlaceholder("Повторите пароль")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Зарегистрироваться" })
      ).toBeVisible();
    });

    test("если ввести уже существующий логин, то отобразится ошибка", async ({
      page,
    }) => {
      await page.route("*/**/auth/register", async (route) => {
        await route.fulfill({
          status: 400,
          json: {
            code: "USER_EXISTS",
            message: "User already exists",
          },
        });
      });

      await page.getByPlaceholder("Логин").fill("test@test.com");
      await page.getByPlaceholder("Пароль", { exact: true }).fill("123456");
      await page.getByPlaceholder("Повторите пароль").fill("123456");
      await page.getByRole("button", { name: "Зарегистрироваться" }).click();

      await expect(
        page.getByText("Такой пользователь уже существует")
      ).toBeVisible();
    });

    test("если ввести корректные данные, то зарегистрируется новый аккаунт и произойдет переход на /login", async ({
      page,
    }) => {
      await page.route("*/**/auth/register", async (route) => {
        await route.fulfill({
          status: 201,
          json: {
            message: "User registered successfully",
          },
        });
      });
      await page.getByPlaceholder("Логин").fill("test@test.com");
      await page.getByPlaceholder("Пароль", { exact: true }).fill("123456");
      await page.getByPlaceholder("Повторите пароль").fill("123456");
      await page.getByRole("button", { name: "Зарегистрироваться" }).click();

      await expect(page).toHaveURL("/login");
    });

    test.describe("Валидация формы", () => {
      test('если не заполнить поле "Логин", то отобразится сообщение об ошибке', async ({
        page,
      }) => {
        await page.getByPlaceholder("Пароль", { exact: true }).fill("123456");
        await page.getByPlaceholder("Повторите пароль").fill("123456");

        await page.getByRole("button", { name: "Зарегистрироваться" }).click();

        await expect(page.getByText("Минимум 2 символа")).toBeVisible();
      });

      test('если ввести в поле "Логин" меньше 2 символов, то отобразится сообщение об ошибке', async ({
        page,
      }) => {
        await page.getByPlaceholder("Логин").fill("t");

        await expect(page.getByText("Минимум 2 символа")).toBeVisible();
      });

      test('если не заполнить поле "Пароль", то отобразится сообщение об ошибке', async ({
        page,
      }) => {
        await page.getByPlaceholder("Логин").fill("test@test.com");

        await page.getByRole("button", { name: "Зарегистрироваться" }).click();

        await expect(page.getByText("Минимум 6 символов")).toBeVisible();
      });

      test('если ввести в поле "Пароль" меньше 6 символов, то отобразится сообщение об ошибке', async ({
        page,
      }) => {
        await page.getByPlaceholder("Пароль", { exact: true }).fill("12345");

        await expect(page.getByText("Минимум 6 символов")).toBeVisible();
      });

      test('если ввести в поля "Пароль" и "Повторите пароль" разные значения, то отобразится сообщение об ошибке', async ({
        page,
      }) => {
        await page.getByPlaceholder("Пароль", { exact: true }).fill("123456");
        await page.getByPlaceholder("Повторите пароль").fill("1");

        await expect(page.getByText("Пароли не совпадают")).toBeVisible();
      });
    });
  });

  test.describe("Дано: пользователь уже авторизован", () => {
    test.beforeEach(async ({ page }) => {
      await page.route("*/**/users/me", async (route) => {
        await route.fulfill({
          status: 200,
          json: currentUser,
        });
      });
    });

    test("если перейти по пути /signup, то откроется главная страница", async ({
      page,
    }) => {
      await page.goto("/signup");

      await expect(page).toHaveURL("/");
    });
  });
});
