import { useState } from "react";
import CreateQuizType from "./quizType-modal";
import CreateQAndAQuestion from "./qAndAType-modal";
import CreatePollQuestion from "./pollType-modal";
import QuizLinkModal from "./quizLink-modal";

export default function CreateQuiz({
  openCreateQuizTypeModal,
  setOpenCreateQuizTypeModal,
}) {
  const [openCreateQAndAModal, setOpenCreateQAndAModal] = useState(false);
  const [openCreatePollModal, setOpenCreatePollModal] = useState(false);
  const [openQuizLinkModal, setOpenQuizLinkModal] = useState(false);

  return (
    <div>
      <CreateQuizType
        openCreateQuizTypeModal={openCreateQuizTypeModal}
        setOpenCreateQuizTypeModal={setOpenCreateQuizTypeModal}
        setOpenCreateQAndAModal={setOpenCreateQAndAModal}
        setOpenCreatePollModal={setOpenCreatePollModal}
      />
      <CreateQAndAQuestion
        openCreateQAndAModal={openCreateQAndAModal}
        setOpenCreateQAndAModal={setOpenCreateQAndAModal}
      />
      <CreatePollQuestion
        openCreatePollModal={openCreatePollModal}
        setOpenCreatePollModal={setOpenCreatePollModal}
      />
      <QuizLinkModal
        openQuizLinkModal={openQuizLinkModal}
        setOpenQuizLinkModal={setOpenQuizLinkModal}
      />
    </div>
  );
}
