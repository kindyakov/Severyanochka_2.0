import JustValidate from "just-validate";
import { ValidateOrder } from "./modules/user/validate.js";
import { checkAuth } from './modules/user/isAuth.js'
import { infoProductHtml } from "./modules/basket/productHtml.js"
import { limitationDate } from "./modules/order/limitationDate.js";
import { getAddress } from "./modules/order/Address.js";
import { createOrder } from "./modules/order/createOrder.js";
import { сhooseTime } from "./modules/order/сhooseTime.js";

const form = document.querySelector('#form-order')
const authorization_item = document.querySelector('.authorization-item')
const main_title_quantity = document.querySelector('.main-title-quantity')
const price_result = document.querySelector('.basket__aside-info-price-result')
const basket_info = document.querySelector('.basket__aside-info')

const isAuth = checkAuth()

const orderProduct = JSON.parse(localStorage.getItem('order_product'))
const priceResult = +orderProduct.reduce((sumPrice,
  product) => sumPrice + +product.priceSum, 0).toFixed(2)
const countProduct = +orderProduct.reduce((count,
  product) => count + +product.count, 0)

if (isAuth) authorization_item.classList.add('none')
else authorization_item.classList.remove('none')

main_title_quantity.textContent = countProduct

const renderAside = () => {
  if (orderProduct.length === 0) return
  price_result.textContent = priceResult + ' ₽'
  basket_info.innerHTML = ''
  orderProduct.forEach(product => {
    basket_info.insertAdjacentHTML('beforeend', infoProductHtml(product))
  });
}

const order = new JustValidate('#form-order', {
  errorLabelStyle: {
    color: '#d31111'
  },
});

ValidateOrder(order) // валидация формы

const submit = (e) => {
  order.revalidate()
    .then(isValid => isValid && createOrder(form))
}

сhooseTime('.basket__delivery-time-block')
getAddress('.input-address')
limitationDate('input[type="date"]')
renderAside()
form.addEventListener('submit', submit)
