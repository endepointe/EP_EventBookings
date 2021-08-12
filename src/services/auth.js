export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = (user) => {
  if (user.username === 'john' && user.password === 'pass') {
    return setUser({
      username: 'ep',
      name: 'ende',
      email: 'ende@pointe.com',
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