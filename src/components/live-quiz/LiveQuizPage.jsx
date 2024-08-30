import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { liveQuiz, checkLiveQuiz } from "../../services/liveQuiz.service";
import LiveQuestion from "./live-question/LiveQuestion";
import ThanksPage from "./live-question/ThanksPage";
import "./LiveQuizPage.css";

export default function LiveQuizPage() {
  //   const [searchParams] = useSearchParams();
  const [quiz, setQuiz] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isCorrectlyChosen, setIsCorrectlyChosen] = useState(false);

  //   const quizId = searchParams.get("quizId");
  const { quizId } = useParams();

  useEffect(() => {
    const getLiveQuiz = async () => {
      const Quiz = await liveQuiz(quizId);
      setQuiz(Quiz);
    };

    getLiveQuiz();
  }, [quizId]);

  const handleNextClick = async () => {
    if (currentPage < quiz.questions.length) {
      setCurrentPage(currentPage + 1);
    }
    await checkLiveQuiz(
      quizId,
      quiz.questions[currentPage]._id,
      isCorrectlyChosen
    );
    setIsCorrectlyChosen(false);
  };

  return (
    <div className='live-quiz-Page'>
      {currentPage < quiz.questions?.length ? (
        <LiveQuestion
          question={quiz.questions[currentPage]}
          currentPage={currentPage}
          totalPage={quiz.questions.length}
          setIsCorrectlyChosen={setIsCorrectlyChosen}
        />
      ) : (
        <ThanksPage />
      )}
      {currentPage < quiz.questions?.length && (
        <div className='live-quiz-next-button'>
          <button onClick={handleNextClick}>
            {currentPage == quiz.questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
