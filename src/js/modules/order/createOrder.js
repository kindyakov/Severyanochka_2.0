import { GetProductLocalStorage } from "../product/request.js"
import { saveAddress } from "./Address.js"
import { $auth } from "../API.js"

const orderProduct = GetProductLocalStorage('order_product')

const DeliveryData = (form) => {
  const time_block = document.querySelectorAll('.basket__delivery-time-block:not(.time-disable)')

  let data = {}
  let formData = new FormData(form)
  formData.delete('phone')

  const priceResult = +orderProduct.reduce((sumPrice,
    product) => sumPrice + +product.priceSum, 0).toFixed(2)
  formData.set('price', priceResult)

  time_block.forEach(block => {
    if (block.classList.contains('active')) {
      formData.set('delivery_time', block.dataset.time)
    }
  })

  Array.from(formData).forEach(arr => {
    data[arr[0]] = arr[1]
  })

  return data
}

export const createOrder = async (form) => {
  try {
    const deliveryData = DeliveryData(form)


    const { data } = await $auth.post('api/order', { deliveryData, orderProduct })

    saveAddress('.input-address')
    return data
  } catch (error) {
    console.log(error)
  }
}
