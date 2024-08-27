import demoImage from "../../../assets/img/demoImage.jpg";

export default function LiveQuestion({
  question,
  quizType,
  currentPage,
  totalPage,
}) {
  return (
    <div className='live-quiz-questions'>
      <div className='page-headers'>
        <div id='question-numbers'>
          0{currentPage + 1}/0{totalPage}
        </div>
        <div id='timer'>00:10s</div>
      </div>
      <div id='question-text'>{question.questionText}</div>
      <div className='options'>
        {question.options.map((option, index) => {
          return (
            <div key={index}>
              <div className='option-text'>{option.optionText}</div>
              <img
                className='option-images'
                src={option.imageUrl}
                alt='demoImage'
              />
              <div className='option-text-images'>
                <span>{option.optionText}</span>
                <span>
                  <img
                    className='option-images'
                    src={option.imageUrl}
                    alt='demoImage'
                  />
                </span>
              </div>
            </div>
          );
        })}

        {/* <div>
          <div className='option-text'>afad</div>
          <img className='option-images' src={demoImage} alt='demoImage' />
          <div className='option-text-images'>
            <span>afad</span>
            <span>
              <img className='option-images' src={demoImage} alt='demoImage' />
            </span>
          </div>
        </div>
        <div>
          <div className='option-text'>afad</div>
          <img className='option-images' src={demoImage} alt='demoImage' />
          <div className='option-text-images'>
            <span>afad</span>
            <span>
              <img className='option-images' src={demoImage} alt='demoImage' />
            </span>
          </div>
        </div>
        <div>
          <div className='option-text'>afad</div>
          <img className='option-images' src={demoImage} alt='demoImage' />
          <div className='option-text-images'>
            <span>afad</span>
            <span>
              <img className='option-images' src={demoImage} alt='demoImage' />
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
