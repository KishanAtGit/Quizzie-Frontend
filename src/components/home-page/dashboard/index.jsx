import "./index.css";

export default function Dashboard({ tempEntry }) {
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
          {tempEntry.map((quiz, index) => {
            return (
              <div className='quiz' key={index}>
                {quiz}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
