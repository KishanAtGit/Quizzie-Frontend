import cupImage from "../../../assets/img/thanksImage.png";

import "../LiveQuizPage.css";

export default function ThanksPage({ score, totalPage, quizType }) {
  return (
    <>
      {quizType == "Q&A" ? (
        <div className='result-page-QnA'>
          <div id='result-page-heading'>Congrats Quiz is completed</div>
          <div className='cup-image'>
            <img src={cupImage} alt='cup-image' />
          </div>
          <div className='score-text'>
            Your Score is{" "}
            <span id='score'>
              0{score}/0{totalPage}
            </span>
          </div>
        </div>
      ) : (
        <div className='result-page-poll'>
          Thank you for participating in the Poll
        </div>
      )}
    </>
  );
}
