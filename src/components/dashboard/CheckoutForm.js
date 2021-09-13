import React, {useState} from 'react';
import {
  CardElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import {
  Grid,
  Typography,
} from '@material-ui/core';
import EmojiEventsSharpIcon from '@material-ui/icons/EmojiEventsSharp';
import {makeStyles} from '@material-ui/core/styles';
import CardSection from './CardSection';
import stripe_util from '../../utils/stripe'; 
import stripeLogo from '../../assets/powered_by_stripe_blurple_300x68.png';
import * as styles from '../styles/CheckoutForm.module.css';

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

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange
}) => (
  <div className={styles.FormRow}>
    <label htmlFor={id} className={styles.FormRowLabel}>
      {label}
    </label>
    <input
      className={styles.FormRowInput}
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`${styles.SubmitButton} ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className={styles.ErrorMessage} role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const CheckoutForm = (props) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: props.user.email,
    phone: props.cx.phone,
    name: props.user.name 
  });
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

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    setProcessing(false);

    if (result?.error) {
      setError(result.error);
    } else {
      setPaymentMethod(result.paymentMethod);
      result.payment_amount = props.selectedPackage.price;
      result.customer_id = props.cx.id;
      let description = {
        product_id: props.selectedPackage.product.id,
        product_name: props.selectedPackage.product.name,
        product_created: props.selectedPackage.product.created,
        product_price: props.selectedPackage.price,
      }
      result.description = JSON.stringify(description); 

      console.log(await stripe_util.stripePaymentMethodHandler(result));
    }
  };

  return paymentMethod ? (
    <div className={styles.Result}>
      <div className={styles.ResultTitle} role="alert">
        Payment successful
      </div>
      <div className={styles.ResultMessage}>
        Thanks for trying Stripe Elements. No money was charged, but we
        generated a PaymentMethod: {paymentMethod.id}
      </div>
    </div>
  ) : (
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
        <form className={styles.Form} onSubmit={handleSubmit}>
          <fieldset className={styles.FormGroup}>
            <Field
              label="Name"
              id="name"
              type="text"
              placeholder="Jane Doe"
              required
              autoComplete="name"
              value={billingDetails?.name}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, name: e.target.value });
              }}
            />
            <Field
              label="Email"
              id="email"
              type="email"
              placeholder="janedoe@gmail.com"
              required
              autoComplete="email"
              value={billingDetails?.email}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, email: e.target.value });
              }}
            />
            <Field
              label="Phone"
              id="phone"
              type="tel"
              placeholder="(941) 555-0123"
              required
              autoComplete="tel"
              value={billingDetails?.phone}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, phone: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className={styles.FormGroup}>
            <CardSection onChange={(e) => {
              setError(e.error);
              setCardComplete(e.complete);
            }} />
          </fieldset>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <SubmitButton processing={processing} error={error} disabled={!stripe}>
            Checkout (${props.selectedPackage.price / 100})
          </SubmitButton>
        </form>
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
      <Grid item xs={12}>
        <Typography display='block' align='center'>
          <a href="https://stripe.com/" target="_blank">
            <img src={stripeLogo} alt="powered-by-stripe" />
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default CheckoutForm;