import { Routes, Route, Link, useLocation } from "react-router-dom";
import SignUp from "./sign-up";
import LogIn from "./log-in";

import "./index.css";

export default function UserAuthentication() {
  const location = useLocation();

  return (
    <div className='authenticators'>
      <div id='heading'>QUIZZIE</div>
      <div className='routes'>
        <Link
          id='sign-up'
          to='/sign-up'
          style={{
            boxShadow: `${
              location.pathname == "/sign-up" || location.pathname == "/"
                ? "2px 2px 20px 3px #0019ff3d"
                : "none"
            }`,
          }}
        >
          Sign Up
        </Link>
        <Link
          to='/log-in'
          style={{
            boxShadow: `${
              location.pathname == "/log-in"
                ? "2px 2px 20px 3px #0019ff3d"
                : "none"
            }`,
          }}
        >
          Log In
        </Link>
      </div>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/log-in' element={<LogIn />} />
      </Routes>
    </div>
  );
}
