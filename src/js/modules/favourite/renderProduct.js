import rating from "../product/rating.js";
import { disableCardButtons } from "../product/disableCardBtn.js";
import { Get } from "../product/request.js";
import { productHtml, productError } from "../product/productHtml.js";
import { checkAuth } from "../user/isAuth.js";
import { GetProductLocalStorage } from "../product/request.js";

const renderProduct = new Promise((resolve, reject) => {
  const products__container = document.querySelector('#products-container')
  const titleQuantity = document.querySelector('.main-title-quantity')
  const isAuth = checkAuth()
  const basketLocalData = GetProductLocalStorage('basket')
  const favouriteLocalData = GetProductLocalStorage('favourite')

  const getProduct = async () => {
    try {
      if (isAuth) {
        const product = await Get('favourite/product')
        return product
      } else return favouriteLocalData
    } catch (error) {
      console.log(error)
    }
  }
  const getBasket = async () => {
    try {
      if (isAuth) {
        const basket = await Get('basket')
        return basket
      } return basketLocalData
    } catch (error) {
      console.log(error)
    }
  }
  const getFavourite = async () => {
    try {
      if (isAuth) {
        const favourite = await Get('favourite')
        return favourite
      } return null
    } catch (error) {
      console.log(error)
    }
  }

  const render = (products) => {
    products__container.innerHTML = ''
    if (products.count > 0 && isAuth) {
      products.rows.forEach(product => {
        products__container.insertAdjacentHTML('beforeend',
          productHtml(product))
      });
      titleQuantity.textContent = products.count
    } else if (products.length > 0 && !isAuth) {
      products.forEach(product => {
        products__container.insertAdjacentHTML('beforeend',
          productHtml(product))
      });
      titleQuantity.textContent = products.length
    } else {
      products__container.innerHTML = productError()
      titleQuantity.textContent = 0
    }
  }

  Promise.all([getProduct(), getBasket(), getFavourite()])
    .then(data => {
      const [product, basket, favourite] = data
      const returnData = {
        product: product,
        basket: basket, favourite: favourite,
        filter: product.filter,
        count: isAuth ? product.count : product.length
      }
      render(product)
      disableCardButtons(basket, '.card-button')
      // disableCardButtons(isAuth ? favourite : product, '.card-like')
      rating()
      resolve(returnData)
    })
})

export default renderProduct