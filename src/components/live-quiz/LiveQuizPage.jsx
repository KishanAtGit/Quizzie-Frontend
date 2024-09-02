import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { liveQuiz, checkLiveQuiz } from "../../services/liveQuiz.service";
import LiveQuestion from "./live-question/LiveQuestion";
import ThanksPage from "./live-question/ThanksPage";
import "./LiveQuizPage.css";

export default function LiveQuizPage() {
  const [quiz, setQuiz] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  let [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const { quizId } = useParams();

  useEffect(() => {
    const getLiveQuiz = async () => {
      const Quiz = await liveQuiz(quizId);
      setQuiz(Quiz);
    };
    getLiveQuiz();
  }, [quizId]);

  const handleNextClick = () => {
    const nextQuestion = currentPage + 1;
    if (nextQuestion < quiz.questions.length) {
      setCurrentPage(nextQuestion);
    } else {
      setIsQuizFinished(true);
    }
  };

  console.log(score, "score");
  const handleAnswerSelection = async isCorrect => {
    console.log(isCorrect, "isCorrect");

    if (isCorrect) {
      setScore(score + 1);
    }
    await checkLiveQuiz(quizId, quiz.questions[currentPage]._id, isCorrect);
  };

  if (isQuizFinished) {
    return (
      <ThanksPage
        score={score}
        totalPage={quiz.questions.length}
        quizType={quiz.quizType}
      />
    );
  }

  return (
    <div className='live-quiz-Page'>
      {quiz.questions?.length > 0 && (
        <LiveQuestion
          question={quiz.questions[currentPage]}
          totalPage={quiz.questions.length}
          currentPage={currentPage}
          quizType={quiz.quizType}
          handleAnswerSelection={handleAnswerSelection}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          handleNextClick={handleNextClick}
        />
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
