import { Routes, Route, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getQuizAPI } from "../../services/homePage.service";
import Dashboard from "./dashboard";
import Analytics from "./analytics";
import QuestionWiseAnalysis from "./analytics/question-wise-analysis";
import CreateQuiz from "./create-quiz";

import "./index.css";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const params = { isTrending: true, isSorted: true };

    const fetchQuizData = async () => {
      let response = [];
      if (location.pathname == "/home-page/analytics") {
        response = await getQuizAPI();
      } else {
        response = await getQuizAPI(params);
      }
      setQuiz(response);
      console.log(response);
    };
    fetchQuizData();
  }, [location.pathname]);

  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [quizs, setQuiz] = useState([]);
  const [openCreateQuizTypeModal, setOpenCreateQuizTypeModal] = useState(false);

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
                  location.pathname == "/home-page/analytics" ||
                  location.pathname == "/home-page/question-wise-analysis"
                    ? "2px 2px 20px 3px #0000001f"
                    : "none"
                }`,
              }}
            >
              Analytics
            </div>
          </Link>
          <div
            onClick={() => setOpenCreateQuizTypeModal(true)}
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
        </div>
        <div id='left-footer'>LOGOUT</div>
      </div>
      {quizs && (
        <div className='right-display-space'>
          <Routes>
            <Route path='/' element={<Dashboard quizs={quizs} />} />
            <Route path='/dashboard' element={<Dashboard quizs={quizs} />} />
            <Route
              path='/analytics'
              element={
                <Analytics quizs={quizs} setSelectedQuiz={setSelectedQuiz} />
              }
            />
            <Route
              path='/question-wise-analysis'
              element={<QuestionWiseAnalysis quiz={quizs[selectedQuiz]} />}
            />
          </Routes>
        </div>
      )}
      <CreateQuiz
        openCreateQuizTypeModal={openCreateQuizTypeModal}
        setOpenCreateQuizTypeModal={setOpenCreateQuizTypeModal}
      />
    </div>
  );
}
