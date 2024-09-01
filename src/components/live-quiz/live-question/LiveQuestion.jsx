export default function LiveQuestion({
  question,
  currentPage,
  totalPage,
  setIsCorrectlyChosen,
  quizType,
  timeLeft,
  selectedOption,
  setSelectedOption,
}) {
  const handleCheckAnswer = (option, index) => {
    setSelectedOption(index);
    if (quizType === "Q&A") {
      setIsCorrectlyChosen(option.isCorrect);
    } else setIsCorrectlyChosen(option._id);
  };

  const setOptionTextVisiblty = () => {
    if (question.optionType !== "text") {
      return { display: "none" };
    }
  };
  const setOptionImageUrlVisiblty = () => {
    if (question.optionType !== "imageUrl") {
      return { display: "none" };
    }
  };

  const setOptionImageTextVisisbilty = () => {
    if (question.optionType !== "textAndImageUrl") {
      return { display: "none" };
    }
  };

  return (
    <div className='live-quiz-questions'>
      <div className='page-headers'>
        <div id='question-numbers'>
          0{currentPage + 1}/0{totalPage}
        </div>
        {question.timer > 0 && (
          <div id='timer'>{`00:${
            timeLeft == 10 ? timeLeft : "0" + timeLeft
          }s`}</div>
        )}
      </div>
      <div id='question-text'>{question.questionText}</div>
      <div className='live-quiz-options'>
        {question.options.map((option, index) => {
          return (
            <div
              className={`${selectedOption === index ? "option-active" : ""}`}
              onClick={() => handleCheckAnswer(option, index)}
              key={index}
            >
              {option.optionText !== "" && (
                <div style={setOptionTextVisiblty()} className='option-text'>
                  {option.optionText}
                </div>
              )}
              <img
                style={setOptionImageUrlVisiblty()}
                className='option-images'
                src={option.imageUrl}
                alt='demoImage'
              />
              <div
                style={setOptionImageTextVisisbilty()}
                className='option-text-images'
              >
                <span>{option.optionText}</span>
                <span>
                  <img src={option.imageUrl} alt='demoImage' />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
