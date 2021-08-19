import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import FormUserContactInfo from './FormUserContactInfo';
import FormUserBusinessDetails from './FormUserBusinessDetails';
import FormUserSocialMedia from './FormUserSocialMedia';
import FormUserFileUpload from './FormUserFileUpload';
import Confirm from './Confirm';
import Success from './Success';

const UserForm = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    setState({
      step: 1,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      militaryStatus: '',
      companyName: '', 
      websiteUrl: '',
      socialMedia: {
        Facebook: '',
        Twitter: '',
        Instagram: '',
        LinkedIn: '' 
      }
    }) 
  }, [])

  // Proceed to next step
  const nextStep = () => {
    const { step } = state;
    setState({
      step: step + 1
    });
  };

  // Go back to prev step
  const prevStep = () => {
    const { step } = state;
    setState({
      step: step - 1
    });
  };

  // Handle fields change
  // const handleChange = e => {
  //   console.log('change: ', e.target.value)
  // };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Paper>
      { state.step === 1
        ?
          <FormUserContactInfo
            nextStep={nextStep}
            // handleChange={handleChange}
            state={state}
          />
        : state.step === 2 
        ? 
          <FormUserBusinessDetails
            nextStep={nextStep}
            prevStep={prevStep}
            // handleChange={handleChange}
            state={state}
          />
        : state.step === 3
        ?
          <FormUserSocialMedia
            nextStep={nextStep}
            prevStep={prevStep}
            state={state}
          />
        : state.step === 4
        ? 
          <FormUserFileUpload
            nextStep={nextStep}
            prevStep={prevStep}
            // handleChange={handleChange}
            state={state}
          />
        : state.step === 5
        ? 
          <Confirm
            nextStep={nextStep}
            prevStep={prevStep}
            // handleChange={handleChange}
            state={state}
          />
        : state.step === 6
        ? 
          <Success />
        : null
      }
      </Paper>
    </Container>
  );
}

export default UserForm;