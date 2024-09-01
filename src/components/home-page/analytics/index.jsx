import { useNavigate } from "react-router-dom";
import editIcon from "../../../assets/img/uil_edit.png";
import deleteIcon from "../../../assets/img/material-symbols_delete.png";
import shareIcon from "../../../assets/img/material-symbols_share.png";
import { useState } from "react";
import { toast } from "react-toastify";
import QuizDeleteModal from "./quiz-delete-modal/QuizDeleteModal";
import CreateQAndAQuestion from "../create-quiz/qAndAType-modal/index.jsx";
import CreatePollQuestion from "../create-quiz/pollType-modal/index.jsx";
import emptyTrendingQuizs from "../../../assets/img/no_trending_quezes.png";
import "./index.css";

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

  const handleDeleteQuiz = quizId => {
    setSelectedQuizId(quizId);
    setQuizDeleteModal(true);
  };

  const handleQuizSelection = quiz => {
    setSelectedQuiz(quiz);
    navigate("/home-page/question-wise-analysis");
  };

  const notify = quizId => {
    toast.success("Link copied to Clipboard");
    navigator.clipboard.writeText(
      `${window.location.origin}/live-quiz/${quizId}`
    );
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
          {quizs.length > 0 ? (
            quizs.map((quiz, index) => {
              return (
                <div key={index} className='analytics-group'>
                  <div className='s-no'>{index + 1}</div>
                  <div className='quiz-name'>{quiz.quizName}</div>
                  <div className='created-on'>{quiz.createdOn}</div>
                  <div className='impression'>{quiz.quizImpression || 0}</div>
                  <div className='icons'>
                    <a onClick={() => handleEditQuiz(quiz.quizType, quiz._id)}>
                      <img src={editIcon} alt='editIcon' />
                    </a>
                    <a>
                      <img
                        onClick={() => handleDeleteQuiz(quiz._id)}
                        src={deleteIcon}
                        alt='deleteIcon'
                      />
                    </a>
                    <a>
                      <img
                        onClick={() => notify(quiz._id)}
                        src={shareIcon}
                        alt='shareIcon'
                      />
                    </a>
                  </div>
                  <div
                    className='question-hyperlink'
                    onClick={() => handleQuizSelection(quiz)}
                  >
                    <a>Question Wise Analysis</a>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='no-trending-quizes-image-analytics-page'>
              <img src={emptyTrendingQuizs} alt='no-trending-quizes-yet' />
            </div>
          )}
        </div>
      </div>
      {quizdeleteModal && (
        <QuizDeleteModal
          quizdeleteModal={quizdeleteModal}
          setQuizDeleteModal={setQuizDeleteModal}
          selectedQuizId={selectedQuizId}
          setRefresh={setRefresh}
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
