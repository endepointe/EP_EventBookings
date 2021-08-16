import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

const Login = () => {
 const [hasAccount, setHasAccount] = useState(true);

  const handleHasAccount = (e) => {
    e.preventDefault();
    setHasAccount(!hasAccount); 
  }

  return (
    <>
      {hasAccount
        ? <Signin handleHasAccount={handleHasAccount} />
        : <Signup handleHasAccount={handleHasAccount} />
      }
    </> 
  )
}

export default Login;