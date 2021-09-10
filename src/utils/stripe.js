
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
module.exports = {
  findUser: findUser,
  createUser: createUser,
  findOrCreateUser: findOrCreateUser,
  getEventPackages: getEventPackages,
};