import apiClient from "../axios.config";

export const liveQuiz = async quizId => {
  try {
    const response = await apiClient.get(`/live-quiz/${quizId}`);
    return response.data.quiz;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const checkLiveQuiz = async (quizId, questionId, isCorrect) => {
  try {
    const response = await apiClient.put(
      `live-quiz/attempt/${quizId}/${questionId}`,
      {
        isCorrect,
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
