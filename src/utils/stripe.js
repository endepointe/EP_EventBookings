
function findUser() {
  return 'find stripe user';
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