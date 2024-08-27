import Modal from "react-modal";
import crossIcon from "../../../../assets/img/charm_cross.png";
import "../index.css";

export default function QuizLinkModal({
  openQuizLinkModal,
  setOpenQuizLinkModal,
  quizLink,
}) {
  return (
    <Modal
      className='quiz-link-modal'
      isOpen={openQuizLinkModal}
      onRequestClose={() => setOpenQuizLinkModal(false)}
      ariaHideApp={false}
    >
      <div id='link-modal-cross-icon'>
        <img
          onClick={() => setOpenQuizLinkModal(false)}
          src={crossIcon}
          alt='close-icon'
        />
      </div>
      <div id='link-modal-heading'>
        Congrats your Quiz is
        <br />
        Published!
      </div>
      <div id='link-field'>
        <a href={quizLink}>{quizLink}</a>
      </div>
      <div className='link-share-button'>
        <button>Share</button>
      </div>
    </Modal>
  );
}
