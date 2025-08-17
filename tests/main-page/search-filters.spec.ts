import { expect, test } from "@playwright/test";

import currentUser from "../auth/mocks/current-user";
import allPlaylists from "./mocks/all-playlists";
import allTracks from "./mocks/all-tracks";

test.describe("Фича: поиск и фильтрация треков", () => {
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

  test("Если ввести в поисковую строку 'to', то треки отфильтруются по названию", async ({
    page,
  }) => {
    await page.getByPlaceholder("Поиск").fill("to");

    await expect(page.getByText("Come Together")).toBeVisible();
    await expect(page.getByText("Mule Train")).not.toBeVisible();
  });

  test("Если нажать на фильтр 'исполнителю' и выбрать исполнителя, то треки отфильтруются по исполнителю", async ({
    page,
  }) => {
    await page.getByText("исполнителю").click();
    await page.getByRole("button", { name: "J. Cole" }).click();
    await page.getByText("исполнителю").click();

    await expect(page.getByText("Come Together")).toBeVisible();
    await expect(page.getByText("Mule Train")).not.toBeVisible();
  });

  test("Если нажать на фильтр 'году выпуска' и выбрать 'Более старые' или 'Более новые', то порядок отображения треков изменится", async ({
    page,
  }) => {
    await page.getByTestId("track-name").first().waitFor({ state: "visible" });

    const trackNamesBefore = await page
      .getByTestId("track-name")
      .allTextContents();

    expect(trackNamesBefore).toEqual([
      "Mule Train",
      "Come Together",
      "Mack the Knife",
      "Airplanes",
      "YMCA",
      "Since U Been Gone",
    ]);

    await page.getByText("году выпуска").click();
    await page.getByText("Более старые").click();
    await page.getByText("году выпуска").click();

    const trackNamesAsc = await page
      .getByTestId("track-name")
      .allTextContents();

    expect(trackNamesAsc).toEqual([
      "Mack the Knife",
      "Airplanes",
      "Mule Train",
      "Since U Been Gone",
      "Come Together",
      "YMCA",
    ]);

    await page.getByText("году выпуска").click();
    await page.getByText("Более новые").click();
    await page.getByText("году выпуска").click();

    const trackNamesDesc = await page
      .getByTestId("track-name")
      .allTextContents();

    expect(trackNamesDesc).toEqual([
      "YMCA",
      "Come Together",
      "Since U Been Gone",
      "Mule Train",
      "Airplanes",
      "Mack the Knife",
    ]);
  });

  test("Если нажать на фильтр 'жанру' и выбрать какой-нибудь жанр, то треки отфильтруются по выбранному жанру", async ({
    page,
  }) => {
    await page.getByText("жанру").click();
    await page.getByRole("button", { name: "Emo" }).click();
    await page.getByText("жанру").click();

    await expect(page.getByText("Come Together")).toBeVisible();
    await expect(page.getByText("Mule Train")).not.toBeVisible();
  });
});
