import Modal from "react-modal";
import "../index.css";

export default function QuizLinkModal({
  openQuizLinkModal,
  setOpenQuizLinkModal,
}) {
  return (
    <Modal
      className='quiz-link-modal'
      isOpen={openQuizLinkModal}
      onRequestClose={() => setOpenQuizLinkModal(false)}
      ariaHideApp={false}
    >
      Quiz LInk
    </Modal>
  );
}
