import apiClient from "../axios.config";

export const getQuizAPI = async params => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await apiClient.get(`/quiz/${userId}`, {
      params: params ? params : {},
    });
    return response.data.quiz;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
