import Modal from "react-modal";
import "../index.css";

export default function CreatePollQuestion({
  openCreatePollModal,
  setOpenCreatePollModal,
}) {
  return (
    <div>
      <Modal
        className='modal'
        isOpen={openCreatePollModal}
        onRequestClose={() => setOpenCreatePollModal(false)}
        ariaHideApp={false}
      >
        CreatePollQuestion
      </Modal>
    </div>
  );
}
