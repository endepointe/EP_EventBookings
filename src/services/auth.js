export const isBrowser = () => typeof window !== "undefined";

// this function should check for the presence of a cookie and verify that
// the data in the cookie is valid
export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}


// afer successful login or create, sets the token in a cookie
const setUser = user => {
  console.log('set user: ', user);
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))
}  

// export const handleLogin = (user) => {
//   if (user.email === 'a@b.c' && user.password === 'pass') {
//     return setUser({
//       username: 'ep',
//       name: 'ende',
//       email: user.email 
//     });
//   }
//   return false;
// }

export const handleLocalLogin = async (user) => {
  // check against the db
  try {
    const userdata = {username: user.email, password: user.password};
    let response = await fetch('http://localhost:8001/auth/account/login', 
                                {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify(userdata)
                                });
    let data = await response.json();
    console.log(data);
    if (data.result) {
      setUser({
        username: data.id
      })
    } else {
      setUser({});
    }
    if (isLoggedIn()) {
      return data.result;
    }
    return data.result;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const handleLocalCreate = async (user) => {
  // check against the db
  try {
    const userdata = {username: user.email, password: user.password};
    let response = await fetch('http://localhost:8001/auth/account/create', 
                                {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify(userdata)
                                });
    let data = await response.json();
    // if data.result is false, a user already exists with that email
    console.log('data: ', data);
    if (data.result) {
      setUser({
        username: data.id
      })
    } else {
      // delete the user from localstorage, resultin in isLoggedIn returning
      // false
      setUser({});
    }
    if (isLoggedIn()) {
      return data.result;
    }
    return data.result;
  } catch (err) {
    console.error(err);
    return false;
  }

  // if (user.email === 'a@b.c' && user.password === 'pass') {

  //   return setUser({
  //     username: 'ep',
  //     name: 'ende',
  //     email: user.email 
  //   });
  // }
  // return false;
}

export const isLoggedIn = () => {
  const user = getUser();
  console.log('user = isLoggedIn(): ', user);
  console.log('!!user.username: ', !!user.username);
  return !!user.username;
}

export const logout = cb => {
  setUser({});
  cb();
}