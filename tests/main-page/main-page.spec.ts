import { expect, test } from '@playwright/test';
import currentUser from '../auth/mocks/current-user';
import allTracks from './mocks/all-tracks';
import allPlaylists from './mocks/all-playlists';
import userWithFavorites from './mocks/user-with-favorites';

test.describe('Фича: отображение треков и плейлистов', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/users/me', async (route) => {
      await route.fulfill({
        status: 200,
        json: currentUser,
      });
    });

    await page.route('*/**/tracks', async (route) => {
      await route.fulfill({
        status: 200,
        json: allTracks,
      });
    });

    await page.route('*/**/playlists', async (route) => {
      await route.fulfill({
        status: 200,
        json: allPlaylists,
      });
    });

    await page.goto('/');
  });

  test('Если открыть главную страницу, то отобразятся все доступные треки', async ({
    page,
  }) => {
    await expect(page.getByText('Mule Train')).toBeVisible();
  });

  test('Если открыть главную страницу, то отобразятся все доступные плейлисты', async ({
    page,
  }) => {
    await expect(page.getByText('boo characterization')).toBeVisible();
  });

  test('Если нажать на плейлист, то откроется страница плейлиста с треками, добавленными в него', async ({
    page,
  }) => {
    const target = page.getByText('boo characterization');
    await expect(target).toBeVisible();
    await expect(target).toBeEnabled();
    await target.click();

    await expect(page).toHaveURL('/playlists/6861a103a7ce67e0dab405cb');

    await expect(
      page.getByRole('heading', { name: 'boo characterization' })
    ).toBeVisible();

    await expect(page.getByText('Come Together')).toBeVisible();
  });

  test.describe('Дано: пользователь не добавил ни одного трека в избранное', () => {
    test('Если перейти по пути /mytracks, то вместо треков отобразится соответствующий текст', async ({
      page,
    }) => {
      await page.goto('/mytracks');

      await expect(
        page.getByText('Вы еще не добавили ни одного трека в избранное')
      ).toBeVisible();
    });
  });

  test.describe('Дано: пользователь добавил трек в избранное', () => {
    test('Если перейти по пути /mytracks, то отобразятся избранные треки', async ({
      page,
    }) => {
      await page.route('*/**/users/me', async (route) => {
        await route.fulfill({
          status: 200,
          json: userWithFavorites,
        });
      });

      await page.goto('/mytracks');

      await expect(page.getByText('Mule Train')).toBeVisible();
    });
  });
});
