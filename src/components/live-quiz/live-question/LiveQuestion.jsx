export default function LiveQuestion({
  question,
  currentPage,
  totalPage,
  setIsCorrectlyChosen,
  quizType,
  timeLeft,
}) {
  const handleCheckAnswer = option => {
    quizType === "Q&A"
      ? setIsCorrectlyChosen(option.isCorrect)
      : setIsCorrectlyChosen(option._id);
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
        <div id='timer'>{timeLeft}</div>
      </div>
      <div id='question-text'>{question.questionText}</div>
      <div className='live-quiz-options'>
        {question.options.map((option, index) => {
          return (
            <div onClick={() => handleCheckAnswer(option)} key={index}>
              <div style={setOptionTextVisiblty()} className='option-text'>
                {option.optionText}
              </div>
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
