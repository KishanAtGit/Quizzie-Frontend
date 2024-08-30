import { useNavigate } from "react-router-dom";
import editIcon from "../../../assets/img/uil_edit.png";
import deleteIcon from "../../../assets/img/material-symbols_delete.png";
import shareIcon from "../../../assets/img/material-symbols_share.png";
import "./index.css";
import { useState } from "react";
import QuizDeleteModal from "./quiz-delete-modal/QuizDeleteModal";
import CreateQAndAQuestion from "../create-quiz/qAndAType-modal/index.jsx";
import CreatePollQuestion from "../create-quiz/pollType-modal/index.jsx";

export default function Analytics({ quizs, setRefresh, setSelectedQuiz }) {
  const navigate = useNavigate();

  const [quizdeleteModal, setQuizDeleteModal] = useState(false);
  const [isEditQandAMode, setIsEditQandAMode] = useState(false);
  const [isEditPollMode, setIsEditPollMode] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const handleEditQuiz = (quizType, quizId) => {
    if (quizType === "Q&A") {
      setIsEditQandAMode(true);
    } else if (quizType === "Poll") {
      setIsEditPollMode(true);
    }
    setSelectedQuizId(quizId);
  };

  const handleQuizSelection = quiz => {
    setSelectedQuiz(quiz);
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
                  <a
                    onClick={() => handleEditQuiz(quiz.quizType, quiz._id)}
                    href='#'
                  >
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
                  onClick={() => handleQuizSelection(quiz)}
                >
                  <a href='#'>Question Wise Analysis</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isEditQandAMode && (
        <QuizDeleteModal
          quizdeleteModal={quizdeleteModal}
          setQuizDeleteModal={setQuizDeleteModal}
        />
      )}
      {isEditQandAMode && (
        <CreateQAndAQuestion
          isEditQandAMode={isEditQandAMode}
          setIsEditQandAMode={setIsEditQandAMode}
          quizs={quizs.filter(quiz => quiz._id === selectedQuizId)[0]}
          setRefresh={setRefresh}
        />
      )}
      {isEditPollMode && (
        <CreatePollQuestion
          isEditPollMode={isEditPollMode}
          setIsEditPollMode={setIsEditPollMode}
          quizs={quizs.filter(quiz => quiz._id === selectedQuizId)[0]}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
}
