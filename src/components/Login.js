import React, { useState } from 'react';
import { navigate } from "gatsby";
import { handleLogin, isLoggedIn } from '../services/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const updateUsername = (e) => {
    setUsername(e.target.value);
  }
  const updatePassword = (e) => {
    setPassword(e.target.value); 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({username, password}); 
  }

  if (isLoggedIn()) {
    navigate(`/app/dashboard`); 
  }

  return (
    <>
      <h1>Log in</h1>
      <form 
        method="post"
        onSubmit={(e) => {
          handleSubmit(e)
          navigate(`/app/dashboard`)
        }}>
        <label>
          Username
          <input type="text" name="username" onChange={updateUsername} />
        </label> 
        <label>
          Password
          <input type="password" name="password" onChange={updatePassword} />
        </label>
        <input type="submit" value="Log In" />
        </form>
    </> 
  )
}

export default Login;