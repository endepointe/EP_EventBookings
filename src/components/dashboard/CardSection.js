/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import {
  Typography,
  Grid,
  InputLabel,
  Divider,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {CardElement} from '@stripe/react-stripe-js';

const useStyles = makeStyles({
  // root style works due to the width setting in <CheckoutDrawer.
  // If the widh setting were missing in CheckoutDrawer, the width
  // here would have to be set to a static value. 
  root: {
    margin: '0 auto',
    width: '100vw',
    // maxWidth: 450, // must be <= width in CheckoutDrawer
  },
  cardDetails: {
    paddingLeft: 22,
  },
  cardElement: {
    margin: '0 auto',  //
    width: '100%',     //
    // maxWidth: '420px', // center within root div
    height: '40px',
    padding: '10px 12px',
    color: '#32325d',
    backgroundColor: 'white',
    border: '1px solid transparent',
    borderRadius: '4px',
    boxShadow: '0 1px 3px 0 #e6ebf1',
    webkitTransition: 'box-shadow 150ms ease',
    transition: 'box-shadow 150ms ease',
    '&:focus': {
      boxShadow: '0 1px 3px 0 #cfd7df',
    },
    '&:invalid': {
      borderColor: '#fa755a', 
    },
    '&:webkit-autofill': {
      backgroundColor: '#fefde5 !important'
    }
  }
})

// error object is made available to provide user feedback.
function CardSection(props) {
  const classes = useStyles();

  return (
    <CardElement 
      onChange={(e)=>props.onChange(e)}
      className={classes.cardElement} /> 
  );
};
export default CardSection;