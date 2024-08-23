import Modal from "react-modal";
import "./index.css";
import { useState } from "react";

export function CreateQuizType({
  openCreateQuizTypeModal,
  setOpenCreateQuizTypeModal,
  setOpenCreateQAndAModal,
  setOpenCreatePollModal,
}) {
  // const [quizType, setQuizType] = useState("");
  const [createQuizTypeAndName, setCreateQuizTypeAndName] = useState({
    quizName: "",
    QuizType: "",
  });

  const handleInput = e => {
    if (typeof e === String) {
      console.log(e);

      setCreateQuizTypeAndName(prev => {
        return { ...prev, quizType: e };
      });
    } else if (typeof e == {}) {
      console.log(e);
      setCreateQuizTypeAndName(prev => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const handleSubmit = () => {
    if (createQuizTypeAndName.QuizTypecrea == "Q&A") {
      setOpenCreateQAndAModal(true);
    } else if (createQuizTypeAndName.QuizType == "Poll") {
      setOpenCreatePollModal(true);
    }
    setOpenCreateQuizTypeModal(false);
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
            type='text'
            value={createQuizTypeAndName.quizName}
            placeholder='Quiz Name'
            onChange={e => handleInput(e)}
          />
        </div>
        <div className='modal-quiz-type'>
          <span>Quiz Type</span>
          <span onClick={() => handleInput("Q&A")}>Q & A</span>
          <span onClick={() => handleInput("Poll")}>Poll Type</span>
        </div>
        <div className='modal-buttons'>
          <button>Cancel</button>
          <button onClick={handleSubmit}>Continue</button>
        </div>
      </Modal>
    </div>
  );
}

export function CreateQAndAQuestion({
  openCreateQAndAModal,
  setOpenCreateQAndAModal,
}) {
  return (
    <div>
      <Modal
        className='modal'
        isOpen={openCreateQAndAModal}
        onRequestClose={() => setOpenCreateQAndAModal(false)}
        ariaHideApp={false}
      >
        CreateQAndAQuestion
      </Modal>
    </div>
  );
}

export function CreatePollQuestion({
  openCreatePollModal,
  setOpenCreatePollModal,
}) {
  return (
    <div>
      <Modal
        className='modal'
        isOpen={openCreatePollModal}
        onRequestClose={() => setOpenCreatePollModal(false)}
        ariaHideApp={false}
      >
        CreatePollQuestion
      </Modal>
    </div>
  );
}
