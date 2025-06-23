import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { LogInPage } from "./pages/log-in";
import { SignUpPage } from "./pages/sign-up";
import { ErrorPage } from "./pages/not-found";
import { AuthProvider } from "./contexts/auth/provider.js";
import { PrivateRoute } from "./components/private-route";
import { TempPage } from "./pages/temp/index.js";
import { PublicRoute } from "./components/public-route/index.js";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>

          <Route
            path="/"
            element={
              <PrivateRoute>
                <TempPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}
