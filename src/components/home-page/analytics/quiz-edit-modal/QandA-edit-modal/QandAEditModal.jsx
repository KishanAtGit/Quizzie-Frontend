import Modal from "react-modal";
export default function QandAEditModal() {
  return (
    <div className='display-form'>
      <div id='QandA-Poll-text-box'>
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
            name='optionType-radio'
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
            name='optionType-radio'
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
            name='optionType-radio'
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
            {question.options.map((_, index) => {
              return (
                <div key={index}>
                  <input
                    type='radio'
                    name='options-radio'
                    onChange={e => handleOptionInput(e, index)}
                    checked={
                      question.questionText === ""
                        ? formData.options[index].isCorrect
                        : question.options[index].isCorrect
                    }
                  />
                  <input
                    style={setOptionTextBoxVisiblty()}
                    id={`option${index + 1}`}
                    className='QandA-poll-option-text'
                    type='text'
                    placeholder='Text'
                    value={
                      question.questionText === ""
                        ? formData.options[index].optionText
                        : question.options[index].optionText
                    }
                    onChange={e => handleOptionInput(e, index)}
                  />
                  <input
                    style={setOptionImageUrlVisiblty()}
                    id={`optionImage${index + 1}`}
                    className='QandA-poll-option-imageUrl'
                    type='text'
                    placeholder='Image URL'
                    value={
                      question.questionText === ""
                        ? formData.options[index].imageUrl
                        : question.options[index].imageUrl
                    }
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
          {question.options.length < 4 && (
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
    </div>
  );
}
