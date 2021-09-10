import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {
  Button,
  Grid,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CardSection from './CardSection';

const useStyles = makeStyles({
  root: {
    flexGrow: 1, 
    width: 400,
  },
});


export default function CheckoutForm() {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        name: 'Jenny Rosen',
      },
    });

    console.log('create payment method result: ', result);
    // stripePaymentMethodHandler(result);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <CardSection />
          <button disabled={!stripe}>
            Submit Payment
          </button>
        </form>
      </Grid>
    </Grid>
  );
}