import { BrowserRouter, Route, Routes } from "react-router-dom";

import Auth from "./utils/Auth";
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import SettingPage from "./pages/setting/setting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              <HomePage />
            </Auth>
          }
        />
        <Route
          path="/setting"
          element={
            <Auth>
              <SettingPage />
            </Auth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
