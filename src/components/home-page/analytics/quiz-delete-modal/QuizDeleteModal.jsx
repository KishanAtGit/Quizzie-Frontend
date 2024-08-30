import Modal from "react-modal";
import { deleteQuizAPI } from "../../../../services/services.api.quizs";
import "./index.css";
export default function QuizDeleteModal({
  quizdeleteModal,
  setQuizDeleteModal,
  selectedQuizId,
  setRefresh,
}) {
  const handleQuizDelete = async () => {
    await deleteQuizAPI(selectedQuizId);
    setQuizDeleteModal(false);
    setRefresh(prev => !prev);
  };

  return (
    <div>
      <Modal
        className='quiz-delete-modal'
        isOpen={quizdeleteModal}
        onRequestClose={() => setQuizDeleteModal(false)}
        ariaHideApp={false}
      >
        <div className='delete-modal-heading'>
          Are you confirm you want to delete ?
        </div>
        <div className='delete-modal-buttons'>
          <button onClick={handleQuizDelete}>Confirm Delete</button>
          <button onClick={() => setQuizDeleteModal(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
