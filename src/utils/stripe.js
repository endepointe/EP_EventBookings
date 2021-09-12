const { loadStripe } = require("@stripe/stripe-js");

// const stripe = await loadStripe(process.env.STRIPE_PK_TEST);

async function findUser(email) {
  try {
    let userres = await fetch(`${process.env.EXPRESS_API_HOST}/stripe/customer/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email})
    })
    let user = await userres.json();
    return user.data;
  } catch (err) {
    console.error(err) 
    return null;
  }
}

async function createUser(email) {
  try {
    let userres = await fetch(`${process.env.EXPRESS_API_HOST}/stripe/customer/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email})
    })
    let user = await userres.json();
    return user;
  } catch (err) {
    console.error(err) 
    return null;
  }
}

async function findOrCreateUser(email) {
  // find
  try {
    let userres = await fetch(`${process.env.EXPRESS_API_HOST}/stripe/customer/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email})
    })
    let user = await userres.json();
    if (user === null || user.data.length === 0) {
      // create
      let newuserres = await fetch(`${process.env.EXPRESS_API_HOST}/stripe/customer/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email})
      })
      let newuser = await newuserres.json();   
      console.log('created cx: ', newuser);
      return newuser;
    }
    console.log('found cx: ', user.data)
    return user.data;
  } catch (err) {
    console.error(err) 
    return null;
  }
}

async function getEventPackages() {
  try {
    let productResponse = await fetch(`${process.env.EXPRESS_API_HOST}/stripe/products/event-packages/all`) 
    let productList = await productResponse.json();
    return await productList;
  } catch (err) {
    console.error(err); 
    return null;
  }
} 

async function stripePaymentMethodHandler(result) {
  if (result.error) {
    return result.error; 
  } else {
    fetch(`${process.env.EXPRESS_API_HOST}/stripe/payments/pay`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        payment_method_id: result.paymentMethod.id, 
        payment_amount: result.payment_amount,
        customer: result.customer_id,
        description: result.description,
      }) 
    }).then((result) => {
      result.json().then((json) => {
        _handleServerResponse(json); 
      })
    }).catch((err) => {
      console.error(err); 
    });
  }
}

async function _handleServerResponse(response) {
  const stripe = await loadStripe(process.env.STRIPE_PK_TEST);
  if (response.error) {
    return response.error; 
  } else if (response.requires_action) {
    stripe.handleCardAction(
      response.payment_intent_client_secret 
    ).then(_handleStripeJsResult);
  } else {
    // show success message
    console.log(response)
    return response; 
  }
}

function _handleStripeJsResult(result) {
  if (result.error) {
    return result.error; 
  } else {
    fetch(`${process.env.EXPRESS_API_HOST}/stripe/payments/pay`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({payment_intent_id: result.paymentIntent.id})
    }).then((confirmResult) => {
      return confirmResult.json(); 
    }).then(_handleServerResponse)  
  }
}

module.exports = {
  findUser: findUser,
  createUser: createUser,
  findOrCreateUser: findOrCreateUser,
  getEventPackages: getEventPackages,
  stripePaymentMethodHandler: stripePaymentMethodHandler,
};