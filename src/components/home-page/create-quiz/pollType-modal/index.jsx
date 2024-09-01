import { useState, useEffect } from "react";
import {
  createQuizAPI,
  editQuizAPI,
} from "../../../../services/services.api.quizs";
import Modal from "react-modal";
import PollType from "./form";
import x from "../../../../assets/img/charm_cross.png";
import addIcon from "../../../../assets/img/question_add_button.png";
import "../index.css";

export default function CreatePollQuestion({
  openCreatePollModal,
  setOpenCreatePollModal,
  createQuiz,
  setCreateQuiz,
  setOpenQuizLinkModal,
  setQuizLink,
  isEditPollMode,
  setIsEditPollMode,
  quizs,
  setRefresh,
}) {
  const [questionNumbers, setQuestionNumbers] = useState(["1"]);
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      optionType: "text",
      optionTypeRadioChecked: {
        textType: true,
        imageType: false,
        textAndImageType: false,
      },
      options: [
        {
          optionText: "",
          imageUrl: "",
          isCorrect: false,
        },
        {
          optionText: "",
          imageUrl: "",
          isCorrect: false,
        },
        {
          optionText: "",
          imageUrl: "",
          isCorrect: false,
        },
      ],
      timer: null,
    },
  ]);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const addSerialNumbers = upTo => {
      const currentLength = questionNumbers.length;
      const newNumbers = [];
      for (let i = currentLength + 1; i <= upTo; i++) {
        newNumbers.push(i.toString());
      }
      return [...questionNumbers, ...newNumbers];
    };

    if (quizs) {
      setQuestions(quizs.questions);
      setQuestionNumbers(addSerialNumbers(quizs.questions.length));
    }
  }, [quizs]);

  const [selectedQustionNumber, setSelectedQustionNumber] = useState(1);

  const handleCreateQuiz = async () => {
    setOpenCreatePollModal(false);
    await setCreateQuiz(prev => ({ ...prev, questions: questions }));

    //sending data to the server
    const backendData = await createQuizAPI({
      ...createQuiz,
      questions: questions,
    });

    if (backendData.status === 201) {
      setRefresh(prev => !prev);
      setQuizLink(
        "http://localhost:5173/live-quiz/" + `${backendData.data.quizId}`
      );
      //resetting createQuiz form
      setCreateQuiz({});
      setOpenQuizLinkModal(true);
    }
  };

  const handleUpdateQuiz = async () => {
    const response = await editQuizAPI(quizs._id, questions);
    if (response.status === 200) {
      setRefresh(prev => !prev);
      setIsEditPollMode(false);
    }
  };

  const handleSelection = question => {
    if (question == "+") {
      const nextNumber = (
        Number(questionNumbers[questionNumbers.length - 1]) + 1
      ).toString();
      setQuestionNumbers(prev => [...prev, nextNumber]);
      setQuestions(prev => [
        ...prev,
        {
          questionText: "",
          optionType: "text",
          optionTypeRadioChecked: {
            textType: true,
            imageType: false,
            textAndImageType: false,
          },
          options: [
            {
              optionText: "",
              imageUrl: "",
              isCorrect: false,
            },
            {
              optionText: "",
              imageUrl: "",
              isCorrect: false,
            },
            {
              optionText: "",
              imageUrl: "",
              isCorrect: false,
            },
          ],
          timer: null,
        },
      ]);
      setSelectedQustionNumber(prev => prev + 1);
    } else {
      setSelectedQustionNumber(Number(question));
    }
  };

  const handleQuestionDeletion = index => {
    setQuestions(prev => prev.filter((_, i) => i !== index));

    const newNumbers = [...questionNumbers];
    newNumbers.splice(index, 1);
    const reorderedNumbers = newNumbers.map((_, i) => (i + 1).toString());
    setQuestionNumbers(reorderedNumbers);

    setSelectedQustionNumber(index == 0 ? 1 : index);
  };

  return (
    <div>
      <Modal
        className='QandA-poll-modal'
        isOpen={isEditPollMode ? isEditPollMode : openCreatePollModal}
        onRequestClose={() => {
          if (isEditPollMode) {
            setIsEditPollMode(false);
          } else {
            setOpenCreatePollModal(false);
          }
        }}
        ariaHideApp={false}
      >
        <div className='question-numbers'>
          {questionNumbers.map((question, index) => {
            return (
              <div
                style={{ display: "flex", position: "relative" }}
                key={index}
              >
                <div
                  className='question-number'
                  onClick={() => handleSelection(question)}
                >
                  {question}
                </div>
                {questions.length > 1 && (
                  <div className='cross-icon'>
                    <img
                      src={x}
                      alt='crossButton'
                      onClick={() => handleQuestionDeletion(index)}
                    />
                  </div>
                )}
              </div>
            );
          })}
          {questionNumbers.length < 5 && !isEditPollMode && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleSelection("+")}
            >
              <img src={addIcon} alt='addIcon' />
            </div>
          )}
        </div>
        {questions?.length > 0 && (
          <PollType
            selectedQustionNumber={selectedQustionNumber - 1}
            question={questions[selectedQustionNumber - 1]}
            setQuestions={setQuestions}
            createQuiz={createQuiz}
            isEditPollMode={isEditPollMode}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
            questions={questions}
          />
        )}
        <div className='modal-buttons'>
          <button
            onClick={() => {
              if (isEditPollMode) {
                setIsEditPollMode(false);
              } else {
                setOpenCreatePollModal(false);
                setCreateQuiz({});
              }
            }}
          >
            Cancel
          </button>
          <button
            onClick={isEditPollMode ? handleUpdateQuiz : handleCreateQuiz}
            disabled={isDisabled}
            style={
              !isDisabled
                ? { backgroundColor: "#60b84b", color: "white" }
                : null
            }
          >
            {isEditPollMode ? "Update Quiz" : "Create Quiz"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
