import './Register.css';
import './Register.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [registerNumber, setRegisterNumber] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const [ErrorResponseState, setErrorResponseState] = useState(false);
  const [errors, setError] = useState({
    registerNumber: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.registerNumber.length > 0 || errors.password.length > 0) {
      setSubmitError('Enter valid details!');
    } else {
      console.log('api call');
      // api call
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify({
          rollno: registerNumber,
          password: password,
        }),
      });

      const data = await response.json();
      if (data.status == 'error') {
        setErrorResponse(data.error);
        setErrorResponseState(true);

        setTimeout(() => {
          setErrorResponseState(false);
        }, 5000);
      } else {
        navigate('/home');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = errors;

    switch (name) {
      case 'registerNumber':
        error.registerNumber =
          value.length == 7 ? '' : 'Register Number must be 7 digits';
        setRegisterNumber(value);
        break;

      case 'password':
        error.password =
          value.length < 6 ? 'Password atleast have 6 characters' : '';
        setPassword(value);
        break;

      default:
        break;
    }

    setError({ ...errors, [name]: error[`${name}`] });
  };

  return (
    <div>
      <div class='registration-form'>
        <h1>Sign-in</h1>
        <hr />
        <div class='form'>
          <form onSubmit={handleSubmit}>
            <div class='form-group'>
              <label for='exampleInputRegisterNumber1'>Register Number</label>
              <input
                type='number'
                class='form-control'
                name='registerNumber'
                id='exampleInputRegisterNumber1'
                aria-describedby='emailHelp'
                placeholder='Enter register number'
                maxLength={7}
                onChange={handleChange}
                required
              />
              {errors.registerNumber.length > 0 && (
                <span class='error'>{errors.registerNumber}</span>
              )}
            </div>
            <div class='form-group'>
              <label for='exampleInputPassword1'>Password</label>
              <input
                type='password'
                class='form-control'
                name='password'
                id='exampleInputPassword1'
                placeholder='Enter Password'
                onChange={handleChange}
                required
              />
              {errors.password.length > 0 && (
                <span class='error'>{errors.password}</span>
              )}
            </div>
            <div class='form-group'>
              <button type='submit' class='btn btn-primary'>
                Sign-in
              </button>
              {submitError.length > 0 && (
                <span class='error'>{submitError}</span>
              )}
              {ErrorResponseState && (
                <div>
                  <span class='error'>{errorResponse}</span>
                  <span class='error'>Try Again</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
