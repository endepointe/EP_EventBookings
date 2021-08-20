import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Event Booking
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  googleButton: {
    marginTop: theme.spacing(2)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = (props) => {

  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState({status: false, msg: ''});

  const providerAuth = (provider) => {
    window.location = `http://localhost:8001/auth/${provider}`;
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // returns either a true or false
  //   handleLocalLogin({email, password, provider: 'local'})
  //     .then(success => {
  //       console.log(success)
  //       if (success) {
  //         navigate('/app/dashboard');
  //       } else {
  //         setErrorMessage({status: true, msg: 'please try again'});
  //       }
  //     })
  //     .catch(err=>console.error(err));
  //  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Button
          className={classes.googleButton}
          fullWidth
          variant="outlined"
          onClick={()=>providerAuth('google')}
        >
          Sign in with Google
        </Button>
        <Button
          className={classes.googleButton}
          fullWidth
          variant="outlined"
        >
          Sign in with Facebook
        </Button>
        <Button
          className={classes.googleButton}
          fullWidth
          variant="outlined"
        >
          Sign in with Instagram
        </Button>
        <Button
          className={classes.googleButton}
          fullWidth
          variant="outlined"
        >
          Sign in with Twitter 
        </Button>
      </div>
     <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;