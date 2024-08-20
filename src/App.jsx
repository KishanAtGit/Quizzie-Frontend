import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAuthentication from "./components/user-authentication";
import HomePage from "./components/home-page";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path='*'
          element={<div className='page-not-found'>Page Not Found!</div>}
        /> */}
        <Route path='*' element={<UserAuthentication />} />
        <Route path='/home-page/*' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
