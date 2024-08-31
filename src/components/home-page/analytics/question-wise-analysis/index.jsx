import "./index.css";

export default function QuestionWiseAnalysis({ quiz }) {
  console.log(quiz);

  return (
    <div className='question-wise-analysis'>
      <div id='question-wise-analysis-heading'>
        {quiz.quizName} Question Analysis
      </div>
      <div className='quiz-creation'>
        <span>Created on : {quiz.createdOn}</span>
        <span>Impressions : {quiz.quizImpression}</span>
      </div>
      <div className='questions'>
        {quiz.quizType == "Q&A"
          ? quiz.questions.map((question, index) => {
              return (
                <div key={index} className='question'>
                  <div className='question-name'>
                    Q.{index + 1} {question.questionText}
                  </div>
                  <div className='question-analysis'>
                    <div>
                      <span className='responses'>
                        {question.totalPeopleAttempted || 0}
                      </span>
                      <span>people Attempted the question</span>
                    </div>
                    <div>
                      <span className='responses'>
                        {question.peopleAttemptedCorrectly || 0}
                      </span>
                      <span>people Answered Correctly</span>
                    </div>
                    <div>
                      <span className='responses'>
                        {Number(question.totalPeopleAttempted || 0) -
                          Number(question.peopleAttemptedCorrectly) || 0}
                      </span>
                      <span>people Answered Incorrectly</span>
                    </div>
                  </div>
                </div>
              );
            })
          : quiz.questions.map((question, index) => {
              return (
                <div key={index} className='question'>
                  <div className='question-name'>
                    Q.{index + 1} {question.questionText}
                  </div>
                  <div className='question-analysis question-analysis-poll'>
                    {question.options.map((option, index) => {
                      return (
                        <div key={index}>
                          <span className='responses'>
                            {option.timesChosen || 0}
                          </span>
                          <span>{option.optionText}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
