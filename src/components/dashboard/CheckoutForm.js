import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import EmojiEventsSharpIcon from '@material-ui/icons/EmojiEventsSharp';
import {makeStyles} from '@material-ui/core/styles';
import CardSection from './CardSection';
import stripe_util from '../../utils/stripe'; 

const useStyles = makeStyles({
  container: {
    paddingTop: '1.6em',
  },
  formIcon: {
    color: '#1561ad',
  },
  formIconGold: {
    color: '#cccc6a',
  },
  formIconSilver: {
    color: '#bbbbbb',
  },
  formIconVIP: {
    color: '#cdd1d5',
  },
  buttonContainer: {
    marginBottom: '2em',
  },
  submitButton: {
    backgroundColor: '#2bb441',
    color: '#efefef',
    '&:hover': {
      backgroundColor: '#1aa330',
      color: '#efefef', 
    }
  },
});

export default function CheckoutForm(props) {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  // console.log('props.cx: ', props.cx);
  // console.log('props.user: ', props.user);
  // console.log('props: ', props);

  const selectIcon = (name) => {
    let str = name.slice(16);
    switch (str) {
      case 'VIP':
        return <>
                <EmojiEventsSharpIcon 
                  className={classes.formIconVIP}
                  fontSize='small'/>
                  <EmojiEventsSharpIcon 
                    className={classes.formIconVIP}
                    fontSize='large'/>
                <EmojiEventsSharpIcon 
                  className={classes.formIconVIP}
                  fontSize='small'/>
                </>
      case 'Gold':
        return  <EmojiEventsSharpIcon 
            className={classes.formIconGold}
            fontSize='large'/>
      case 'Silver':
        return  <EmojiEventsSharpIcon 
            className={classes.formIconSilver}
            fontSize='large'/>
      default:
        return <EmojiEventsSharpIcon 
            className={classes.formIcon}
            fontSize='large'/>
    } 
  }

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
    });

    result.payment_amount = props.selectedPackage.price;
    result.customer_id = props.cx.id;
    let description = {
      product_id: props.selectedPackage.product.id,
      product_name: props.selectedPackage.product.name,
      product_created: props.selectedPackage.product.created,
      product_price: props.selectedPackage.price,
    }
    result.description = JSON.stringify(description); 

    stripe_util.stripePaymentMethodHandler(result);
  };

  return (
    <Grid container 
      direction='column'
      className={classes.container}
      spacing={2}>
      <Grid 
        item xs={12}>
        <Typography align='center'>
          {selectIcon(props.selectedPackage.product.name)}
        </Typography>
        <Typography align='center' variant='body1'> 
          {props.selectedPackage.product.name}
        </Typography> 
        <Typography align='center' variant='body2'> 
          ${props.selectedPackage.price / 100}
        </Typography>
      </Grid>
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
      <Grid container justifyContent="center">
      <Grid 
        item xs={10}>
        <Typography variant='caption' display='block' gutterBottom>
          You are authorizing Company Name to capture the amount above.
        </Typography>
        <Typography variant='caption' display='block' gutterBottom> 
          You may see a temporary deduction on your account. This is a hold placed on the funds listed above and does not indicate an actual charge on your account.
        </Typography>
        <Typography variant='caption' display='block' gutterBottom> 
          Your card will not be charged until we have reviewed the business you are providing at the event.
        </Typography> 
      </Grid>
      </Grid>
    </Grid>
  );
}