import "./index.css";
import emptyTrendingQuizs from "../../../assets/img/no_trending_quezes.png";
import quizImpressionImage from "../../../assets/img/icon-park-outline_eyes.png";

export default function Dashboard({
  quizs,
  totalQuizs,
  totalQuestions,
  totalImpression,
}) {
  return (
    <div className='dashboard-page'>
      <div className='dashboards'>
        <div className='total-quizs'>
          <span>{totalQuizs || 0}</span>
          Quizz <br /> Created
        </div>
        <div className='total-questions'>
          <span>{totalQuestions || 0}</span> Questions <br /> Created
        </div>
        <div className='total-impressions'>
          <span>
            {`${
              (totalImpression || 0) >= 1000
                ? (totalImpression / 1000).toFixed(1) + "K"
                : totalImpression || 0
            }`}
          </span>
          Total <br /> Impressions
        </div>
      </div>
      <div className='quizs'>
        <div id='quizs-section-heading'>Trending Quizs</div>
        <div className='display-quizs'>
          {quizs.length > 0 ? (
            quizs?.map((quiz, index) => {
              return (
                <div className='quiz' key={index}>
                  <div>
                    <div>{quiz.quizName}</div>
                    <div>
                      <span>{quiz.quizImpression}</span>
                      <span>
                        <img src={quizImpressionImage} alt='quizImpression' />
                      </span>
                    </div>
                  </div>
                  <div>Created on: {quiz.createdOn}</div>
                </div>
              );
            })
          ) : (
            <div className='no-trending-quizes-image'>
              <img src={emptyTrendingQuizs} alt='no-trending-quizes-yet' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
