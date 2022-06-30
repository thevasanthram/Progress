import './Register.css';
import './Register.css';
import React, { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [errors, setError] = useState({
    registerNumber: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      errors.registerNumber.length == 0 &&
      errors.name.length == 0 &&
      errors.password.length == 0 &&
      errors.confirmPassword.length == 0
    ) {
      // post registration data to register api
    } else {
      setSubmitError('Enter valid details!');
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
    }

    setError({ ...errors, [name]: error[`${name}`] });
  };

  return (
    <div>
      <div class='registration-form'>
        <h2>Registration</h2>
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
            {errors.name.length > 0 && <span class='error'>{errors.name}</span>}
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
          <button type='submit' class='btn btn-primary'>
            Register
          </button>
          {submitError.length > 0 && <span class='error'>{submitError}</span>}
        </form>
      </div>
    </div>
  );
}

export default Register;
