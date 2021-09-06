
function findUser() {
  return 'find stripe user';
}

async function getEventPackages() {
  try {
    let productResponse = await fetch(`${process.env.EXPRESS_API_HOST}/stripe/products/event-packages/all`) 
    let productData = await productResponse.json();
    return productData.data;
  } catch (err) {
    console.error(err); 
    return null;
  }
} 
module.exports = {
  findUser: findUser,
  getEventPackages: getEventPackages,
};