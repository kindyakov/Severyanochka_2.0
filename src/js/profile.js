import { baseUrl } from "./modules/API.js";
// import loader from './modules/loader.js'
import { checkAuth } from './modules/user/isAuth.js'
import personalData from "./modules/profile/personalData.js";
import updataProfile from "./modules/profile/updataProfile.js";
import tabsProfile from "./modules/profile/tabsProfile.js";
import { getProfile } from "./modules/user/auth.js";
import updataPassword from "./modules/profile/updataPassword.js";
// import getPurchases вывод всех покупок

const isAuth = checkAuth()
if (!isAuth) location.assign(`${baseUrl}/index.html`)

tabsProfile()
updataPassword()

Promise.all([getProfile()])
  .then(data => {
    const [profile] = data
    updataProfile()
    personalData(profile)
  })
  .catch(err => console.log(err))
