import React, { useState } from 'react';
import { navigate } from "gatsby";
import { handleLocalLogin, isLoggedIn, getUser } from '../services/auth';
import Signin from './Signin';
import Signup from './Signup';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLocalLogin({email, password});
    navigate('/app/dashboard');
    // console.log('result after calling handleLocalLogin(): ', getUser());
    // if (isLoggedIn()) {
    //   navigate(`/app/dashboard`); 
    // } else {
    //   alert('try again');
    // }
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