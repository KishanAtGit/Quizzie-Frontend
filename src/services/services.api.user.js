import axios from "axios";

export const registerUser = async signUpData => {
  try {
    const data = await axios({
      method: "post",
      url: "https://quizzie-backend-lhsz.onrender.com/api/auth/register",
      data: signUpData,
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const loginUser = async logInData => {
  try {
    const data = await axios({
      method: "post",
      url: "https://quizzie-backend-lhsz.onrender.com/api/auth/login",
      data: logInData,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
