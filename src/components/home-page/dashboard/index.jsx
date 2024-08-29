import "./index.css";

export default function Dashboard({ quizs }) {
  return (
    <div className='dashboard-page'>
      <div className='dashboards'>
        <div>0 Quizz Created</div>
        <div>0 Quizz Created</div>
        <div>0 Quizz Created</div>
      </div>
      <div className='quizs'>
        <div id='quizs-section-heading'>Trending Quizs</div>
        <div className='display-quizs'>
          {quizs.length > 0 &&
            quizs?.map((quiz, index) => {
              return (
                <div className='quiz' key={index}>
                  {quiz.quizName}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
