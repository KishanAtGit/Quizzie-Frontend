import { BrowserRouter, Routes, Route } from "react-router-dom";
import { registerUser } from "./api";
import UserAuthentication from "./components/user-authentication";
import HomePage from "./components/home-page";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='*'
          element={<UserAuthentication registerUser={registerUser} />}
        />
        <Route path='/home-page' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
