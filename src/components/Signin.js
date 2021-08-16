import React, {useState} from 'react';
import { handleLocalLogin } from '../services/auth';
import { navigate } from "gatsby";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
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
  dividerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: theme.spacing(2.25),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontWeight: 500,
    fontSize: 14,
    color: "lightgray"
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({status: false, msg: ''});

  const providerAuth = (provider) => {
    window.location = `http://localhost:8001/auth/${provider}`;
  }

  const updateEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  }

  const updatePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // returns either a true or false
    handleLocalLogin({email, password})
      .then(success => {
        console.log(success)
        if (success) {
          navigate('/app/dashboard');
        } else {
          setErrorMessage({status: true, msg: 'please try again'});
          // setTimeout(() => {
          //   setErrorMessage({status: false, msg: null});
          // }, 3000);
          // return;
        }
      })
      .catch(err=>console.error(err));
   }
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
        <div className={classes.dividerContainer}>or</div>
        <form 
          method="post"
          className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            // autoFocus
            onChange={updateEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={updatePassword}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.submit}
          >
            Sign In
          </Button>
          {errorMessage.status
            ? <Alert severity="warning">{errorMessage.msg}</Alert>
            : <p>{null}</p>
          }
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link 
                component="button"
                onClick={props.handleHasAccount}
                variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;