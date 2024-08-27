import { useState } from "react";
import { createQuizAPI } from "../../../../services/services.api.quizs";
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
}) {
  const [questionNumbers, setQuestionNumbers] = useState(["1"]);
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      optionType: "",
      optionTypeRadioChecked: {
        textType: false,
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
  console.log(questions, "questions");

  const [selectedQustionNumber, setSelectedQustionNumber] = useState(1);

  const handleCreateQuiz = async () => {
    setCreateQuiz(prev => ({ ...prev, questions: questions }));
    // setQuestions([
    //   {
    //     questionText: "",
    //     optionType: "",
    //     optionTypeRadioChecked: {
    //       textType: false,
    //       imageType: false,
    //       textAndImageType: false,
    //     },
    //     options: [
    //       {
    //         optionText: "",
    //         imageUrl: "",
    //         isCorrect: false,
    //       },
    //       {
    //         optionText: "",
    //         imageUrl: "",
    //         isCorrect: false,
    //       },
    //       {
    //         optionText: "",
    //         imageUrl: "",
    //         isCorrect: false,
    //       },
    //     ],
    //     timer: null,
    //   },
    // ]);

    //sending data to the server
    const backendData = await createQuizAPI({
      ...createQuiz,
      questions: questions,
    });

    if (backendData.status === 201) {
      setQuizLink(
        "http://localhost:5173/live-quiz/" + `${backendData.data.quizId}`
      );
      //resetting createQuiz form
      setCreateQuiz({});

      setOpenCreateQAndAModal(false);
      setOpenQuizLinkModal(true);
    }
    // console.log(createQuiz, questions, "createQuiz");
  };

  const handleSelection = question => {
    console.log("HandleSelection");

    if (question == "+") {
      const nextNumber = (
        Number(questionNumbers[questionNumbers.length - 1]) + 1
      ).toString();
      setQuestionNumbers(prev => [...prev, nextNumber]);
      setQuestions(prev => [
        ...prev,
        {
          questionText: "",
          optionType: "",
          optionTypeRadioChecked: {
            textType: false,
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
    } else {
      setSelectedQustionNumber(Number(question));
    }
  };

  const handleQuestionDeletion = index => {
    console.log("handleDeletion");

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
        className='QandA-modal'
        isOpen={openCreateQAndAModal}
        onRequestClose={() => setOpenCreateQAndAModal(false)}
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
          {questionNumbers.length < 5 && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleSelection("+")}
            >
              <img src={addIcon} alt='addIcon' />
            </div>
          )}
        </div>
        {questions && (
          <QAndAType
            selectedQustionNumber={selectedQustionNumber - 1}
            question={questions[selectedQustionNumber - 1]}
            setQuestions={setQuestions}
          />
        )}
        <div className='modal-buttons'>
          <button onClick={() => setOpenCreateQAndAModal(false)}>Cancel</button>
          <button onClick={handleCreateQuiz}>Create Quiz</button>
        </div>
      </Modal>
    </div>
  );
}
