import { useState } from "react";
import "./index.css";

export default function Dashboard() {
  const [temp, setTemp] = useState([1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 5]);

  return (
    <div className='dashboard-section'>
      <div className='dashboards'>
        <div>0 Quizz Created</div>
        <div>0 Quizz Created</div>
        <div>0 Quizz Created</div>
      </div>
      <div className='quizs'>
        <div id='quizs-section-heading'>Trending Quizs</div>
        <div className='display-quizs'>
          {temp.map((quiz, index) => {
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
