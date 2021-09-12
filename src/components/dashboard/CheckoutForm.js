import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {
  Button,
  Grid,
  Hidden,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CardSection from './CardSection';
import stripe_util from '../../utils/stripe'; 

const useStyles = makeStyles({
  buttonContainer: {
  },
  submitButton: {
    left: 22 // temporary until issue with StripeElement + MUI Button is fixed
  }
});

export default function CheckoutForm(props) {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  console.log('attach cx: ', props.cx);
  // console.log('props.user: ', props.user);

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
        name: props.user.name,
        email: props.user.email,
      },
      // customer: props.cx.id
    });

    result.payment_amount = props.selectedPackage.price;
    result.customer_id = props.cx.id;

    stripe_util.stripePaymentMethodHandler(result);

    console.log('create payment method result: ', result);
    
  };

  return (
    <Grid container 
      direction='column'
      spacing={2}>
        <Grid item xs={12}>
          <CardSection />
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
          <Button 
            variant='contained'
            fullWidth
            className={classes.submitButton}
            onClick={handleSubmit} disabled={!stripe}>
            Submit Payment
          </Button>
        </Grid>
        <Hidden lgUp>
          <Grid item xs={12}>
            hidden lgUP
          </Grid>
        </Hidden>
    </Grid>
  );
}