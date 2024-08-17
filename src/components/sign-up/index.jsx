import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp({ handleLoginType }) {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = e => {
    setSignUpData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className='sign-up'>
      <form action=''>
        <div className='labels-inputs'>
          <div className='labels'>
            <label htmlFor='name'>Name</label>
            <label htmlFor='email'>Email</label>
            <label htmlFor='password'>Password</label>
            <label htmlFor='confirmPassword'>Confirm Password</label>
          </div>
          <div className='input-fields'>
            <input
              type='text'
              id='name'
              value={signUpData.name}
              onChange={handleChange}
            />
            <input
              type='text'
              id='email'
              value={signUpData.email}
              onChange={handleChange}
            />
            <input
              type='text'
              id='password'
              value={signUpData.password}
              onChange={handleChange}
            />
            <input
              type='text'
              id='confirmPassword'
              value={signUpData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <Link to='/log-in' onClick={() => handleLoginType("log-in")}>
          <div className='submit-button'>
            <button type='submit'>Sign-Up</button>
          </div>
        </Link>
      </form>
    </div>
  );
}
