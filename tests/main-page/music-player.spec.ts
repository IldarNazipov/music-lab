import { expect, test } from "@playwright/test";

import currentUser from "../auth/mocks/current-user";
import allPlaylists from "./mocks/all-playlists";
import allTracks from "./mocks/all-tracks";

test.describe("Фича: аудио плеер", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("*/**/users/me", async (route) => {
      await route.fulfill({
        status: 200,
        json: currentUser,
      });
    });

    await page.route("*/**/tracks", async (route) => {
      await route.fulfill({
        status: 200,
        json: allTracks,
      });
    });

    await page.route("*/**/playlists", async (route) => {
      await route.fulfill({
        status: 200,
        json: allPlaylists,
      });
    });

    await page.goto("/");
  });

  test("По умолчанию плеер скрыт при открытии страницы", async ({ page }) => {
    await expect(page.getByTestId("player")).not.toBeVisible();
  });

  test("Если кликнуть на трек, то отобразится плеер и начнется воспроизведение", async ({
    page,
  }) => {
    await page.getByText("Come Together").click();

    await expect(page.getByTestId("player")).toBeVisible();
    await expect(page.getByLabel("Пауза")).toBeVisible();
  });

  test("Если кликнуть в плеере на кнопку 'предыдущий трек' или 'следующий трек', то плеер переключается и воспроизводит соответствующий трек", async ({
    page,
  }) => {
    await page.getByText("Come Together").click();

    await page.getByLabel("Предыдущий трек").click();
    await expect(page.getByTestId("playingTrack")).toHaveText("Mule Train");

    await page.getByLabel("Следующий трек").click();
    await expect(page.getByTestId("playingTrack")).toHaveText("Come Together");
  });

  test("Если кликнуть в плеере на кнопку 'повтор трека', то плеер зациклит воспроизведение трека", async ({
    page,
  }) => {
    await page.getByText("Mule Train").click();
    await page.getByLabel("Включить повтор трека").click();

    await page.waitForTimeout(6000);

    await expect(page.getByTestId("playingTrack")).toHaveText("Mule Train");
  });

  test("Если кликнуть в плеере на кнопку 'перемешать', то плеер будет проигрывать треки в произвольном порядке", async ({
    page,
  }) => {
    await page.getByText("Mule Train").click();
    await page.getByLabel("Включить перемешивание треков").click();
    await page.getByLabel("Следующий трек").click();

    await expect(page.getByTestId("playingTrack")).not.toHaveText(
      "Come Together"
    );
  });
});
