import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LiveQuestion from "./live-question/LiveQuestion";
import "./LiveQuizPage.css";

export default function LiveQuizPage() {
  //   const [searchParams] = useSearchParams();
  const [quiz, setQuiz] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  //   const quizId = searchParams.get("quizId");
  const { quizId } = useParams();

  useEffect(() => {
    const liveQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/live-quiz/${quizId}`
        );
        console.log(response.data.quiz);
        setQuiz(response.data.quiz);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    quizId && liveQuiz();
    // console.log(quiz.questions);
  }, [quizId]);
  console.log(quiz, "quiz");

  const handleNextClick = () => {
    if (currentPage < quiz.questions.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='live-quiz-Page'>
      {/* {quiz.questions?.length > 0 && (
        <div className='live-quiz-questions'>
          <div>{quiz.questions[currentPage].questionText}</div>
        </div>
      )} */}
      {quiz.questions?.length > 0 && (
        <LiveQuestion
          question={quiz.questions[currentPage]}
          quizType={quiz.quizType}
          currentPage={currentPage}
          totalPage={quiz.questions.length}
        />
      )}
      <div className='live-quiz-next-button'>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
}
