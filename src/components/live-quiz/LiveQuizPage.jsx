import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LiveQuestion from "./live-question/LiveQuestion";
import ThanksPage from "./live-question/ThanksPage";
import "./LiveQuizPage.css";

export default function LiveQuizPage() {
  //   const [searchParams] = useSearchParams();
  const [quiz, setQuiz] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [buttonText, setButtonText] = useState("Next");

  //   const quizId = searchParams.get("quizId");
  const { quizId } = useParams();

  useEffect(() => {
    const liveQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/live-quiz/${quizId}`
        );
        setQuiz(response.data.quiz);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    quizId && liveQuiz();
  }, [quizId]);

  const handleNextClick = () => {
    if (currentPage < quiz.questions.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='live-quiz-Page'>
      {currentPage < quiz.questions?.length ? (
        <LiveQuestion
          question={quiz.questions[currentPage]}
          quizType={quiz.quizType}
          currentPage={currentPage}
          totalPage={quiz.questions.length}
          setButtonText={setButtonText}
        />
      ) : (
        <ThanksPage />
      )}
      {currentPage < quiz.questions?.length && (
        <div className='live-quiz-next-button'>
          <button onClick={handleNextClick}>{buttonText}</button>
        </div>
      )}
    </div>
  );
}
