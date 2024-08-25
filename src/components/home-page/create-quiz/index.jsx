import Modal from "react-modal";
import { useState } from "react";
import QAndAType from "./qAndAType";
import x from "../../../assets/img/charm_cross.png";
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
  const [questionNumbers, setQuestionNumbers] = useState(["1"]);
  const [questions, setQuestions] = useState([
    {
      questionText: "",
    },
  ]);
  console.log(questions);
  const [selectedQustionNumber, setSelectedQustionNumber] = useState(1);

  const handleSelection = question => {
    console.log(question, "question");

    if (question == "+") {
      const nextNumber = (
        Number(questionNumbers[questionNumbers.length - 1]) + 1
      ).toString();
      setQuestionNumbers(prev => [...prev, nextNumber]);
      setQuestions(prev => [...prev, { questionText: "" }]);
    } else {
      setSelectedQustionNumber(Number(question));
    }
  };

  const handleQuestionDeletion = index => {
    setQuestions(prev => prev.filter((_, i) => i !== index));

    const newNumbers = [...questionNumbers];
    newNumbers.splice(index, 1);
    console.log("Array after removal:", newNumbers);
    // Reorder question numbers
    const reorderedNumbers = newNumbers.map((_, i) => (i + 1).toString());
    // Update the state with the new array of question numbers
    setQuestionNumbers(reorderedNumbers);
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
                <img
                  src={x}
                  alt='crossButton'
                  onClick={() => handleQuestionDeletion(index)}
                />
              </div>
            );
          })}
          {questionNumbers.length < 5 && (
            <div onClick={() => handleSelection("+")}>+</div>
          )}
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
