/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import {
  IconButton,
  Typography,
  Grid
} from '@material-ui/core';
import {CardElement} from '@stripe/react-stripe-js';
// import './Styles.css'
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
      width: '400px'
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
function CardSection() {
  return (
    <Grid item xs={12}>
      <label>
        Card details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
    </Grid>
  );
};
export default CardSection;