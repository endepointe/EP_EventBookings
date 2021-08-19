import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

// display a success message and then send the user to their dashboard
const Success = () => {

  useEffect(() => {
    navigate('/app/dashboard');
  });

  return (
    <>
      <h1>Thank You For Your Submission</h1>
      <p>You will get an email with further instructions.</p>
    </>
  );
}

export default Success;