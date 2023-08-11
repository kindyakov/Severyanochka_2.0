import JustValidate from "just-validate";
import { ValidateOrder } from "../user/validate.js";
import { checkAuth } from '../user/isAuth.js'
import { infoProductHtml } from "../basket/productHtml.js"
import { limitationDate } from "./limitationDate.js";
import { getAddress } from "./Address.js";
import { createOrder } from "./createOrder.js";
import { сhooseTime } from "./сhooseTime.js";
import { Delete } from "../product/request.js";

const delivery = (products) => {
  const basket_settings = document.querySelector('.basket__settings')
  const form = document.querySelector('#form-order')
  const authorization_item = form.querySelector('.authorization-item')
  const main_title_quantity = document.querySelector('.main-title-quantity')
  const price_result = form.querySelector('.basket__aside-info-price-result')
  const basket_info = form.querySelector('.basket__aside-info')
  const success_order = document.querySelector('#success-order')

  const isAuth = checkAuth()

  const order = new JustValidate('#form-order', {
    errorLabelStyle: {
      color: '#d31111'
    },
  });

  if (isAuth) authorization_item.classList.add('none')
  else authorization_item.classList.remove('none')

  const renderAside = () => {
    if (!products) return

    const priceResult = +products.reduce((sumPrice,
      product) => sumPrice + +product.priceSum, 0).toFixed(2)
    const countProduct = +products.reduce((count,
      product) => count + +product.count, 0)

    main_title_quantity.textContent = countProduct
    price_result.textContent = priceResult + ' ₽'
    basket_info.innerHTML = ''

    products.forEach(product => {
      basket_info.insertAdjacentHTML('beforeend', infoProductHtml(product))
    });
  }

  const request = async () => {
    try {
      const orderData = await createOrder(form, products)
      const idArr = products.map(obj => obj.id)

      if (orderData) {
        await Delete('basket', idArr)
        form.classList.add('_none')
        success_order.classList.remove('_none')
      }
    } catch (error) {
      console.log('Ошибка в создании заказа', error)
    }
  }

  const submit = (e) => {
    order.revalidate().then(isValid => isValid && request())
  }

  const handleClick = e => {
    if (e.target.closest('.payment-btn2')) {
      submit()
    }
  }

  ValidateOrder(order) // валидация формы
  сhooseTime('.basket__delivery-time-block')
  getAddress('.input-address')
  limitationDate('input[type="date"]')
  renderAside()

  document.addEventListener('click', handleClick)
}

export default delivery
