import { useState } from "react";

export default function LogIn({ setLoginType }) {
  setLoginType("log-in");
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

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
          <button type='submit'>Log In</button>
        </div>
      </form>
    </div>
  );
}
