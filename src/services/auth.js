export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = (user) => {
  if (user.email === 'a@b.c' && user.password === 'pass') {
    return setUser({
      username: 'ep',
      name: 'ende',
      email: user.email 
    });
  }
  return false;
}

export const handleLocalLogin = async (user) => {
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
    // console.log('response: ', response);
    // let data = await response.json();
    console.log('data: ', await response.json());
     return setUser({
       username: 'ep',
     })
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
  return !!user.username;
}

export const logout = cb => {
  setUser({});
  cb();
}