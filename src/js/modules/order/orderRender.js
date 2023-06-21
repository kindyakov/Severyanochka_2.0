import rating from "../product/rating.js"
import { disableCardButtons } from "../product/disableCardBtn.js";
import { checkAuth } from "../user/isAuth.js";
import { GetProductAuth } from "../product/request.js";
import { orderHtml, productOrderHtml } from "./html.js";
import { GetProductLocalStorage } from "../product/request.js";
import { Get } from "../product/request.js";

const orderRender = new Promise((resolve, reject) => {
  const isAuth = checkAuth()
  const order_body = document.querySelector('.order__body')
  const basketLocalData = GetProductLocalStorage('basket')
  const favouriteLocalData = GetProductLocalStorage('favourite')

  const getBasket = async () => {
    try {
      if (isAuth) {
        const basket = await Get('basket')
        return basket
      } else return basketLocalData
    } catch (error) {
      console.log(error)
    }
  }

  const getFavourite = async () => {
    try {
      if (isAuth) {
        const favourite = await Get('favourite')
        return favourite
      } else return favouriteLocalData
    } catch (error) {
      console.log(error)
    }
  }

  const getOrder = async () => {
    try {
      const rout = 'order'
      const params = { page: 1, limit: 6, }
      const orders = await GetProductAuth({ rout, params })

      order_body.innerHTML = ''
      orders.rows.forEach(order => rederOrder(order));
      return orders
    } catch (error) {
      console.log('Ошиюка в renderOrder:', error.message)
    }
  }

  const rederOrder = async (order) => {
    try {
      order_body.insertAdjacentHTML('beforeend', orderHtml(order))


      const order_container = order_body.querySelector(`.order__container[data-orderid="${order.id}"]`)

      const swiper_wrapper = order_container.querySelector('.swiper-wrapper')

      order.orderProduct.forEach(orderP => {
        swiper_wrapper.insertAdjacentHTML('beforeend', productOrderHtml(orderP))
      })
    } catch (error) {
      console.error('Ошибка rederOrder', error.message)
    }
  }

  const main = async () => {
    try {
      const [basket, favourite, orders] = await Promise.all([getBasket(), getFavourite(), getOrder()])

      disableCardButtons(basket, '.card-button')
      disableCardButtons(favourite, '.card-like')
      rating()
      resolve({ basket, favourite, orders })
    } catch (error) {
      console.error('Ошибка в order функция main:', error.message)
    }
  }

  main()
})

export default orderRender