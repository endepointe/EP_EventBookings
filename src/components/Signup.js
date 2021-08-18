import React, {useState} from 'react';
import { handleLocalCreate, getUser } from '../services/auth';
import { navigate } from "gatsby";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
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
        Event Bookings
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vpassword, setVPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({status: false, msg: ''});

  const updateEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value); 
  }

  const updateVPassword = (e) => {
    setVPassword(e.target.value); 
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === vpassword && 
        password.length > 0 && 
        vpassword.length > 0) {
      // returns either a true or false
      handleLocalCreate({email, password, provider: 'local'})
        .then(success => {
          console.log('handleLocalCreate result: ', success);
          if (success) {
            navigate('/app/dashboard');
          } else {
            setErrorMessage({status: true, msg: 'user exists, please login'});
          }
        })
        .catch(err=>console.error(err));
    } else {
      alert('display password error msg')
      return;
    }
    console.log('result after calling handleLocalLogin(): ', getUser());
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                disabled={errorMessage.status}
                onChange={updateEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                disabled={errorMessage.status}
                onChange={updatePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="vpassword"
                label="Verify Password"
                type="password"
                id="vpassword"
                disabled={errorMessage.status}
                onChange={updateVPassword}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
                disabled={errorMessage.status}
              /> */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={errorMessage.status}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          {errorMessage.status
            ? <Alert severity="warning">{errorMessage.msg}</Alert>
            : <p>{null}</p>
          }
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link 
                component="button"
                onClick={props.handleHasAccount}
                variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}