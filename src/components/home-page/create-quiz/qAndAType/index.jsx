import { useState, useEffect } from "react";
import deleteIcon from "../../../../assets/img/material-symbols_delete.png";

export default function QAndAType({
  question,
  setQuestions,
  selectedQustionNumber,
}) {
  const [formData, setFormData] = useState({
    questionText: "",
  });

  useEffect(() => {
    setFormData({
      questionText: "",
    });
  }, [selectedQustionNumber]);

  const handleInput = e => {
    // console.log(e.target.id, e.target.value, "scsc");
    setFormData(prev => {
      return { ...prev, [e.target.id]: e.target.value };
    });

    setQuestions(prevItems =>
      prevItems.map(
        (item, index) =>
          index === selectedQustionNumber
            ? { ...item, [e.target.id]: e.target.value } // Update the matching item
            : item // Keep other items unchanged
      )
    );
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
          onChange={e => handleInput(e)}
        />
      </div>
      <div className='option-types'>
        <span>Option Type</span>
        <span>
          <input type='radio' name='Q&A-radio' />
          Text
        </span>
        <span>
          <input type='radio' name='Q&A-radio' />
          Image URL
        </span>
        <span>
          <input type='radio' name='Q&A-radio' />
          Text & Image URL
        </span>
      </div>
      <div className='options-and-timer'>
        <div className='options'>
          <div className='option-field'>
            <div>
              <input id='option1' type='radio' name='Q&A-options-radio' />
              <input
                className='QandA-option-text'
                type='text'
                placeholder='Text'
              />
            </div>
            <div>
              <input id='option2' type='radio' name='Q&A-options-radio' />
              <input
                className='QandA-option-text'
                type='text'
                placeholder='Text'
              />
            </div>
            <div className='optionals'>
              <input id='option3' type='radio' name='Q&A-options-radio' />
              <input
                className='QandA-option-text'
                type='text'
                placeholder='Text'
              />
              <img className='deleteIcon' src={deleteIcon} alt='deleteIcon' />
            </div>
          </div>
          <div>
            <button>Add Option</button>
          </div>
        </div>
        <div className='timer'>
          <div>Timer</div>
          <div>OFF</div>
          <div>5 Sec</div>
          <div>10 Sec</div>
        </div>
      </div>
      <div className='modal-buttons'>
        <button>Cancel</button>
        <button>Create Quiz</button>
      </div>
    </div>
  );
}
