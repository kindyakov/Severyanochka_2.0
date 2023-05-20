export const checkAuth = () => {
  let isAuth
  if (localStorage.getItem('token')) isAuth = true
  else isAuth = false
  return isAuth
}