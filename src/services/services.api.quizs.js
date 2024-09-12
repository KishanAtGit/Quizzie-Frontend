import apiClient from '../axios.config';

const userId = localStorage.getItem('userId');

export const getQuizAPI = async params => {
  try {
    const response = await apiClient.get(`/quiz/${userId}`, {
      params: params ? params : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const createQuizAPI = async QuizData => {
  const formatDate = date => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  try {
    const response = await apiClient.post('quiz/create', {
      ...QuizData,
      createdBy_userId: userId,
      createdOn: formatDate(new Date()),
    });
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

export const editQuizAPI = async (quizId, questions) => {
  try {
    const response = await apiClient.patch(`quiz/update/${quizId}`, {
      questions: questions,
    });
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

export const deleteQuizAPI = async quizId => {
  try {
    const response = await apiClient.delete(`quiz/delete/${quizId}`);
    return response;
  } catch (error) {
    console.error('Error deleting quiz:', error);
  }
};
