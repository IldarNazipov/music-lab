import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { LogInPage } from "./pages/log-in";
import { SignUpPage } from "./pages/sign-up";
import { NotFoundPage } from "./pages/not-found";
import { AuthProvider } from "./contexts/auth/provider.js";
import { PrivateRoute } from "./common/routing/private-route";
import { PublicRoute } from "./common/routing/public-route";
import { MainLayout } from "./widgets/main-layout";
import { MainPage } from "./pages/main/index.js";
import { MyTracksPage } from "./pages/my-tracks/index.js";
import { PlaylistPage } from "./pages/playlist/index.js";
import { TracksProvider } from "./contexts/tracks/provider.js";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TracksProvider>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LogInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Route>

            <Route
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              <Route path="/" element={<MainPage />} />
              <Route path="/mytracks" element={<MyTracksPage />} />
              <Route path="/playlists/:id" element={<PlaylistPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </TracksProvider>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}
