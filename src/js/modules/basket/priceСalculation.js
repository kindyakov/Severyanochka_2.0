import { infoProductHtml, minSumError } from "./productHtml.js"
import { url } from "../API.js"

const priceCalculation = products => {
  const asideForm = document.querySelector('.basket__aside-form')
  const asidePriceResult = document.querySelector('.basket__aside-info-price-result')
  const basketInfo = document.querySelector('.basket__aside-info')
  const asideFooter = document.querySelector('.basket__aside-footer')
  const minSum = 500
  let priceResult, asideMinsum = document.querySelector('.basket__aside-minsum')

  if (products.length === 0) {
    asidePriceResult.textContent = '0 ₽'
    return
  }

  if (products[0].count) priceResult = products.reduce((sumPrice,
    product) => sumPrice + +product.priceSum, 0).toFixed(2)
  else priceResult = products.reduce((sumPrice,
    product) => sumPrice + +product.price, 0).toFixed(2)

  asidePriceResult.textContent = priceResult + ' ₽'
  basketInfo.innerHTML = ''
  basketInfo.removeAttribute('style')

  products.forEach(product => {
    basketInfo.insertAdjacentHTML('beforeend', infoProductHtml(product))
  });

  const minSumRender = () => {
    if (priceResult <= minSum) {
      if (asideMinsum) return
      asideFooter.insertAdjacentHTML('afterbegin', minSumError(minSum))
      asideMinsum = document.querySelector('.basket__aside-minsum')
    } else {
      if (!asideMinsum) return
      asideMinsum.remove()
    }
  }

  const orderRegistration = e => {
    e.preventDefault()
    if (priceResult <= minSum && asideMinsum) {
      asideMinsum.classList.add('bounce');
      setTimeout(() => { asideMinsum.classList.remove("bounce") }, 350);
    } else if (+priceResult >= minSum) {
      location.assign(`${url}order.html`);
    }
  }

  minSumRender()
  asideForm.addEventListener('submit', orderRegistration)
}

export default priceCalculation