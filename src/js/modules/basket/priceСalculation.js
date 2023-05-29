import { infoProductHtml, minSumError } from "./productHtml.js"
import delivery from "../delivery/delivery.js"

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
  const basket_product = document.querySelector('#basket-product')
  const form_order = document.querySelector('#form-order')
  const main_title = document.querySelector('.main__title')
  const basket_settings = document.querySelector('.basket__settings')
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

  const displayDelivery = () => {
    basket_product.classList.add('_none')
    basket_settings.classList.add('_none')
    form_order.classList.remove('_none')
    main_title.textContent = 'Доставка'
  }

  const orderRegistration = e => {
    e.preventDefault()
    if (priceResult <= minSum && asideMinsum) {
      asideMinsum.classList.add('bounce');
      setTimeout(() => { asideMinsum.classList.remove("bounce") }, 350);
    } else if (priceResult >= minSum) {
      displayDelivery()
      delivery(Products)
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
    if (e.target.closest('.basket__aside-button')) {
      orderRegistration(e)
    }
  }

  performingFunctions()

  window.addEventListener('click', handlerClick)
}

export default priceCalculation