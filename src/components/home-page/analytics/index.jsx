import { useNavigate } from "react-router-dom";
import editIcon from "../../../assets/img/uil_edit.png";
import deleteIcon from "../../../assets/img/material-symbols_delete.png";
import shareIcon from "../../../assets/img/material-symbols_share.png";
import "./index.css";

export default function Analytics({ tempEntry, setSelectedQuiz }) {
  const navigate = useNavigate();

  const handleQuizSelection = index => {
    setSelectedQuiz(index);
    navigate("/home-page/question-wise-analysis");
  };

  return (
    <div className='analytics-page'>
      <div id='analytics-section-heading'>Quiz Analysis</div>
      <div className='analytics-section'>
        <div className='analytics-heading analytics-group'>
          <div className='s-no'>S.No</div>
          <div className='quiz-name'>Quiz Name</div>
          <div className='created-on'>Create on</div>
          <div className='impression'>Impression</div>
        </div>
        {tempEntry.map((entry, index) => {
          return (
            <div key={index} className='analytics-group'>
              <div className='s-no'>{index + 1}</div>
              <div className='quiz-name'>{entry}</div>
              <div className='created-on'>Create on</div>
              <div className='impression'>Impression</div>
              <div className='icons'>
                <a href='#'>
                  <img src={editIcon} alt='editIcon' />
                </a>
                <a href='#'>
                  <img src={deleteIcon} alt='deleteIcon' />
                </a>
                <a href='#'>
                  <img src={shareIcon} alt='shareIcon' />
                </a>
              </div>
              <div
                className='question-hyperlink'
                onClick={() => handleQuizSelection(index)}
              >
                <a href='#'>Question Wise Analysis</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
