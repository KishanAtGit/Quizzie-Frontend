import "./index.css";

export default function QuestionWiseAnalysis({ quiz }) {
  console.log(quiz);

  return (
    <div className='question-wise-analysis'>
      <div id='question-wise-analysis-heading'>
        {quiz.quizName} Question Analysis
      </div>
      <div className='quiz-creation'>
        <span>Created on : 04 Sep, 2023</span>
        <span>Impressions : 667</span>
      </div>
      <div className='questions'>
        {quiz.questionType == "Q&A"
          ? quiz.questions.map((question, index) => {
              return (
                <div key={index} className='question'>
                  <div className='question-name'>
                    Q.{index + 1} {question.question}
                  </div>
                  <div className='question-analysis'>
                    <div>
                      <span className='responses'>
                        {question.questionAttempted}
                      </span>
                      <span>people Attempted the question</span>
                    </div>
                    <div>
                      <span className='responses'>
                        {question.questionAttemptCorrect}
                      </span>
                      <span>people Answered Correctly</span>
                    </div>
                    <div>
                      <span className='responses'>
                        {question.questionAttemptFail}
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
                    Q.{index + 1} {question.question}
                  </div>
                  <div className='question-analysis question-analysis-poll'>
                    {question.options.map((option, index) => {
                      return (
                        <div key={index}>
                          <span className='responses'>
                            {option.countOfResponses}
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
