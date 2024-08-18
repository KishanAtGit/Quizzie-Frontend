import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import SignUp from "./components/sign-up";
import LogIn from "./components/log-in";

import "./App.css";

export default function App() {
  const [loginType, setLoginType] = useState("sign-up");
  console.log(loginType);

  // const handleLoginType = type => {
  //   setLoginType(type);
  // };

  //User Registration API
  const registerUser = async signUpData => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", signUpData);
      // if (data.status === 200) {
      //   setLoginType("log-in");
      // }
      // return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BrowserRouter>
      <div className='authenticators'>
        <div id='heading'>QUIZZIE</div>
        <div className='routes'>
          <Link
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
            element={
              <SignUp setLoginType={setLoginType} registerUser={registerUser} />
            }
          />
          <Route
            path='/sign-up'
            element={
              <SignUp setLoginType={setLoginType} registerUser={registerUser} />
            }
          />
          <Route
            path='/log-in'
            element={<LogIn setLoginType={setLoginType} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
