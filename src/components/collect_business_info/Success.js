import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';

const Success = (props) => {
  const cont = e => {
    e.preventDefault();
    // PROCESS FORM //
    props.nextStep();
  };

  const back = e => {
    e.preventDefault();
    props.prevStep();
  };

  return (
    <>
      <Dialog
        open
        fullWidth
        maxWidth='sm'
      >
        <AppBar title="Success" />
        <h1>Thank You For Your Submission</h1>
        <p>You will get an email with further instructions.</p>
      </Dialog>
    </>
  );
}

export default Success;