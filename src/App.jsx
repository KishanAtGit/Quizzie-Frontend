import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignIn from "./components/sign-up";
import LogIn from "./components/log-in";

import "./App.css";

export default function App() {
  const [loginType, setLoginType] = useState("sign-up");

  const handleLoginType = type => {
    setLoginType(type);
  };

  return (
    <BrowserRouter>
      <div className='authenticators'>
        <div id='heading'>QUIZZIE</div>
        <div className='routes'>
          <Link
            onClick={() => handleLoginType("sign-up")}
            id='sign-up'
            to='/sign-up'
            style={{
              boxShadow: `${
                loginType == "sign-up" ? "2px 2px 20px 3px #0019ff3d" : "none"
              }`,
            }}
          >
            Sign Up
          </Link>
          <Link
            onClick={() => handleLoginType("log-in")}
            to='/log-in'
            style={{
              boxShadow: `${
                loginType == "log-in" ? "2px 2px 20px 3px #0019ff3d" : "none"
              }`,
            }}
          >
            Log In
          </Link>
        </div>
        <Routes>
          <Route
            path='/'
            element={<SignIn handleLoginType={handleLoginType} />}
          />
          <Route
            path='/sign-up'
            element={<SignIn handleLoginType={handleLoginType} />}
          />
          <Route path='/log-in' element={<LogIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
