import Modal from "react-modal";
import "./index.css";
export default function QuizDeleteModal({
  quizdeleteModal,
  setQuizDeleteModal,
}) {
  return (
    <div>
      <Modal
        className='quiz-delete-modal'
        isOpen={quizdeleteModal}
        onRequestClose={() => setQuizDeleteModal(false)}
        ariaHideApp={false}
      >
        Delete Modal
      </Modal>
    </div>
  );
}
