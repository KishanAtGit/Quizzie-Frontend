import Modal from "react-modal";
import { useState } from "react";
import "../index.css";

export default function CreateQuizType({
  openCreateQuizTypeModal,
  setOpenCreateQuizTypeModal,
  setOpenCreateQAndAModal,
  setOpenCreatePollModal,
  createQuizTypeAndName,
  setCreateQuizTypeAndName,
}) {
  const handleInput = e => {
    if (typeof e === "string") {
      setCreateQuizTypeAndName(prev => {
        return { ...prev, quizType: e };
      });
    } else {
      setCreateQuizTypeAndName(prev => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleSubmit = () => {
    if (createQuizTypeAndName.quizType !== "") {
      if (createQuizTypeAndName.quizType == "Q&A") {
        setOpenCreateQAndAModal(true);
      } else if (createQuizTypeAndName.quizType == "Poll") {
        setOpenCreatePollModal(true);
      }
      setOpenCreateQuizTypeModal(false);
    }
  };

  return (
    <div>
      <Modal
        className='modal'
        isOpen={openCreateQuizTypeModal}
        onRequestClose={() => setOpenCreateQuizTypeModal(false)}
        ariaHideApp={false}
      >
        <div id='modal-quiz-name'>
          <input
            id='quizName'
            type='text'
            placeholder='Quiz Name'
            value={createQuizTypeAndName.quizName}
            onChange={e => handleInput(e)}
          />
        </div>
        <div className='modal-quiz-type'>
          <span>Quiz Type</span>
          <span onClick={() => handleInput("Q&A")}>Q & A</span>
          <span onClick={() => handleInput("Poll")}>Poll Type</span>
        </div>
        <div className='modal-buttons'>
          <button onClick={() => setOpenCreateQuizTypeModal(false)}>
            Cancel
          </button>
          <button onClick={handleSubmit}>Continue</button>
        </div>
      </Modal>
    </div>
  );
}
