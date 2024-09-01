import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/services.api.user";

export default function LogIn() {
  const navigate = useNavigate();

  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  let isValid = true;
  const validate = () => {
    isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (logInData.email === "") {
      newErrors.email = "Please provide Email";
      isValid = false;
    }

    if (logInData.password === "") {
      newErrors.password = "Please provide password";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    const result = await loginUser(logInData);

    if (result.status === 202) {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("userId", result.data.userId);
      navigate("/home-page/dashboard");
    } else if (result.status === 400) {
      setErrors({
        email: "Wrong email or password",
        password: "Wrong email or password",
      });
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
              value={errors.email || logInData.email}
              onChange={handleChange}
              style={{
                color: errors.email ? "#D60000" : "#474444",
                border: errors.email ? "1px solid #D60000" : "none",
              }}
              onClick={() => setErrors(prev => ({ ...prev, email: "" }))}
            />
            <input
              type='text'
              id='password'
              value={errors.password || logInData.password}
              onChange={handleChange}
              style={{
                color: errors.password ? "#D60000" : "#474444",
                border: errors.password ? "1px solid #D60000" : "none",
              }}
              onClick={() => setErrors(prev => ({ ...prev, password: "" }))}
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
