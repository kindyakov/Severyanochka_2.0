import { productHtml, productError } from "./productHtml.js"
import { getData } from "../admin/get_data.js"
import { Get } from "./request.js"
import rating from "./rating.js"
import { disableCardButtons } from "./disableCardBtn.js"

const renderProduct = new Promise((resolve, reject) => {
  const product_container = document.querySelector('#products-container')
  const rout = 'product'

  let returnData = { isProduct: false }
  let isLoad = true
  let params = {
    page: 1,
    limit: 6,
    typeId: product_container.dataset.typeid
  }

  const getProduct = async () => {
    try {
      const data = await getData({ rout, params })
      isLoad = false
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
  const render = (data) => {
    product_container.innerHTML = ''
    if (data.count > 0) {
      data.rows.forEach(data => {
        product_container.insertAdjacentHTML('beforeend', productHtml(data))
      });
      returnData.isProduct = true
    } else {
      product_container.innerHTML = productError()
    }
  }

  Promise.all([getProduct(), getBasket(), getFavourite()])
    .then(data => {
      const [product, basket, favourite] = data
      render(product)
      if (returnData.isProduct) {
        disableCardButtons(basket, '.card-button.add-btn')
        disableCardButtons(favourite, '.card-like')
        rating()
      }
      returnData.product = product
      returnData.basket = basket
      returnData.favourite = favourite
      resolve(returnData)
    })
    .catch(err => console.log(err))
})

export default renderProduct