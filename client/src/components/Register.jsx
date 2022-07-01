import './Register.css';
import './Register.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [errorResponseState, setErrorResponseState] = useState(false);
  const [errorResponse, setErrorResponse] = useState('');
  const [errors, setError] = useState({
    registerNumber: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      errors.registerNumber.length > 0 ||
      errors.name.length > 0 ||
      errors.password.length > 0 ||
      errors.confirmPassword.length > 0
    ) {
      setSubmitError('Enter valid details!');
    } else {
      // post registration data to register api

      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify({
          rollno: registerNumber,
          name: name,
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
        navigate('/login');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = errors;

    switch (name) {
      case 'registerNumber':
        error.registerNumber =
          value >= 1000000 && value <= 9999999
            ? ''
            : 'Register Number must be 7 digits';
        setRegisterNumber(value);
        break;

      case 'name':
        error.name =
          value.length > 30 ? 'Name must not exceed 30 characters' : '';
        setName(value);
        break;

      case 'password':
        error.password =
          value.length < 6 ? 'Password atleast have 6 characters' : '';
        setPassword(value);
        break;

      case 'confirmPassword':
        error.confirmPassword =
          value == password ? '' : 'Password must be matched';
        setConfirmPassword(value);

      default:
        break;
    }

    setError({ ...errors, [name]: error[`${name}`] });
  };

  return (
    <div>
      <div class='registration-form'>
        <h1>Sign-up</h1>
        <hr />
        <div class='form'>
          <form onSubmit={handleSubmit}>
            <div class='form-group'>
              <label for='exampleInputRegisterNumber1'>Register Number</label>
              <input
                type='text'
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
              <label for='exampleInputName1'>Name</label>
              <input
                type='text'
                class='form-control'
                name='name'
                id='exampleInputName1'
                aria-describedby='emailHelp'
                placeholder='Enter name'
                onChange={handleChange}
                required
              />
              {errors.name.length > 0 && (
                <span class='error'>{errors.name}</span>
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
              <label for='exampleInputPassword2'>Confirm Password</label>
              <input
                type='password'
                class='form-control'
                name='confirmPassword'
                id='exampleInputPassword2'
                placeholder='Re-enter Password'
                onChange={handleChange}
                required
              />
              {errors.confirmPassword.length > 0 && (
                <span class='error'>{errors.confirmPassword}</span>
              )}
            </div>
            <div class='form-group'>
              <button type='submit' class='btn btn-primary'>
                Sign-up
              </button>
              {submitError.length > 0 && (
                <span class='error'>{submitError}</span>
              )}
              {errorResponseState && (
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

export default Register;
