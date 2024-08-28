import { useNavigate } from "react-router-dom";
import editIcon from "../../../assets/img/uil_edit.png";
import deleteIcon from "../../../assets/img/material-symbols_delete.png";
import shareIcon from "../../../assets/img/material-symbols_share.png";
import "./index.css";
import { useState } from "react";
import QuizDeleteModal from "./quiz-delete-modal/QuizDeleteModal";

export default function Analytics({ quizs, setSelectedQuiz }) {
  const navigate = useNavigate();

  const [quizdeleteModal, setQuizDeleteModal] = useState(false);

  const handleQuizSelection = index => {
    setSelectedQuiz(index);
    navigate("/home-page/question-wise-analysis");
  };

  return (
    <div className='analytics-page'>
      <div id='analytics-section-heading'>Quiz Analysis</div>
      <div className='analytics-container'>
        <div className='analytics-section'>
          <div className='analytics-heading analytics-group'>
            <div className='s-no'>S.No</div>
            <div className='quiz-name'>Quiz Name</div>
            <div className='created-on'>Create on</div>
            <div className='impression'>Impression</div>
          </div>
          {quizs.map((quiz, index) => {
            return (
              <div key={index} className='analytics-group'>
                <div className='s-no'>{index + 1}</div>
                <div className='quiz-name'>{quiz.quizName}</div>
                <div className='created-on'>{quiz.createdOn}</div>
                <div className='impression'>{quiz.quizImpression}</div>
                <div className='icons'>
                  <a href='#'>
                    <img src={editIcon} alt='editIcon' />
                  </a>
                  <a href='#'>
                    <img
                      onClick={() => setQuizDeleteModal(true)}
                      src={deleteIcon}
                      alt='deleteIcon'
                    />
                  </a>
                  <a href='#'>
                    <img src={shareIcon} alt='shareIcon' />
                  </a>
                </div>
                <div
                  className='question-hyperlink'
                  onClick={() => handleQuizSelection(index)}
                >
                  <a href='#'>Question Wise Analysis</a>
                </div>
                {quizdeleteModal && (
                  <QuizDeleteModal
                    quizdeleteModal={quizdeleteModal}
                    setQuizDeleteModal={setQuizDeleteModal}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
