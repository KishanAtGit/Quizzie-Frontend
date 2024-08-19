import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../api";

export default function SignUp() {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await registerUser(signUpData);
    if (data.status === 200) {
      navigate("/log-in");
    }
  };

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
        {/* <Link to={`${loginType == "log-in" ? "/log-in" : ""}`}> */}
        <div className='submit-button'>
          <button type='submit' onClick={handleSubmit}>
            Sign-Up
          </button>
        </div>
        {/* </Link> */}
      </form>
    </div>
  );
}
