import React, { Component } from 'react';

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
      <h1>Thank You For Your Submission</h1>
      <p>You will get an email with further instructions.</p>
    </>
  );
}

export default Success;