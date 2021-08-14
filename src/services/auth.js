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

export const handleLocalLogin = (user) => {
  // check against the db
  if (user.email === 'a@b.c' && user.password === 'pass') {
    return setUser({
      username: 'ep',
      name: 'ende',
      email: user.email 
    });
  }
  return false;
}

export const isLoggedIn = () => {
  const user = getUser();
  return !!user.username;
}

export const logout = cb => {
  setUser({});
  cb();
}