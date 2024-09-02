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
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const { quizId } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const getLiveQuiz = async () => {
      const Quiz = await liveQuiz(quizId);
      setQuiz(Quiz);
    };
    getLiveQuiz();
  }, [quizId]);

  const [isCorrectlyChosen, setIsCorrectlyChosen] = useState(
    quiz?.quizType === "Q&A" ? false : null
  );

  const handleNextClick = async isCorrectlyChosen => {
    if (isCorrectlyChosen) {
      setScore(score + 1);
    }

    await checkLiveQuiz(
      quizId,
      quiz.questions[currentPage]._id,
      isCorrectlyChosen
    );

    const nextQuestion = currentPage + 1;
    if (nextQuestion < quiz.questions.length) {
      setCurrentPage(nextQuestion);
    } else {
      setIsQuizFinished(true);
    }

    setSelectedOption(null);
  };

  console.log(score, "score");

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
          handleNextClick={handleNextClick}
          isCorrectlyChosen={isCorrectlyChosen}
          setIsCorrectlyChosen={setIsCorrectlyChosen}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      )}
      {currentPage < quiz.questions?.length && (
        <div className='live-quiz-next-button'>
          <button onClick={() => handleNextClick(isCorrectlyChosen)}>
            {currentPage == quiz.questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
