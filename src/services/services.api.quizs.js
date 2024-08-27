import apiClient from "../axios.config";

export const createQuizAPI = async QuizData => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await apiClient.post("quiz/create", {
      ...QuizData,
      createdBy_userId: userId,
    });
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
