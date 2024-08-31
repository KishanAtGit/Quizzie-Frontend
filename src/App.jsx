import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserAuthentication from "./components/user-authentication";
import HomePage from "./components/home-page";
import LiveQuizPage from "./components/live-quiz/LiveQuizPage";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<UserAuthentication />} />
          <Route path='/home-page/*' element={<HomePage />} />
          <Route path='/live-quiz/:quizId' element={<LiveQuizPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
