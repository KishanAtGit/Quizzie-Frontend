import apiClient from "../axios.config";

export const createQuizAPI = async QuizData => {
  const formatDate = date => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const userId = localStorage.getItem("userId");
  try {
    const response = await apiClient.post("quiz/create", {
      ...QuizData,
      createdBy_userId: userId,
      createdOn: formatDate(new Date()),
    });
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
