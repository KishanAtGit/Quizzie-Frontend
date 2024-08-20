import { Routes, Route, useLocation, Link } from "react-router-dom";
import Dashboard from "./dashboard";
import Analytics from "./analytics";
import CreateQuiz from "./create-quiz";

import "./index.css";

export default function HomePage() {
  const location = useLocation();

  return (
    <div className='home-page'>
      <div className='left-menus'>
        <div id='heading'>QUIZZIE</div>
        <div className='menus'>
          <Link to={"/home-page/dashboard"}>
            <div
              style={{
                boxShadow: `${
                  location.pathname == "/home-page/" ||
                  location.pathname == "/home-page/dashboard"
                    ? "2px 2px 20px 3px #0000001f"
                    : "none"
                }`,
              }}
            >
              Dashboard
            </div>
          </Link>
          <Link to={"/home-page/analytics"}>
            <div
              style={{
                boxShadow: `${
                  location.pathname == "/home-page/analytics"
                    ? "2px 2px 20px 3px #0000001f"
                    : "none"
                }`,
              }}
            >
              Analytics
            </div>
          </Link>
          <Link to={"/home-page/create-quiz"}>
            <div
              style={{
                boxShadow: `${
                  location.pathname == "/home-page/create-quiz"
                    ? "2px 2px 20px 3px #0000001f"
                    : "none"
                }`,
              }}
            >
              Create Quiz
            </div>
          </Link>
        </div>
        <div id='left-footer'>LOGOUT</div>
      </div>
      <div className='right-display-space'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/create-quiz' element={<CreateQuiz />} />
        </Routes>
      </div>
    </div>
  );
}
