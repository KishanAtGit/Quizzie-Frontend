import apiClient from "../axios.config";

export const getQuizAPI = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await apiClient.get(`/quiz/${userId}`, {
      params: {
        // ...QuizData,
        // createdBy_userId: userId,
      },
    });
    return response.data.quiz;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
