import Modal from "react-modal";
import { useState } from "react";
import QAndAType from "./form";
import x from "../../../../assets/img/charm_cross.png";
import "../index.css";

export default function CreateQAndAQuestion({
  openCreateQAndAModal,
  setOpenCreateQAndAModal,
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
      ],
      timer: null,
    },
  ]);
  console.log(questions, "questions");

  const [selectedQustionNumber, setSelectedQustionNumber] = useState(1);

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
        <div className='QandA-question-numbers'>
          {questionNumbers.map((question, index) => {
            return (
              <>
                <div onClick={() => handleSelection(question)}>{question}</div>
                {questions.length > 1 && (
                  <img
                    src={x}
                    alt='crossButton'
                    onClick={() => handleQuestionDeletion(index)}
                  />
                )}
              </>
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
