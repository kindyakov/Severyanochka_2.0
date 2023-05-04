import rating from "../product/rating.js";
import { disableCardButtons } from "../product/disableCardBtn.js";
import { Get } from "../product/request.js";
import { productHtml, productError } from "../product/productHtml.js";

const renderProduct = new Promise((resolve, reject) => {
  const favourites__content = document.querySelector('#favourites-products')
  const titleQuantity = document.querySelector('.main-title-quantity')

  const getProduct = async () => {
    try {
      const product = await Get('favourite/product')
      return product
    } catch (error) {
      console.log(error)
    }
  }
  const getBasket = async () => {
    try {
      const basket = await Get('basket')
      return basket
    } catch (error) {
      console.log(error)
    }
  }
  const getFavourite = async () => {
    try {
      const favourite = await Get('favourite')
      return favourite
    } catch (error) {
      console.log(error)
    }
  }

  const render = (products) => {
    favourites__content.innerHTML = ''
    if (products.length > 0) {
      products.forEach(product => {
        favourites__content.insertAdjacentHTML('beforeend', productHtml(product))
      });
      titleQuantity.textContent = products.length
      return products
    } else {
      favourites__content.innerHTML = productError()
      titleQuantity.textContent = 0
      return false
    }
  }

  Promise.all([getProduct(), getBasket(), getFavourite()])
    .then(data => {
      const [product, basket, favourite] = data
      render(product)
      disableCardButtons(basket, '.card-button.add-btn')
      disableCardButtons(favourite, '.card-like')
      rating()
      resolve(product)
    })
})

export default renderProduct