import rating from "../product/rating.js";
import { disableCardButtons } from "../product/disableCardBtn.js";
import { Get } from "../product/request.js";
import { productHtml, productError } from "../product/productHtml.js";

const renderProduct = new Promise((resolve, reject) => {
  const products__container = document.querySelector('#products-container')
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
    products__container.innerHTML = ''
    if (products.count > 0) {
      products.rows.forEach(product => {
        products__container.insertAdjacentHTML('beforeend', productHtml(product))
      });
      titleQuantity.textContent = products.count
      return products
    } else {
      products__container.innerHTML = productError()
      titleQuantity.textContent = 0
      return false
    }
  }

  Promise.all([getProduct(), getBasket(), getFavourite()])
    .then(data => {
      const [product, basket, favourite] = data
      const returnData = {
        product: product,
        basket: basket, favourite: favourite,
        filter: product.filter, count: product.count
      }
      render(product)
      disableCardButtons(basket, '.card-button.add-btn')
      disableCardButtons(favourite, '.card-like')
      rating()
      resolve(returnData)
    })
})

export default renderProduct