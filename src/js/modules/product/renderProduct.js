import { productHtml, productError } from "./productHtml.js"
import { Get, GetProduct } from "./request.js"
import rating from "./rating.js"
import { disableCardButtons } from "./disableCardBtn.js"
import { Params } from "./queryParams.js"
import { checkAuth } from "../user/isAuth.js"
import { GetProductLocalStorage } from "./request.js"

const renderProduct = new Promise((resolve, reject) => {
  const product_container = document.querySelector('#products-container')
  const rout = 'product'
  const params = Params
  const isAuth = checkAuth()
  const basketLocalData = GetProductLocalStorage('basket')
  const favouriteLocalData = GetProductLocalStorage('favourite')

  const getProduct = async () => {
    try {
      const data = await GetProduct({ rout, params })
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const getBasket = async () => {
    try {
      if (isAuth) {
        const basket = await Get('basket')
        return basket
      } else return null
    } catch (error) {
      console.log(error)
    }
  }
  const getFavourite = async () => {
    try {
      if (isAuth) {
        const favourite = await Get('favourite')
        return favourite
      } else return null
    } catch (error) {
      console.log(error)
    }
  }

  const disableCardBtn = (basket, favourite) => {
    const btnBasket = '.card-button.add-btn'
    const btnFavourite = '.card-like'
    if (isAuth) {
      disableCardButtons(basket, btnBasket)
      disableCardButtons(favourite, btnFavourite)
    } else {
      disableCardButtons(basketLocalData, btnBasket)
      disableCardButtons(favouriteLocalData, btnFavourite)
    }
  }

  const render = (products) => {
    product_container.innerHTML = ''
    if (products.count > 0) {
      products.rows.forEach(product => {
        product_container.insertAdjacentHTML('beforeend', productHtml(product))
      });
    } else {
      product_container.innerHTML = productError()
    }
  }

  Promise.all([getProduct(), getBasket(), getFavourite()])
    .then(data => {
      const [product, basket, favourite] = data
      const returnData = {
        product, basket, favourite,
        filter: product.filter, count: product.count
      }
      render(product)

      if (product.count > 0) {
        disableCardBtn(basket, favourite)
        rating()
      }

      resolve(returnData)
    })
    .catch(err => console.log(err))
})

export default renderProduct