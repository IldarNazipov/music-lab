import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { LogInPage } from "./pages/log-in";
import { SignUpPage } from "./pages/sign-up";
import { NotFoundPage } from "./pages/not-found";
import { AuthProvider } from "./contexts/auth/provider.js";
import { PrivateRoute } from "./common/routing/private-route";
import { PublicRoute } from "./common/routing/public-route";
import { Title } from "./common/components/title";

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
                <Title>Hello</Title>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}
