import { Routes, Route, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./dashboard";
import Analytics from "./analytics";
import QuestionWiseAnalysis from "./analytics/question-wise-analysis";
import CreateQuiz from "./create-quiz";

import "./index.css";

export default function HomePage() {
  const location = useLocation();
  const [selectedQuiz, setSelectedQuiz] = useState();

  const [tempEntry, setTempEntry] = useState([
    1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 5, 9,
  ]);
  const [quizs, setQuiz] = useState([
    {
      // quizName: selectedQuiz,
      questions: [
        {
          question: "What is the capital of India?",
          attempt: 0,
          correctAnswer: 0,
          incorrectAnswer: 0,
        },
        {
          question: "What is the capital of India?",
          attempt: 0,
          correctAnswer: 0,
          incorrectAnswer: 0,
        },
        {
          question: "What is the capital of India?",
          attempt: 0,
          correctAnswer: 0,
          incorrectAnswer: 0,
        },
      ],
    },
    {
      // quizName: selectedQuiz,
      questions: [
        {
          question: "What is the capital of India?",
          attempt: 0,
          correctAnswer: 0,
          incorrectAnswer: 0,
        },
        {
          question: "What is the capital of India?",
          attempt: 0,
          correctAnswer: 0,
          incorrectAnswer: 0,
        },
        {
          question: "What is the capital of India?",
          attempt: 0,
          correctAnswer: 0,
          incorrectAnswer: 0,
        },
        {
          question: "What is the capital of India?",
          attempt: 0,
          correctAnswer: 0,
          incorrectAnswer: 0,
        },
      ],
    },
  ]);

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
          <Route path='/' element={<Dashboard tempEntry={tempEntry} />} />
          <Route
            path='/dashboard'
            element={<Dashboard tempEntry={tempEntry} />}
          />
          <Route
            path='/analytics'
            element={
              <Analytics
                tempEntry={tempEntry}
                setSelectedQuiz={setSelectedQuiz}
              />
            }
          />
          <Route path='/create-quiz' element={<CreateQuiz />} />
          <Route
            path='/question-wise-analysis'
            element={<QuestionWiseAnalysis quiz={quizs[selectedQuiz]} />}
          />
        </Routes>
      </div>
    </div>
  );
}
