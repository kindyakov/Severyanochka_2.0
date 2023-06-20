import rating from "../product/rating.js"
import { disableCardButtons } from "../product/disableCardBtn.js";
import { checkAuth } from "../user/isAuth.js";
import { GetProductAuth } from "../product/request.js";
import { orderHtml, productOrderHtml } from "./html.js";
import { GetProductLocalStorage } from "../product/request.js";

const orderRender = new Promise((resolve, reject) => {
  const isAuth = checkAuth()
  const order_body = document.querySelector('.order__body')
  const basketLocalData = GetProductLocalStorage('basket')
  const favouriteLocalData = GetProductLocalStorage('favourite')

  const getOrder = async () => {
    try {
      const rout = 'order'
      const params = { page: 1, limit: 6, }
      const orders = await GetProductAuth({ rout, params })

      orders.rows.forEach(order => rederOrder(order));
    } catch (error) {
      console.log('Ошиюка в renderOrder:', error.message)
    }
  }

  const rederOrder = async (order) => {
    try {
      order_body.insertAdjacentHTML('beforeend', orderHtml(order))


      const order_container = order_body.querySelector(`.order__container[data-id="${order.id}"]`)

      const swiper_wrapper = order_container.querySelector('.swiper-wrapper')

      order.orderProduct.forEach(orderP => {
        swiper_wrapper.insertAdjacentHTML('beforeend', productOrderHtml(orderP))
      })

      rating()
      resolve(order)
      // reject(error.message)
    } catch (error) {
      console.error('Ошибка rederOrder', error.message)
    }
  }

  getOrder()
})

export default orderRender