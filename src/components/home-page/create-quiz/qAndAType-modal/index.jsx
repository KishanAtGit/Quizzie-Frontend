import { useState, useEffect } from "react";
import {
  createQuizAPI,
  editQuizAPI,
} from "../../../../services/services.api.quizs";
import Modal from "react-modal";
import QAndAType from "./form";
import x from "../../../../assets/img/charm_cross.png";
import addIcon from "../../../../assets/img/question_add_button.png";
import "../index.css";

export default function CreateQAndAQuestion({
  openCreateQAndAModal,
  setOpenCreateQAndAModal,
  createQuiz,
  setCreateQuiz,
  setOpenQuizLinkModal,
  setQuizLink,
  isEditQandAMode,
  setIsEditQandAMode,
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
      console.log(quizs.questions, "useEffect");
    }
  }, [quizs]);

  const [selectedQustionNumber, setSelectedQustionNumber] = useState(1);

  const handleCreateQuiz = async () => {
    setCreateQuiz(prev => ({ ...prev, questions: questions }));

    //sending data to the server
    const backendData = await createQuizAPI({
      ...createQuiz,
      questions: questions,
    });

    if (backendData.status === 201) {
      setRefresh(prev => !prev);
      setQuizLink(
        `${window.location.origin}/live-quiz/${backendData.data.quizId}`
      );
      //resetting createQuiz form
      setCreateQuiz({});

      setOpenCreateQAndAModal(false);
      setOpenQuizLinkModal(true);
    }
  };

  const handleUpdateQuiz = async () => {
    const response = await editQuizAPI(quizs._id, questions);
    if (response.status === 200) {
      setRefresh(prev => !prev);
      setIsEditQandAMode(false);
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
      setSelectedQustionNumber(questionNumbers.length + 1);
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
        isOpen={isEditQandAMode ? isEditQandAMode : openCreateQAndAModal}
        onRequestClose={() => {
          if (isEditQandAMode) {
            setIsEditQandAMode(false);
          } else {
            setOpenCreateQAndAModal(false);
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
                {questions?.length > 1 && (
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
          {questionNumbers.length < 5 && !isEditQandAMode && (
            <div className='add-icon' onClick={() => handleSelection("+")}>
              <img src={addIcon} alt='addIcon' />
            </div>
          )}
        </div>
        {questions?.length > 0 && (
          <QAndAType
            selectedQustionNumber={selectedQustionNumber - 1}
            question={questions[selectedQustionNumber - 1]}
            setQuestions={setQuestions}
            isEditQandAMode={isEditQandAMode}
          />
        )}
        <div className='modal-buttons'>
          <button
            onClick={() => {
              if (isEditQandAMode) {
                setIsEditQandAMode(false);
              } else {
                setOpenCreateQAndAModal(false);
                setCreateQuiz({});
              }
            }}
          >
            Cancel
          </button>
          <button
            onClick={isEditQandAMode ? handleUpdateQuiz : handleCreateQuiz}
          >
            {isEditQandAMode ? "Update Quiz" : "Create Quiz"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
