
export const createUser = (user) => {
  console.log(user);
}

export const findUser = async (user) => {
  console.log(user.email);  
  let res = await fetch('http://localhost:8001/users/find', {
    method: 'POST',
    body: JSON.stringify({email: user.email})
  })
  let data = await res.text();
  console.log(data);
  return data;
}

export const updateUser = (user) => {

}

export const deleteUser = (user) => {

}