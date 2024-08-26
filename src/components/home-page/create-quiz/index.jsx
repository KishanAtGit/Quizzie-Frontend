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
  const [createQuizTypeAndName, setCreateQuizTypeAndName] = useState({
    quizName: "",
    quizType: "",
  });

  return (
    <div>
      <CreateQuizType
        openCreateQuizTypeModal={openCreateQuizTypeModal}
        setOpenCreateQuizTypeModal={setOpenCreateQuizTypeModal}
        setOpenCreateQAndAModal={setOpenCreateQAndAModal}
        setOpenCreatePollModal={setOpenCreatePollModal}
        createQuizTypeAndName={createQuizTypeAndName}
        setCreateQuizTypeAndName={setCreateQuizTypeAndName}
      />
      <CreateQAndAQuestion
        openCreateQAndAModal={openCreateQAndAModal}
        setOpenCreateQAndAModal={setOpenCreateQAndAModal}
        createQuizTypeAndName={createQuizTypeAndName}
      />
      <CreatePollQuestion
        openCreatePollModal={openCreatePollModal}
        setOpenCreatePollModal={setOpenCreatePollModal}
        createQuizTypeAndName={createQuizTypeAndName}
      />
      <QuizLinkModal
        openQuizLinkModal={openQuizLinkModal}
        setOpenQuizLinkModal={setOpenQuizLinkModal}
      />
    </div>
  );
}
