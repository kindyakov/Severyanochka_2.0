import rating from "../product/rating.js"
import { disableCardButtons } from "../product/disableCardBtn.js";
import { productHtml, productError } from "../product/productHtml.js";
import { checkAuth } from "../user/isAuth.js";
import { GetProduct } from "../product/request.js";

const renderOrder = new Promise((resolve, reject) => {
  const isAuth = checkAuth()
  const rout = 'order'
  const params = { page: 1, limit: 6, }
  GetProduct({ rout, params })
    .then(data => console.log(data))
    .catch(err => console.log(err))
})

export default renderOrder