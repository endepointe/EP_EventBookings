// checks whether a user with the provided email exists within the 
// database. 
// returns true or false
export const userExists = async (email) => {
  try {
    let data = {email: email};
    let res = await fetch('http://localhost:8001/users/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    let userEmail = await res.text();

    console.log(userEmail)

    if (userEmail === null || !userEmail) {
      return false;
    }

    return true;

  } catch (err) {

    console.error(err); 

    return;
  }
}

export const createUser = (user) => {
  console.log(user);
}

// returns all user properties within a user object
export const readUser = async (data) => {
  console.log(data.email);  
  let res = await fetch('http://localhost:8001/users/find', {
    method: 'POST',
    body: JSON.stringify({email: data.email})
  })
  let user = await res.text();
  console.log(user);
  return user;
}

export const updateUser = (user) => {

}

export const deleteUser = (user) => {

}