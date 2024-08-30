import { useState } from "react";
import CreateQuizType from "./quizType-modal";
import CreateQAndAQuestion from "./qAndAType-modal";
import CreatePollQuestion from "./pollType-modal";
import QuizLinkModal from "./quizLink-modal";

export default function CreateQuiz({
  openCreateQuizTypeModal,
  setOpenCreateQuizTypeModal,
  setRefresh,
}) {
  const [openCreateQAndAModal, setOpenCreateQAndAModal] = useState(false);
  const [openCreatePollModal, setOpenCreatePollModal] = useState(false);
  const [openQuizLinkModal, setOpenQuizLinkModal] = useState(false);
  const [createQuiz, setCreateQuiz] = useState({
    quizName: "",
    quizType: "",
    questions: [],
  });
  const [quizLink, setQuizLink] = useState("");

  return (
    <div>
      {openCreateQuizTypeModal && (
        <CreateQuizType
          openCreateQuizTypeModal={openCreateQuizTypeModal}
          setOpenCreateQuizTypeModal={setOpenCreateQuizTypeModal}
          setOpenCreateQAndAModal={setOpenCreateQAndAModal}
          setOpenCreatePollModal={setOpenCreatePollModal}
          createQuiz={createQuiz}
          setCreateQuiz={setCreateQuiz}
        />
      )}
      {openCreateQAndAModal && (
        <CreateQAndAQuestion
          openCreateQAndAModal={openCreateQAndAModal}
          setOpenCreateQAndAModal={setOpenCreateQAndAModal}
          createQuiz={createQuiz}
          setCreateQuiz={setCreateQuiz}
          setOpenQuizLinkModal={setOpenQuizLinkModal}
          setQuizLink={setQuizLink}
          setRefresh={setRefresh}
        />
      )}
      {openCreatePollModal && (
        <CreatePollQuestion
          openCreatePollModal={openCreatePollModal}
          setOpenCreatePollModal={setOpenCreatePollModal}
          createQuiz={createQuiz}
          setCreateQuiz={setCreateQuiz}
          setOpenQuizLinkModal={setOpenQuizLinkModal}
          setQuizLink={setQuizLink}
          setRefresh={setRefresh}
        />
      )}
      {openQuizLinkModal && (
        <QuizLinkModal
          openQuizLinkModal={openQuizLinkModal}
          setOpenQuizLinkModal={setOpenQuizLinkModal}
          quizLink={quizLink}
        />
      )}
    </div>
  );
}
