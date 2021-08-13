import React, { useState } from 'react';
import { navigate } from "gatsby";
import { handleLogin, isLoggedIn } from '../services/auth';
import Signin from './Signin';
import Signup from './Signup';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

// https://github.com/bradtraversy/react_step_form

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasAccount, setHasAccount] = useState(true);

  const handleHasAccount = (e) => {
    e.preventDefault();
    setHasAccount(!hasAccount); 
  }


  const updateEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  }
  const updatePassword = (e) => {
    setPassword(e.target.value); 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({email, password}); 
  }

  return (
    <>
      {hasAccount
        ? <Signin 
            updateEmail={updateEmail}
            updatePassword={updatePassword}
            handleSubmit={handleSubmit}
            handleHasAccount={handleHasAccount} />
        : <Signup handleHasAccount={handleHasAccount} />
      }
    </> 
  )
}

export default Login;