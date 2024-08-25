import Modal from "react-modal";
import { useState } from "react";
import QAndAType from "./qAndAType";
import "./index.css";

export function CreateQuizType({
  openCreateQuizTypeModal,
  setOpenCreateQuizTypeModal,
  setOpenCreateQAndAModal,
  setOpenCreatePollModal,
}) {
  // const [quizType, setQuizType] = useState("");
  const [createQuizTypeAndName, setCreateQuizTypeAndName] = useState({
    quizName: "",
    quizType: "",
  });
  // console.log(createQuizTypeAndName.quizName, createQuizTypeAndName.quizType);

  const handleInput = e => {
    if (typeof e === "string") {
      // document.getElementById(e).style.cssText = `
      //   background-color: #60b84b; color: white;
      // `;
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
        // console.log("Q&A");
        setOpenCreateQAndAModal(true);
      } else if (createQuizTypeAndName.quizType == "Poll") {
        // console.log("Poll");
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

export function CreateQAndAQuestion({
  openCreateQAndAModal,
  setOpenCreateQAndAModal,
}) {
  const [questionNumbers, setQuestionNumber] = useState(["1", "2", "+"]);
  const [questions, setQuestions] = useState([
    {
      questionText: "",
    },
  ]);
  console.log(questions);
  const [selectedQustionNumber, setSelectedQustionNumber] = useState(1);

  const handleSelection = question => {
    if (question == "+") {
      return;
    } else {
      setSelectedQustionNumber(Number(question));
    }
    // } else if (Number(question) == 1) {
    // setSelectedQustionNumber(Number(question));
    // } else if (Number(question) >= 2) {
    //   setSelectedQustionNumber(Number(question));
    //   setQuestions(prev => [...prev, { questionText: "" }]);
    // }
  };

  return (
    <div>
      <Modal
        className='QandA-modal'
        isOpen={openCreateQAndAModal}
        onRequestClose={() => setOpenCreateQAndAModal(false)}
        ariaHideApp={false}
      >
        <div className='QandA-question-numbers'>
          {questionNumbers.map((question, index) => {
            return (
              <div key={index} onClick={() => handleSelection(question)}>
                {question}
              </div>
            );
          })}
        </div>
        <QAndAType
          selectedQustionNumber={selectedQustionNumber - 1}
          question={questions[selectedQustionNumber - 1]}
          setQuestions={setQuestions}
        />
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

export function QuizLinkModal({ openQuizLinkModal, setOpenQuizLinkModal }) {
  return (
    <Modal
      className='quiz-link-modal'
      isOpen={openQuizLinkModal}
      onRequestClose={() => setOpenQuizLinkModal(false)}
      ariaHideApp={false}
    >
      Quiz LInk
    </Modal>
  );
}
