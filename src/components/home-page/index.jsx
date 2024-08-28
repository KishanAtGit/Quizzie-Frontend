import { Routes, Route, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getQuizAPI } from "../../services/homePage.service";
import Dashboard from "./dashboard";
import Analytics from "./analytics";
import QuestionWiseAnalysis from "./analytics/question-wise-analysis";
import CreateQuiz from "./create-quiz";

import "./index.css";

export default function HomePage() {
  useEffect(() => {
    const fetchQuizData = async () => {
      const response = await getQuizAPI();
      setQuiz(response);
      console.log(response);
    };
    fetchQuizData();
  }, []);

  const location = useLocation();
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [tempEntry, setTempEntry] = useState([
    1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 5, 9,
  ]);
  const [quizs, setQuiz] = useState([]);
  // {
  //   quizName: "Quiz 1",
  //   questionType: "Q&A",
  //   quizAttempt: 0,
  //   questions: [
  //     {
  //       question: "What is the capital of India?",
  //       optionType: ["text", "imageUrl", "textAndImageUrl"],
  //       options: [
  //         {
  //           optionText: "New Delhi",
  //           imageUrl: "",
  //           isCorrect: true,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Mumbai",
  //           imageUrl: "",
  //           isCorrect: false,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Chennaifalse",
  //           imageUrl: "",
  //           isCorrect: false,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Kolkata",
  //           imageUrl: "",
  //           isCorrect: false,
  //           countOfResponses: 0,
  //         },
  //       ],
  //       questionAttemptCorrect: 0,
  //       questionAttemptFail: 0,
  //       get questionAttempted() {
  //         return this.questionAttemptCorrect + this.questionAttemptFail;
  //       },
  //       timer: 0,
  //     },
  //     {
  //       question: "What is the biggest country in the world ?",
  //       optionType: ["text", "imageUrl", "textAndImageUrl"],
  //       options: [
  //         {
  //           optionText: "USA",
  //           imageUrl: "",
  //           isCorrect: false,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Russia",
  //           imageUrl: "",
  //           isCorrect: true,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "China",
  //           imageUrl: "",
  //           isCorrect: false,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Saudi-Arabia",
  //           imageUrl: "",
  //           isCorrect: false,
  //           countOfResponses: 0,
  //         },
  //       ],

  //       questionAttemptCorrect: 0,
  //       questionAttemptFail: 0,
  //       get questionAttempted() {
  //         return this.questionAttemptCorrect + this.questionAttemptFail;
  //       },
  //       timer: 0,
  //     },
  //     {
  //       question: "What is the biggest creature in water?",
  //       optionType: ["text", "imageUrl", "textAndImageUrl"],
  //       options: [
  //         {
  //           optionText: "Shark",
  //           imageUrl: "",
  //           isCorrect: false,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Whale",
  //           imageUrl: "",
  //           isCorrect: true,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Octopus",
  //           imageUrl: "",
  //           isCorrect: false,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Anaconda",
  //           imageUrl: "",
  //           isCorrect: false,
  //           countOfResponses: 0,
  //         },
  //       ],

  //       questionAttemptCorrect: 0,
  //       questionAttemptFail: 0,
  //       get questionAttempted() {
  //         return this.questionAttemptCorrect + this.questionAttemptFail;
  //       },
  //       timer: 0,
  //     },
  //   ],
  // },
  // {
  //   quizName: "Quiz 2",
  //   questionType: "Poll",
  //   quizAttempt: 0,
  //   questions: [
  //     {
  //       question: "What is the biggest land creature in the world?",
  //       optionType: ["text", "imageUrl", "textAndImageUrl"],
  //       options: [
  //         {
  //           optionText: "Elephant",
  //           imageUrl: "",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Giraffe",
  //           imageUrl: "",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Dinosaur",
  //           imageUrl: "",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Camel",
  //           imageUrl: "",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //       ],

  //       questionAttemptCorrect: 0,
  //       questionAttemptFail: 0,
  //       get questionAttempted() {
  //         return this.questionAttemptCorrect + this.questionAttemptFail;
  //       },
  //       timer: 0,
  //     },
  //     {
  //       question: "What is the biggest land creature in the world?",
  //       optionType: ["text", "imageUrl", "textAndImageUrl"],
  //       options: [
  //         {
  //           optionText: "Elephant",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Giraffe",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Dinosaur",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Camel",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //       ],

  //       questionAttemptCorrect: 0,
  //       questionAttemptFail: 0,
  //       get questionAttempted() {
  //         return this.questionAttemptCorrect + this.questionAttemptFail;
  //       },
  //       timer: 0,
  //     },
  //     {
  //       question: "What is the biggest land creature in the world?",
  //       optionType: ["text", "imageUrl", "textAndImageUrl"],
  //       options: [
  //         {
  //           optionText: "Elephant",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Giraffe",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Dinosaur",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Camel",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //       ],

  //       questionAttemptCorrect: 0,
  //       questionAttemptFail: 0,
  //       get questionAttempted() {
  //         return this.questionAttemptCorrect + this.questionAttemptFail;
  //       },
  //       timer: 0,
  //     },
  //     {
  //       question: "What is the biggest land creature in the world?",
  //       optionType: ["text", "imageUrl", "textAndImageUrl"],
  //       options: [
  //         {
  //           optionText: "Elephant",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Giraffe",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Dinosaur",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //         {
  //           optionText: "Camel",
  //           isCorrect: null,
  //           countOfResponses: 0,
  //         },
  //       ],

  //       questionAttemptCorrect: 0,
  //       questionAttemptFail: 0,
  //       get questionAttempted() {
  //         return this.questionAttemptCorrect + this.questionAttemptFail;
  //       },
  //       timer: 0,
  //     },
  //   ],
  // },
  const [openCreateQuizTypeModal, setOpenCreateQuizTypeModal] = useState(false);

  // console.log(quizs);

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
