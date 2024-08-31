import Modal from "react-modal";
import "../index.css";

export default function CreateQuizType({
  openCreateQuizTypeModal,
  setOpenCreateQuizTypeModal,
  setOpenCreateQAndAModal,
  setOpenCreatePollModal,
  createQuiz,
  setCreateQuiz,
}) {
  //for quizType selecton div
  const quizTypeDivStyleForQandA = () => {
    if (createQuiz.quizType === "Q&A") {
      return { backgroundColor: "#60b84b", color: "white" };
    }
  };
  const quizTypeDivStyleForPoll = () => {
    if (createQuiz.quizType === "Poll") {
      return { backgroundColor: "#60b84b", color: "white" };
    }
  };

  const handleInput = e => {
    //for quiz type update
    if (typeof e === "string") {
      setCreateQuiz(prev => {
        return { ...prev, quizType: e };
      });
    } else {
      //for QuizName input
      setCreateQuiz(prev => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleSubmit = () => {
    if (createQuiz.quizName !== "" && createQuiz.quizType !== "") {
      if (createQuiz.quizType == "Q&A") {
        setOpenCreateQAndAModal(true);
      } else if (createQuiz.quizType == "Poll") {
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
        onRequestClose={() => {
          setOpenCreateQuizTypeModal(false);
          setCreateQuiz({}); //resetting createQuiz form
        }}
        ariaHideApp={false}
      >
        <div id='modal-quiz-name'>
          <input
            id='quizName'
            type='text'
            placeholder='Quiz Name'
            value={createQuiz.quizName}
            onChange={e => handleInput(e)}
          />
        </div>
        <div className='modal-quiz-type'>
          <span>Quiz Type</span>
          <span
            style={quizTypeDivStyleForQandA()}
            onClick={() => handleInput("Q&A")}
          >
            Q & A
          </span>
          <span
            style={quizTypeDivStyleForPoll()}
            onClick={() => handleInput("Poll")}
          >
            Poll Type
          </span>
        </div>
        <div className='modal-buttons'>
          <button
            onClick={() => {
              setOpenCreateQuizTypeModal(false); //resetting createQuiz form
              setCreateQuiz({});
            }}
          >
            Cancel
          </button>
          <button onClick={handleSubmit}>Continue</button>
        </div>
      </Modal>
    </div>
  );
}
