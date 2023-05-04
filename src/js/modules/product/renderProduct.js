import { productHtml, productError } from "./productHtml.js"
import { getData } from "../admin/get_data.js"
import { Get } from "./request.js"
import rating from "./rating.js"
import { disableCardButtons } from "./disableCardBtn.js"
import { Params } from "./queryParams.js"

const renderProduct = new Promise((resolve, reject) => {
  const product_container = document.querySelector('#products-container')
  const rout = 'product'
  const params = Params

  const getProduct = async () => {
    try {
      const data = await getData({ rout, params })
      return data
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
        product: product,
        basket: basket, favourite: favourite,
        filter: product.filter
      }
      render(product)

      if (product.count > 0) {
        disableCardButtons(basket, '.card-button.add-btn')
        disableCardButtons(favourite, '.card-like')
        rating()
      }

      resolve(returnData)
    })
    .catch(err => console.log(err))
})

export default renderProduct