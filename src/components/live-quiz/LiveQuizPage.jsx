import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { liveQuiz, checkLiveQuiz } from "../../services/liveQuiz.service";
import LiveQuestion from "./live-question/LiveQuestion";
import ThanksPage from "./live-question/ThanksPage";
import "./LiveQuizPage.css";

export default function LiveQuizPage() {
  const [quiz, setQuiz] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isCorrectlyChosen, setIsCorrectlyChosen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  let [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const { quizId } = useParams();

  useEffect(() => {}, [score]);

  useEffect(() => {
    const getLiveQuiz = async () => {
      const Quiz = await liveQuiz(quizId);
      setQuiz(Quiz);

      if (Quiz?.questions[0]?.timer > 0) setTimeLeft(Quiz?.questions[0]?.timer);
    };

    getLiveQuiz();
  }, [quizId]);

  useEffect(() => {
    let interval;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    if (timeLeft === 0) {
      setIsCorrectlyChosen(false);
      handleNextClick();
    }

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleNextClick = async () => {
    setSelectedOption(null);
    if (isCorrectlyChosen) setScore(score + 1);
    if (currentPage < quiz.questions.length) {
      setCurrentPage(currentPage + 1);
      await checkLiveQuiz(
        quizId,
        quiz.questions[currentPage]._id,
        isCorrectlyChosen
      );
    }
    setIsCorrectlyChosen(false);
    setTimeLeft(quiz.questions[currentPage + 1]?.timer);
  };

  return (
    <div className='live-quiz-Page'>
      {currentPage < quiz.questions?.length ? (
        <LiveQuestion
          question={quiz.questions[currentPage]}
          currentPage={currentPage}
          totalPage={quiz.questions.length}
          setIsCorrectlyChosen={setIsCorrectlyChosen}
          quizType={quiz.quizType}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      ) : (
        currentPage == quiz.questions?.length && (
          <ThanksPage
            score={score}
            totalPage={quiz.questions.length}
            quizType={quiz.quizType}
          />
        )
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
