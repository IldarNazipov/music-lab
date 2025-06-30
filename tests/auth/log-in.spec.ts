import { expect, test } from '@playwright/test';

test.describe('Feature: login', () => {
  test.describe('User is not logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
    });

    test('should open login page when user navigates to /login', async ({
      page,
    }) => {
      await expect(page.getByRole('button', { name: 'Войти' })).toBeVisible();
    });

    test('should open sign-up page when user clicks the "Sign up" link', async ({
      page,
    }) => {
      await page.getByRole('link', { name: 'Зарегистрироваться' }).click();

      await expect(page).toHaveURL('/signup');
    });

    test('should show error when user logs in with invalid credentials', async ({
      page,
    }) => {
      await page.route('*/**/auth/login', async (route) => {
        await route.fulfill({
          status: 400,
          json: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password',
          },
        });
      });

      await page.getByPlaceholder('Логин').fill('test@test.com');
      await page.getByPlaceholder('Пароль').fill('123456');
      await page.getByRole('button', { name: 'Войти' }).click();

      await expect(page.getByText('Неверный email или пароль')).toBeVisible();
    });

    test('should log in and redirect when user provides valid credentials', async ({
      page,
    }) => {
      await page.route('*/**/auth/login', async (route) => {
        await route.fulfill({
          status: 200,
          json: {
            accessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjI3NWYyMjA0OTcxNGE1NGZjNWM1OCIsImlhdCI6MTc1MTI4MzE5NSwiZXhwIjoxNzUxMjg2Nzk1fQ.OKyOjNd4ZWPSWERMhcDhH8EdC4hZuJtdyjbvXIPXZwY',
            refreshToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjI3NWYyMjA0OTcxNGE1NGZjNWM1OCIsImlhdCI6MTc1MTI4MzE5NSwiZXhwIjoxNzUxODg3OTk1fQ.FJ8VgLHbNzmGMyBTQ6oRMGGcEFZ_gCxXqWAFSuH07JI',
          },
        });
      });
      await page.getByPlaceholder('Логин').fill('test@test.com');
      await page.getByPlaceholder('Пароль').fill('123456');
      await page.getByRole('button', { name: 'Войти' }).click();

      await expect(page).toHaveURL('/');
    });

    test.describe('Form validation', () => {
      test('should show validation error on empty email field', async ({
        page,
      }) => {
        await page.getByPlaceholder('Пароль').fill('123456');

        await page.getByRole('button', { name: 'Войти' }).click();

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

        await page.getByRole('button', { name: 'Войти' }).click();

        await expect(page.getByText('Минимум 6 символов')).toBeVisible();
      });

      test('should show validation error on short password', async ({
        page,
      }) => {
        await page.getByPlaceholder('Пароль').fill('12345');

        await expect(page.getByText('Минимум 6 символов')).toBeVisible();
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

    test('should open main page when user navigates to /login', async ({
      page,
    }) => {
      await page.goto('/login');

      await expect(page).toHaveURL('/');
    });
  });
});
