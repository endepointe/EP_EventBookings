import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import {
  Hidden 
} from '@material-ui/core';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(`${process.env.STRIPE_PK_TEST}`);

const useStyles = makeStyles({
  listLarge: {
    width: 450,
    overflow: 'hidden',
  },
  listSmall: {
    width: '100%',
    overflow: 'hidden', 
  }
});


// replace redish background with a stop icon

export default function CheckoutDrawer(props) {
  console.log(props);
  const classes = useStyles();

  const list = () => (
    <>
      <Hidden smDown>
        <div
          className={classes.listLarge}
          role="presentation"
          onClick={props.handeCheckoutDrawer}
          // onKeyDown={props.handleCheckoutDrawer}
        >
          <Elements stripe={stripePromise}>
            <CheckoutForm 
              selectedPackage={props.selectedPackage}
              user={props.user} cx={props.cx} />
          </Elements>
        </div>
      </Hidden>

      <Hidden mdUp>
        <div
          className={classes.listSmall}
          role="presentation"
          onClick={props.handeCheckoutDrawer}
          // onKeyDown={props.handleCheckoutDrawer}
        >
          <Elements stripe={stripePromise}>
            <CheckoutForm 
              selectedPackage={props.selectedPackage}
              user={props.user} cx={props.cx} />
          </Elements>
        </div>
      </Hidden>
    </>
  );

  return (
    <>
      <SwipeableDrawer
        anchor='right'
        open={props.open}
        onClose={props.handleCheckoutDrawer}
        onOpen={props.handleCheckoutDrawer}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
}