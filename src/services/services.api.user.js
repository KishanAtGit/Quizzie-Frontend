import axios from "axios";

export const registerUser = async signUpData => {
  try {
    const data = await axios({
      method: "post",
      url: "http://localhost:3000/api/auth/register",
      data: signUpData,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async logInData => {
  try {
    const data = await axios({
      method: "post",
      url: "http://localhost:3000/api/auth/login",
      data: logInData,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
