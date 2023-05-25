import { infoProductHtml, minSumError } from "./productHtml.js"
import { url } from "../API.js"

const filterProducts = (products) => {
  let newProdust = []
  products.forEach(obj => {
    const wCard = document.querySelector(`.basket__wrapper-cards[data-id="${obj.id}"]`)
    const inputCheked = wCard && wCard.querySelector('.basket__card-check')

    if (inputCheked && inputCheked.checked === true) {
      newProdust.push(obj)
    }
  })
  return newProdust
}

const priceCalculation = products => {
  const asideForm = document.querySelector('.basket__aside-form')
  const asidePriceResult = document.querySelector('.basket__aside-info-price-result')
  const basketInfo = document.querySelector('.basket__aside-info')
  const asideFooter = document.querySelector('.basket__aside-footer')
  const minSum = 500
  let Products = filterProducts(products)

  let priceResult, asideMinsum = document.querySelector('.basket__aside-minsum')

  const checkProducts = () => {
    if (products.length === 0) {
      asidePriceResult.textContent = '0 ₽'
      return
    } else if (products.length > 0 && Products.length === 0) {
      asidePriceResult.textContent = '0 ₽'
      basketInfo.innerHTML = `<span style="color: red; text-align: center">Продукт не выбран</span>`
    }
  }

  const renderPriceResult = () => {
    if (Products.length === 0) return

    priceResult = +Products.reduce((sumPrice,
      product) => sumPrice + +product.priceSum, 0).toFixed(2)

    asidePriceResult.textContent = priceResult + ' ₽'
    basketInfo.innerHTML = ''
    basketInfo.removeAttribute('style')
  }

  const renderAside = () => {
    if (Products.length === 0) return
    basketInfo.innerHTML = ''
    Products.forEach(product => {
      basketInfo.insertAdjacentHTML('beforeend', infoProductHtml(product))
    });
  }

  const minSumRender = () => {
    if (priceResult <= minSum) {
      if (asideMinsum) return
      asideFooter.insertAdjacentHTML('afterbegin', minSumError(minSum))
      asideMinsum = document.querySelector('.basket__aside-minsum')
    } else {
      if (!asideMinsum) return
      asideMinsum.remove()
      asideMinsum = null
    }
  }

  const orderRegistration = e => {
    e.preventDefault()
    if (priceResult <= minSum && asideMinsum) {
      asideMinsum.classList.add('bounce');
      setTimeout(() => { asideMinsum.classList.remove("bounce") }, 350);
    } else if (priceResult >= minSum) {
      localStorage.setItem('order_product', JSON.stringify(Products))
      location.assign(`${url}order.html`);
    }
  }

  const performingFunctions = () => {
    checkProducts()
    renderPriceResult()
    renderAside()
    minSumRender()
  }

  const handlerClick = e => {
    if (e.target.closest('input[type="checkbox"]')) {
      Products = filterProducts(products)
      performingFunctions()
    }
  }

  performingFunctions()

  asideForm.addEventListener('submit', orderRegistration)
  window.addEventListener('click', handlerClick)
}

export default priceCalculation