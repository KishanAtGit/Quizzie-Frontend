import { useState, useEffect } from "react";
import deleteIcon from "../../../../../assets/img/material-symbols_delete.png";

export default function QAndAType({
  question,
  setQuestions,
  selectedQustionNumber,
}) {
  const [formData, setFormData] = useState({
    questionText: "",
    optionType: "",
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
  });
  console.log(formData, "formData");

  const [optionTypeRadioChecked, setOptionTypeRadioChecked] = useState({
    textType: false,
    imageType: false,
    textAndImageType: false,
  });
  const [optionNumbers, setOptionNumbers] = useState([0, 1, 2]);

  useEffect(() => {
    //for radio button resetting on new question tab
    setOptionTypeRadioChecked(prev => ({
      ...prev,
      textType: false,
      imageType: false,
      textAndImageType: false,
    }));
  }, [selectedQustionNumber]);

  //for option input
  const handleOptionInput = (e, index) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((option, i) =>
        i === index ? { ...option, optionText: e.target.value } : option
      ),
    }));
  };

  //for new options
  const addOption = () => {
    setOptionNumbers(prev => [...prev, prev.length + 1]);
    setFormData(prev => {
      return {
        ...prev,
        options: [
          ...prev.options,
          {
            optionText: "",
            imageUrl: "",
            isCorrect: false,
          },
        ],
      };
    });
  };

  //for option deletion
  const deleteOptions = index => {
    setOptionNumbers(prev => prev.filter((_, i) => i !== index));

    setFormData(prev => {
      return {
        ...prev,
        options: prev.options.filter((_, i) => i !== index),
      };
    });
  };

  //for timer Styles
  const timerStyleDiv0 = () => {
    if (question.questionText === "") {
      if (formData.timer == 0) {
        return { backgroundColor: "#d60000", color: "white" };
      }
    } else if (question.timer == 0) {
      return { backgroundColor: "#d60000", color: "white" };
    }
  };
  //for timer Styles
  const timerStyleDiv5 = () => {
    if (question.questionText === "") {
      if (formData.timer == 5) {
        return { backgroundColor: "#d60000", color: "white" };
      }
    } else if (question.timer == 5) {
      return { backgroundColor: "#d60000", color: "white" };
    }
  };
  //for timer Styles
  const timerStyleDiv10 = () => {
    if (question.questionText === "") {
      if (formData.timer == 10) {
        return { backgroundColor: "#d60000", color: "white" };
      }
    } else if (question.timer == 10) {
      return { backgroundColor: "#d60000", color: "white" };
    }
  };

  const handleFormInput = e => {
    // console.log(e);

    //for timers
    if (e.target.id == "timer-off") {
      setFormData(prev => ({ ...prev, timer: 0 }));
    }
    if (e.target.id == "timer-5-sec") {
      setFormData(prev => ({ ...prev, timer: 5 }));
    }
    if (e.target.id == "timer-10-sec") {
      setFormData(prev => ({ ...prev, timer: 10 }));
    }

    //for options types radio check
    if (e.target.name == "Q&A-radio") {
      if (e.target.id == "text-type") {
        optionTypeRadioChecked.textType = true;
        optionTypeRadioChecked.imageType = false;
        optionTypeRadioChecked.textAndImageType = false;
        setFormData(prev => ({ ...prev, optionType: "text" }));
      }
      if (e.target.id == "image-type") {
        optionTypeRadioChecked.textType = false;
        optionTypeRadioChecked.imageType = true;
        optionTypeRadioChecked.textAndImageType = false;
        setFormData(prev => ({ ...prev, optionType: "imageUrl" }));
      }
      if (e.target.id == "text-and-image-type") {
        optionTypeRadioChecked.textType = false;
        optionTypeRadioChecked.imageType = false;
        optionTypeRadioChecked.textAndImageType = true;
        setFormData(prev => ({ ...prev, optionType: "textAndImageUrl" }));
      }
    }

    //for question text
    if (e.target.id == "questionText") {
      setFormData(prev => {
        return { ...prev, questionText: e.target.value };
      });
    }
  };

  const handleQuestionsData = e => {
    //for timers
    if (e.target.id == "timer-off") {
      setQuestions(prevItems =>
        prevItems.map((item, index) =>
          index === selectedQustionNumber
            ? {
                ...item,
                timer: 0,
              }
            : item
        )
      );
    }
    if (e.target.id == "timer-5-sec") {
      setQuestions(prevItems =>
        prevItems.map((item, index) =>
          index === selectedQustionNumber
            ? {
                ...item,
                timer: 5,
              }
            : item
        )
      );
    }
    if (e.target.id == "timer-10-sec") {
      setQuestions(prevItems =>
        prevItems.map((item, index) =>
          index === selectedQustionNumber
            ? {
                ...item,
                timer: 10,
              }
            : item
        )
      );
    }

    //for options type radio check
    if (e.target.name == "Q&A-radio") {
      if (e.target.id == "text-type") {
        setQuestions(prevItems =>
          prevItems.map((item, index) =>
            index === selectedQustionNumber
              ? {
                  ...item,
                  optionType: "text",
                  optionTypeRadioChecked: {
                    ...item.optionTypeRadioChecked,
                    textType: true,
                    imageType: false,
                    textAndImageType: false,
                  },
                }
              : item
          )
        );
      }
      if (e.target.id == "image-type") {
        setQuestions(prevItems =>
          prevItems.map((item, index) =>
            index === selectedQustionNumber
              ? {
                  ...item,
                  optionType: "imageUrl",
                  optionTypeRadioChecked: {
                    ...item.optionTypeRadioChecked,
                    textType: false,
                    imageType: true,
                    textAndImageType: false,
                  },
                }
              : item
          )
        );
      }
      if (e.target.id == "text-and-image-type") {
        setQuestions(prevItems =>
          prevItems.map((item, index) =>
            index === selectedQustionNumber
              ? {
                  ...item,
                  optionType: "textAndImageUrl",
                  optionTypeRadioChecked: {
                    ...item.optionTypeRadioChecked,
                    textType: false,
                    imageType: false,
                    textAndImageType: true,
                  },
                }
              : item
          )
        );
      }
    }

    //for question text updateion
    if (e.target.id == "questionText") {
      setQuestions(prevItems =>
        prevItems.map((item, index) =>
          index === selectedQustionNumber
            ? {
                ...item,
                questionText: e.target.value,
              }
            : item
        )
      );
    }
  };

  return (
    <div className='display-form'>
      <div id='QandA-text-box'>
        <input
          id='questionText'
          type='text'
          placeholder='Q & A Quiestion'
          value={
            question.questionText === ""
              ? formData.questionText
              : question.questionText
          }
          onChange={e => {
            handleFormInput(e);
            handleQuestionsData(e);
          }}
        />
      </div>
      <div className='option-types'>
        <span>Option Type</span>
        <span>
          <input
            type='radio'
            id='text-type'
            checked={
              question.questionText === ""
                ? optionTypeRadioChecked.textType
                : question.optionTypeRadioChecked.textType
            }
            name='Q&A-radio'
            onChange={e => {
              handleFormInput(e);
              handleQuestionsData(e);
            }}
          />
          Text
        </span>
        <span>
          <input
            type='radio'
            id='image-type'
            checked={
              question.questionText === ""
                ? optionTypeRadioChecked.imageType
                : question.optionTypeRadioChecked.imageType
            }
            name='Q&A-radio'
            onChange={e => {
              handleFormInput(e);
              handleQuestionsData(e);
            }}
          />
          Image URL
        </span>
        <span>
          <input
            type='radio'
            id='text-and-image-type'
            checked={
              question.questionText === ""
                ? optionTypeRadioChecked.textAndImageType
                : question.optionTypeRadioChecked.textAndImageType
            }
            name='Q&A-radio'
            onChange={e => {
              handleFormInput(e);
              handleQuestionsData(e);
            }}
          />
          Text & Image URL
        </span>
      </div>
      <div className='options-and-timer'>
        <div className='options'>
          <div className='option-field'>
            {optionNumbers.map((option, index) => {
              return (
                <div key={index}>
                  <input type='radio' name='Q&A-options-radio' />
                  <input
                    id={`option${index + 1}`}
                    className='QandA-option-text'
                    type='text'
                    placeholder='Text'
                    value={formData.options[index].optionText}
                    onChange={e => handleOptionInput(e, index)}
                  />
                  {index >= 2 && (
                    <img
                      onClick={() => deleteOptions(index)}
                      className='deleteIcon'
                      src={deleteIcon}
                      alt='deleteIcon'
                    />
                  )}
                </div>
              );
            })}
          </div>
          {optionNumbers.length < 4 && (
            <div>
              <button onClick={addOption}>Add Option</button>
            </div>
          )}
        </div>
        <div className='timer'>
          <div>Timer</div>
          <div
            style={timerStyleDiv0()}
            id='timer-off'
            onClick={e => {
              handleFormInput(e);
              handleQuestionsData(e);
            }}
          >
            OFF
          </div>
          <div
            style={timerStyleDiv5()}
            id='timer-5-sec'
            onClick={e => {
              handleFormInput(e);
              handleQuestionsData(e);
            }}
          >
            5 Sec
          </div>
          <div
            style={timerStyleDiv10()}
            id='timer-10-sec'
            onClick={e => {
              handleFormInput(e);
              handleQuestionsData(e);
            }}
          >
            10 Sec
          </div>
        </div>
      </div>
      <div className='modal-buttons'>
        <button>Cancel</button>
        <button>Create Quiz</button>
      </div>
    </div>
  );
}
