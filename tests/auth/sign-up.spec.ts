import { expect, test } from '@playwright/test';

test.describe('Feature: sign up', () => {
  test.describe('User is not logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/signup');
    });

    test('should open signup page when user navigates to /signup', async ({
      page,
    }) => {
      await expect(page.getByPlaceholder('Повторите пароль')).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'Зарегистрироваться' })
      ).toBeVisible();
    });

    test('should show error when trying to register with existing email', async ({
      page,
    }) => {
      await page.route('*/**/auth/register', async (route) => {
        await route.fulfill({
          status: 400,
          json: {
            code: 'USER_EXISTS',
            message: 'User already exists',
          },
        });
      });

      await page.getByPlaceholder('Логин').fill('test@test.com');
      await page.getByPlaceholder(/^Пароль$/).fill('123456');
      await page.getByPlaceholder('Повторите пароль').fill('123456');
      await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

      await expect(
        page.getByText('Такой пользователь уже существует')
      ).toBeVisible();
    });

    test('should register new account and redirect to /login when user provides valid credentials', async ({
      page,
    }) => {
      await page.route('*/**/auth/register', async (route) => {
        await route.fulfill({
          status: 201,
          json: {
            message: 'User registered successfully',
          },
        });
      });
      await page.getByPlaceholder('Логин').fill('test@test.com');
      await page.getByPlaceholder(/^Пароль$/).fill('123456');
      await page.getByPlaceholder('Повторите пароль').fill('123456');
      await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

      await expect(page).toHaveURL('/login');
    });

    test.describe('Form validation', () => {
      test('should show validation error on empty email field', async ({
        page,
      }) => {
        await page.getByPlaceholder(/^Пароль$/).fill('123456');
        await page.getByPlaceholder('Повторите пароль').fill('123456');

        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

        await expect(page.getByText('Минимум 2 символа')).toBeVisible();
      });

      test('should show validation error on short email', async ({ page }) => {
        await page.getByPlaceholder('Логин').fill('t');

        await expect(page.getByText('Минимум 2 символа')).toBeVisible();
      });

      test('should show validation error on empty password field', async ({
        page,
      }) => {
        await page.getByPlaceholder('Логин').fill('test@test.com');

        await page.getByRole('button', { name: 'Зарегистрироваться' }).click();

        await expect(page.getByText('Минимум 6 символов')).toBeVisible();
      });

      test('should show validation error on short password', async ({
        page,
      }) => {
        await page.getByPlaceholder(/^Пароль$/).fill('12345');

        await expect(page.getByText('Минимум 6 символов')).toBeVisible();
      });

      test('should show validation error if password and confirmation do not match', async ({
        page,
      }) => {
        await page.getByPlaceholder(/^Пароль$/).fill('123456');
        await page.getByPlaceholder('Повторите пароль').fill('1');

        await expect(page.getByText('Пароли не совпадают')).toBeVisible();
      });
    });
  });

  test.describe('User is already logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.route('*/**/users/me', async (route) => {
        await route.fulfill({
          status: 200,
          json: {
            email: 'test@test.com',
            favorites: [],
            _id: '683d9cce6d77e3dc668e6c2f',
          },
        });
      });
    });

    test('should open main page when user navigates to /signup', async ({
      page,
    }) => {
      await page.goto('/signup');

      await expect(page).toHaveURL('/');
    });
  });
});
