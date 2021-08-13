import React, { useState } from 'react';
import { navigate } from "gatsby";
import { handleLogin, isLoggedIn } from '../services/auth';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

// https://github.com/bradtraversy/react_step_form

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250, 
  }
}));

const Login = () => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [oauth, setAuthType] = useState(true);
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

  const handleLoginType = () => {
    setAuthType(!oauth);  
  }


  if (isLoggedIn()) {
    navigate(`/app/dashboard`); 
  }

  return (
    <>
      <h1>Log in</h1>
      {oauth 
        ?
        <Link href="http://localhost:8001/auth/google">Login with Google</Link>
        : 
        <form 
          className={classes.root}
          method="post"
          onSubmit={(e) => {
            handleSubmit(e)
            navigate(`/app/dashboard`)
          }}>
          <TextField
            label="Username"
            variant="outlined"
            onChange={updateUsername}
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            onChange={updatePassword} 
          />
          <Button fullWidth outlined>Submit</Button>
        </form>
      }
      { !oauth 
          ?
            <Link onClick={handleLoginType}>Log in with a provider</Link>
          :
            <Link onClick={handleLoginType}>Log in with credentials</Link>
      }
          </> 
  )
}

export default Login;