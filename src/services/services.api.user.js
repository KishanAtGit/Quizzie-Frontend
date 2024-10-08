import apiClient from '../axios.config';
import { toast } from 'react-toastify';

export const registerUser = async signUpData => {
  try {
    const data = await apiClient({
      method: 'post',
      url: 'auth/register',
      data: signUpData,
    });
    return data;
  } catch (error) {
    if (error.response.status === 400) {
      toast.error('User already exist');
    }
    console.log(error);
    return error.response;
  }
};

export const loginUser = async logInData => {
  try {
    const data = await apiClient({
      method: 'post',
      url: 'auth/login',
      data: logInData,
    });
    return data;
  } catch (error) {
    if (error.response.status === 400) {
      toast.error('Wrong email or password');
    }
    console.log(error);
    return error.response;
  }
};
