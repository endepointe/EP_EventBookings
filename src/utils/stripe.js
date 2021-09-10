
async function findUser(email) {
  try {
    console.log(email)
    let userres = await fetch(`${process.env.EXPRESS_API_HOST}/stripe/customer/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': `${process.env.CLIENT_ORIGIN}`
      },
      body: JSON.stringify({email: email})
    })
    let user = await userres.json();
    return `found user: ${user}`
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
  getEventPackages: getEventPackages,
};