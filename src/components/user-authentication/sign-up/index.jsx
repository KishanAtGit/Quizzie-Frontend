import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/services.api.user';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  let isValid = true;
  const validate = () => {
    isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (signUpData.name.length < 3 || signUpData.name.length == '') {
      newErrors.name = 'Invalid name';
      isValid = false;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      newErrors.email = 'Invalid Email';
      isValid = false;
    }

    // Password validation
    if (signUpData.password.length < 6) {
      newErrors.password = 'Weak password';
      isValid = false;
    }

    // Confirm Password validation
    if (
      signUpData.password !== signUpData.confirmPassword ||
      signUpData.confirmPassword == ''
    ) {
      newErrors.confirmPassword = "Passwords doesn't match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    const data = await registerUser(signUpData);

    if (data.status === 201) {
      navigate('/log-in');
      toast.success('User registered successfully');
    }
    if (data.status === 400) {
      setErrors(prev => ({
        ...prev,
        email: 'User already exists',
      }));
      isValid = false;
    }
  };

  const handleChange = e => {
    setSignUpData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setErrors(prev => ({
      ...prev,
      [e.target.id]: '',
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
              value={errors.name || signUpData.name}
              onChange={handleChange}
              style={{
                color: errors.name ? '#D60000' : '#474444',
                border: errors.name ? '1px solid #D60000' : 'none',
              }}
              onClick={() => setErrors(prev => ({ ...prev, name: '' }))}
            />
            <input
              type='email'
              id='email'
              value={errors.email || signUpData.email}
              onChange={handleChange}
              style={{
                color: errors.email ? '#D60000' : '#474444',
                border: errors.email ? '1px solid #D60000' : 'none',
              }}
              onClick={() => setErrors(prev => ({ ...prev, email: '' }))}
            />
            <input
              type={errors.password ? 'text' : 'password'}
              id='password'
              onChange={handleChange}
              value={errors.password || signUpData.password}
              style={{
                color: errors.password ? '#D60000' : '#474444',
                border: errors.password ? '1px solid #D60000' : 'none',
              }}
              onClick={() => setErrors(prev => ({ ...prev, password: '' }))}
            />
            <input
              type={errors.confirmPassword ? 'text' : 'password'}
              id='confirmPassword'
              value={errors.confirmPassword || signUpData.confirmPassword}
              onChange={handleChange}
              style={{
                color: errors.confirmPassword ? '#D60000' : '#474444',
                border: errors.confirmPassword ? '1px solid #D60000' : 'none',
              }}
              onClick={() =>
                setErrors(prev => ({ ...prev, confirmPassword: '' }))
              }
            />
          </div>
        </div>
        <div className='submit-button'>
          <button type='submit' onClick={handleSubmit}>
            Sign-Up
          </button>
        </div>
      </form>
    </div>
  );
}
