export const changeAuth = () => {
  let isAuth
  if (localStorage.getItem('token')) isAuth = true
  else isAuth = false
  return isAuth
}