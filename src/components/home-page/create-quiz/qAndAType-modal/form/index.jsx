import { useState, useEffect } from "react";
import deleteIcon from "../../../../../assets/img/material-symbols_delete.png";

export default function QAndAType({
  question,
  setQuestions,
  selectedQustionNumber,
  isEditQandAMode,
  setIsDisabled,
  questions,
}) {
  const [formData, setFormData] = useState(
    isEditQandAMode
      ? question
      : {
          questionText: "",
          optionType: "text",
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
        }
  );

  const [optionTypeRadioChecked, setOptionTypeRadioChecked] = useState({
    textType: true,
    imageType: false,
    textAndImageType: false,
  });

  const [isOptionTypeChange, setIsOptionTypeChange] = useState(false);

  useEffect(() => {
    //for formData resetting on new question tab
    setFormData({
      questionText: "",
      optionType: "text",
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

    //for radio button resetting on new question tab
    setOptionTypeRadioChecked(prev => ({
      ...prev,
      textType: true,
      imageType: false,
      textAndImageType: false,
    }));
  }, [selectedQustionNumber]);

  //for resetting option fileds when on option type change
  useEffect(() => {
    !isEditQandAMode &&
      setQuestions(prevItems =>
        prevItems.map((item, i) =>
          i === selectedQustionNumber
            ? {
                ...item,
                options: item.options.map(option => ({
                  ...option,
                  optionText: "",
                  imageUrl: "",
                  isCorrect: false,
                })),
              }
            : item
        )
      );
  }, [isOptionTypeChange]);

  //for option input

  //for new options
  const addOption = () => {
    //adding an option filed to formData
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

    //adding an option filed to question
    setQuestions(prevItems =>
      prevItems.map((item, i) =>
        i === selectedQustionNumber
          ? {
              ...item,
              options: [
                ...item.options,
                {
                  optionText: "",
                  imageUrl: "",
                  isCorrect: false,
                },
              ],
            }
          : item
      )
    );
  };

  //for option deletion
  const deleteOptions = index => {
    //for formData
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));

    //for questionData
    setQuestions(prevItems =>
      prevItems.map((item, i) =>
        i === selectedQustionNumber
          ? {
              ...item,
              options: item.options.filter((_, i) => i !== index),
            }
          : item
      )
    );
  };

  //for option text boxes visibilty according to option type selection
  const setOptionTextBoxVisiblty = () => {
    if (question.optionType === "imageUrl") {
      return { display: "none" };
    }
  };

  const setOptionImageUrlVisiblty = () => {
    if (question.optionType === "text") {
      return { display: "none" };
    }
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

  const checkFormValidation = () => {
    const isFormInvalid = questions.some(question => {
      // Check if questionText is empty
      if (question.questionText === "") {
        return true;
      }

      if (!question.options.some(option => option.isCorrect)) {
        return true;
      }

      if (question.timer == null || question.timer == undefined) return true;

      // Check if all options have text or imageUrl
      const validOptions = question.options.filter(option => {
        if (question.optionType == "text") {
          return option.optionText.trim() !== "";
        } else if (question.optionType == "imageUrl") {
          return option.imageUrl.trim() !== "";
        } else if (question.optionType == "textAndImageUrl") {
          return (
            option.optionText.trim() !== "" && option.imageUrl.trim() !== ""
          );
        }
      });

      return validOptions.length < 2;
    });

    // Disable the form if any question is invalid
    setIsDisabled(isFormInvalid);
  };

  const handleQuestionsandFormData = (e, index) => {
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
    if (e.target.name == "optionType-radio") {
      setIsOptionTypeChange(pre => !pre);
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
    if (e.target.name == "optionType-radio") {
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

    //for option input
    if (e.target.name == "options-radio") {
      //for correct option selection in formData
      setFormData(prev => ({
        ...prev,
        options: prev.options.map((option, i) =>
          i === index
            ? { ...option, isCorrect: true }
            : { ...option, isCorrect: false }
        ),
      }));

      //for correct option selection in questionData
      setQuestions(prevItems =>
        prevItems.map((item, i) =>
          i === selectedQustionNumber
            ? {
                ...item,
                options: item.options.map((option, i) =>
                  i === index
                    ? { ...option, isCorrect: true }
                    : { ...option, isCorrect: false }
                ),
              }
            : item
        )
      );
    } else {
      if (e.target.classList.contains("QandA-poll-option-text")) {
        //for formData optionsText updation
        setFormData(prev => ({
          ...prev,
          options: prev.options.map((option, i) =>
            i === index ? { ...option, optionText: e.target.value } : option
          ),
        }));

        //for questionData optionsText updation
        setQuestions(prevItems =>
          prevItems.map((item, i) =>
            i === selectedQustionNumber
              ? {
                  ...item,
                  options: item.options.map((option, i) =>
                    i === index
                      ? { ...option, optionText: e.target.value }
                      : option
                  ),
                }
              : item
          )
        );
      } else if (e.target.classList.contains("QandA-poll-option-imageUrl")) {
        //for formData imageUrl updation
        setFormData(prev => ({
          ...prev,
          options: prev.options.map((option, i) =>
            i === index ? { ...option, imageUrl: e.target.value } : option
          ),
        }));

        //for questionData imageUrl updation
        setQuestions(prevItems =>
          prevItems.map((item, i) =>
            i === selectedQustionNumber
              ? {
                  ...item,
                  options: item.options.map((option, i) =>
                    i === index
                      ? { ...option, imageUrl: e.target.value }
                      : option
                  ),
                }
              : item
          )
        );
      }
    }
  };
  checkFormValidation();

  return (
    <div className='display-form'>
      <div id='QandA-Poll-text-box'>
        <input
          id='questionText'
          type='text'
          placeholder='Q & A Question'
          value={
            question.questionText === ""
              ? formData.questionText
              : question.questionText
          }
          onChange={e => {
            handleQuestionsandFormData(e);
          }}
        />
      </div>
      <div className='option-types'>
        <span>Option Type</span>
        <span>
          <input
            type='radio'
            id='text-type'
            style={{
              accentColor: "#353434",
              cursor: isEditQandAMode ? "default" : "pointer",
            }}
            checked={
              question.questionText === ""
                ? optionTypeRadioChecked.textType
                : question.optionTypeRadioChecked.textType
            }
            name='optionType-radio'
            onChange={e => {
              handleQuestionsandFormData(e);
            }}
            disabled={isEditQandAMode}
          />
          Text
        </span>
        <span>
          <input
            type='radio'
            id='image-type'
            style={{
              accentColor: "#353434",
              cursor: isEditQandAMode ? "default" : "pointer",
            }}
            checked={
              question.questionText === ""
                ? optionTypeRadioChecked.imageType
                : question.optionTypeRadioChecked.imageType
            }
            name='optionType-radio'
            onChange={e => {
              handleQuestionsandFormData(e);
            }}
            disabled={isEditQandAMode}
          />
          Image URL
        </span>
        <span>
          <input
            type='radio'
            id='text-and-image-type'
            style={{
              accentColor: "#353434",
              cursor: isEditQandAMode ? "default" : "pointer",
            }}
            checked={
              question.questionText === ""
                ? optionTypeRadioChecked.textAndImageType
                : question.optionTypeRadioChecked.textAndImageType
            }
            name='optionType-radio'
            onChange={e => {
              handleQuestionsandFormData(e);
            }}
            disabled={isEditQandAMode}
          />
          Text & Image URL
        </span>
      </div>
      <div className='options-and-timer'>
        <div className='options'>
          <div className='option-field'>
            {question.options.map((option, index) => {
              return (
                <div key={index}>
                  <input
                    type='radio'
                    name='options-radio'
                    style={{
                      accentColor: "#353434",
                      cursor: isEditQandAMode ? "default" : "pointer",
                    }}
                    onChange={e => handleQuestionsandFormData(e, index)}
                    checked={
                      question.questionText === ""
                        ? index < formData.options.length
                          ? formData.options[index].isCorrect
                          : false
                        : option.isCorrect
                    }
                    disabled={isEditQandAMode}
                  />
                  <div className='option-input-text-fields'>
                    <input
                      style={setOptionTextBoxVisiblty()}
                      id={`option${index + 1}`}
                      className={`QandA-poll-option-text ${
                        option.isCorrect ? "selected-input" : ""
                      }`}
                      type='text'
                      placeholder='Text'
                      value={
                        question.questionText === ""
                          ? index < formData.options.length
                            ? formData.options[index].optionText
                            : ""
                          : option.optionText
                      }
                      onChange={e => handleQuestionsandFormData(e, index)}
                    />
                    <input
                      style={setOptionImageUrlVisiblty()}
                      id={`optionImage${index + 1}`}
                      className={`QandA-poll-option-imageUrl ${
                        option.isCorrect ? "selected-input" : ""
                      }`}
                      type='text'
                      placeholder='Image URL'
                      value={
                        question.questionText === ""
                          ? index < formData.options.length
                            ? formData.options[index].imageUrl
                            : ""
                          : option.imageUrl
                      }
                      onChange={e => handleQuestionsandFormData(e, index)}
                    />
                  </div>
                  {index >= 2 && !isEditQandAMode && (
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
          {question.options.length < 4 && !isEditQandAMode && (
            <div className='addButton'>
              <div></div>
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
              handleQuestionsandFormData(e);
            }}
          >
            OFF
          </div>
          <div
            style={timerStyleDiv5()}
            id='timer-5-sec'
            onClick={e => {
              handleQuestionsandFormData(e);
            }}
          >
            5 Sec
          </div>
          <div
            style={timerStyleDiv10()}
            id='timer-10-sec'
            onClick={e => {
              handleQuestionsandFormData(e);
            }}
          >
            10 Sec
          </div>
        </div>
      </div>
    </div>
  );
}
