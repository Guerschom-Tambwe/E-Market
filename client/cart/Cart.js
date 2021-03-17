import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import CartItems from './CartItems'
// import {StripeProvider} from 'react-stripe-elements'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

import config from './../../config/config'
import Checkout from './Checkout'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  }
}))

export default function Cart () {
  const classes = useStyles();
  const [checkout, setCheckout] = useState(false);
  const stripePromise = loadStripe(config.stripe_test_api_key);

  const showCheckout = val => {
    setCheckout(val)
  }

    return (<div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={6} sm={6}>
          <CartItems checkout={checkout}
                     setCheckout={showCheckout}/>
        </Grid>
        {checkout &&
          <Grid item xs={6} sm={6}>
            <Elements apiKey={stripePromise}>
              <Checkout/>
            </Elements>
          </Grid>}
        </Grid>
      </div>)
}
