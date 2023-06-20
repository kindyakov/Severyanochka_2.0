import { saveAddress } from "./Address.js"
import { $auth } from "../API.js"

const DeliveryData = (form, products) => {
  const time_block = document.querySelectorAll('.basket__delivery-time-block:not(.time-disable)')

  let data = {}
  let formData = new FormData(form)
  formData.delete('phone')

  const priceResult = +products.reduce((sumPrice,
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

export const createOrder = async (form, products) => {
  try {
    const deliveryData = DeliveryData(form, products)
    saveAddress('.input-address')

    if (!deliveryData) return false

    const { data } = await $auth.post('api/order', { deliveryData, products })

    return data
  } catch (error) {
    console.log(error)
  }
}
