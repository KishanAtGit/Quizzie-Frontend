import "./index.css";

export default function QuestionWiseAnalysis({ quiz }) {
  console.log(quiz.questions);

  return (
    <div className='question-wise-analysis'>
      <div id='question-wise-analysis-heading'>Quiz 2 Question Analysis</div>
      <div className='quiz-creation'>
        <span>Created on : 04 Sep, 2023</span>
        <span>Impressions : 667</span>
      </div>
      <div className='questions'>
        {quiz.questions.map((question, index) => {
          return (
            <div key={index} className='question'>
              <div className='question-name'>
                Q.{index + 1} {question.question}
              </div>
              <div className='question-analysis'>
                <div>
                  <span className='responses'>{question.attempt}</span>
                  <span>people Attempted the question</span>
                </div>
                <div>
                  <span className='responses'>{question.correctAnswer}</span>
                  <span>people Answered Correctly</span>
                </div>
                <div>
                  <span className='responses'>{question.incorrectAnswer}</span>
                  <span>people Answered Incorrectly</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
