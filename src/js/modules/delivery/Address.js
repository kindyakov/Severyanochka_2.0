export const getAddress = (selector) => {
  const deliveryAddress = JSON.parse(localStorage.getItem('delivery_address'))
  if (!deliveryAddress) return
  const inputs = document.querySelectorAll(selector)
  inputs.forEach(input => {
    input.value = deliveryAddress[input.name]
  })
}

export const saveAddress = (selector) => {
  let deliveryAddress = {}
  const inputs = document.querySelectorAll(selector)
  inputs.forEach(input => {
    deliveryAddress[input.name] = input.value
  })
  localStorage.setItem('delivery_address', JSON.stringify(deliveryAddress))
}
