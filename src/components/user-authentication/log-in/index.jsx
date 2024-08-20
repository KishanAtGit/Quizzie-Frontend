import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/services.api.user";

export default function LogIn() {
  const navigate = useNavigate();

  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await loginUser(logInData);
    if (data.status === 202) {
      navigate("/home-page");
    }
  };

  const handleChange = e => {
    setLogInData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className='log-in'>
      <form action=''>
        <div className='labels-inputs'>
          <div className='labels'>
            <label htmlFor='email'>Email</label>
            <label htmlFor='password'>Password</label>
          </div>
          <div className='input-fields'>
            <input
              type='text'
              id='email'
              value={logInData.email}
              onChange={handleChange}
            />
            <input
              type='text'
              id='password'
              value={logInData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='submit-button' id='submit-button-login'>
          <button type='submit' onClick={handleSubmit}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
