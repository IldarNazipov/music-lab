import { expect, test } from "@playwright/test";
import currentUser from "../auth/mocks/current-user";
import allTracks from "./mocks/all-tracks";
import allPlaylists from "./mocks/all-playlists";
import userWithFavorites from "./mocks/user-with-favorites";

test.describe("Фича: отображение треков и плейлистов", () => {
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

  test("Если открыть главную страницу, то отобразятся все доступные треки", async ({
    page,
  }) => {
    await expect(page.getByText("Mule Train")).toBeVisible();
  });

  test("Если открыть главную страницу, то отобразятся все доступные плейлисты", async ({
    page,
  }) => {
    await expect(page.getByText("boo characterization")).toBeVisible();
  });

  test("Если нажать на плейлист, то откроется страница плейлиста с треками, добавленными в него", async ({
    page,
  }) => {
    const target = page.getByText("boo characterization");
    await expect(target).toBeVisible();
    await expect(target).toBeEnabled();
    await target.click();

    await expect(page).toHaveURL("/playlists/6861a103a7ce67e0dab405cb");

    await expect(
      page.getByRole("heading", { name: "boo characterization" })
    ).toBeVisible();

    await expect(page.getByText("Come Together")).toBeVisible();
  });

  test.describe("Дано: пользователь не добавил ни одного трека в избранное", () => {
    test("Если перейти по пути /mytracks, то вместо треков отобразится соответствующий текст", async ({
      page,
    }) => {
      await page.goto("/mytracks");

      await expect(
        page.getByText("Вы еще не добавили ни одного трека в избранное")
      ).toBeVisible();
    });
  });

  test.describe("Дано: пользователь добавил трек в избранное", () => {
    test("Если перейти по пути /mytracks, то отобразятся избранные треки", async ({
      page,
    }) => {
      await page.route("*/**/users/me", async (route) => {
        await route.fulfill({
          status: 200,
          json: userWithFavorites,
        });
      });

      await page.goto("/mytracks");

      await expect(page.getByText("Mule Train")).toBeVisible();
    });
  });
});

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
    await expect(page.getByTestId("pause")).toBeVisible();
  });

  test("Если кликнуть в плеере на кнопку 'предыдущий трек' или 'следующий трек', то плеер переключается и воспроизводит соответствующий трек", async ({
    page,
  }) => {
    await page.getByText("Come Together").click();

    await page.getByTestId("prev").click();
    await expect(page.getByTestId("playingTrack")).toHaveText("Mule Train");

    await page.getByTestId("next").click();
    await expect(page.getByTestId("playingTrack")).toHaveText("Come Together");
  });

  test("Если кликнуть в плеере на кнопку 'повтор трека', то плеер зациклит воспроизведение трека", async ({
    page,
  }) => {
    await page.getByText("Mule Train").click();
    await page.getByTestId("repeat").click();

    await page.evaluate(async () => {
      const audio = document.querySelector("audio");
      if (!audio) {
        return;
      }

      await new Promise<void>((resolve) => {
        if (Number.isFinite(audio.duration)) {
          resolve();
        } else {
          audio.addEventListener("loadedmetadata", () => resolve(), {
            once: true,
          });
        }
      });

      audio.currentTime = audio.duration - 0.1;
    });

    await expect(page.getByTestId("playingTrack")).toHaveText("Mule Train");
  });

  test("Если кликнуть в плеере на кнопку 'перемешать', то плеер будет проигрывать треки в произвольном порядке", async ({
    page,
  }) => {
    await page.getByText("Mule Train").click();
    await page.getByTestId("shuffle").click();
    await page.getByTestId("next").click();

    await expect(page.getByTestId("playingTrack")).not.toHaveText(
      "Come Together"
    );
  });
});
