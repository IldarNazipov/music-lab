import { expect, test } from '@playwright/test';
import currentUser from './mocks/current-user';

test.describe('Фича: авторизация пользователя', () => {
  test.describe('Дано: пользователь не авторизован', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
    });

    test('если перейти по пути /login, то откроется страница авторизации', async ({
      page,
    }) => {
      await expect(page.getByRole('button', { name: 'Войти' })).toBeVisible();
    });

    test('если кликнуть по кнопке "Зарегистрироваться", то откроется страница регистрации', async ({
      page,
    }) => {
      await page.getByRole('link', { name: 'Зарегистрироваться' }).click();

      await expect(page).toHaveURL('/signup');
    });

    test('если войти с неверными данными, то отобразится сообщение об ошибке', async ({
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

    test('если войти с корректными данными, то произойдет авторизация и переход на главную страницу', async ({
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

    test.describe('Валидация формы', () => {
      test('если не заполнить поле "Логин", то отобразится сообщение об ошибке', async ({
        page,
      }) => {
        await page.getByPlaceholder('Пароль').fill('123456');

        await page.getByRole('button', { name: 'Войти' }).click();

        await expect(page.getByText('Минимум 2 символа')).toBeVisible();
      });

      test('если ввести в поле "Логин" меньше 2 символов, то отобразится сообщение об ошибке', async ({
        page,
      }) => {
        await page.getByPlaceholder('Логин').fill('t');

        await expect(page.getByText('Минимум 2 символа')).toBeVisible();
      });

      test('если не заполнить поле "Пароль", то отобразится сообщение об ошибке', async ({
        page,
      }) => {
        await page.getByPlaceholder('Логин').fill('test@test.com');

        await page.getByRole('button', { name: 'Войти' }).click();

        await expect(page.getByText('Минимум 6 символов')).toBeVisible();
      });

      test('если ввести в поле "Пароль" меньше 6 символов, то отобразится сообщение об ошибке', async ({
        page,
      }) => {
        await page.getByPlaceholder('Пароль').fill('12345');

        await expect(page.getByText('Минимум 6 символов')).toBeVisible();
      });
    });
  });

  test.describe('Дано: пользователь уже авторизован', () => {
    test.beforeEach(async ({ page }) => {
      await page.route('*/**/users/me', async (route) => {
        await route.fulfill({
          status: 200,
          json: currentUser,
        });
      });
    });

    test('если перейти по пути /login, то откроется главная страница', async ({
      page,
    }) => {
      await page.goto('/login');

      await expect(page).toHaveURL('/');
    });
  });
});
