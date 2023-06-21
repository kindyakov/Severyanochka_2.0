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

class PriceCalculation {
  constructor() {
    this.asidePriceResult = document.querySelector('.basket__aside-info-price-result')
    this.basketInfo = document.querySelector('.basket__aside-info')
    this.asideFooter = document.querySelector('.basket__aside-footer')
    this.minSum = 500

    this.priceResult = 0
    this.asideMinsum = document.querySelector('.basket__aside-minsum')

    window.addEventListener('click', this.handlerClick)
  }


  checkProducts = () => {
    if (this.products.length === 0) {
      this.asidePriceResult.textContent = '0 ₽'
      return
    } else if (this.products.length > 0 && this.Products.length === 0) {
      this.asidePriceResult.textContent = '0 ₽'
      this.basketInfo.innerHTML = `<span style="color: red; text-align: center">Продукт не выбран</span>`
    }
  }

  renderPriceResult = () => {
    if (this.Products.length === 0) return

    this.priceResult = +this.Products.reduce((sumPrice,
      product) => sumPrice + +product.priceSum, 0).toFixed(2)

    this.asidePriceResult.textContent = this.priceResult + ' ₽'
    this.basketInfo.innerHTML = ''
    this.basketInfo.removeAttribute('style')
  }

  renderAside = () => {
    if (this.Products.length === 0) return
    this.basketInfo.innerHTML = ''
    this.Products.forEach(product => {
      this.basketInfo.insertAdjacentHTML('beforeend', infoProductHtml(product))
    });
  }

  minSumRender = () => {
    if (this.priceResult <= this.minSum) {
      if (this.asideMinsum) return
      this.asideFooter.insertAdjacentHTML('afterbegin', minSumError(this.minSum))
      this.asideMinsum = document.querySelector('.basket__aside-minsum')
    } else {
      if (!this.asideMinsum) return
      this.asideMinsum.remove()
      this.asideMinsum = null
    }
  }

  performingFunctions = (products) => {
    this.products = products
    this.Products = filterProducts(this.products)
    this.checkProducts()
    this.renderPriceResult()
    this.renderAside()
    this.minSumRender()
  }

  displayDelivery = () => {
    document.querySelector('#basket-product').classList.add('_none')
    document.querySelector('.basket__settings').classList.add('_none')
    document.querySelector('#form-order').classList.remove('_none')
    document.querySelector('.main__title').textContent = 'Доставка'
  }

  orderRegistration = e => {
    e.preventDefault()
    if (this.priceResult <= this.minSum && this.asideMinsum) {
      this.asideMinsum.classList.add('bounce');
      setTimeout(() => { this.asideMinsum.classList.remove("bounce") }, 350);
    } else if (this.priceResult >= this.minSum) {
      this.displayDelivery()
      delivery(this.Products)
    }
  }

  handlerClick = e => {
    if (e.target.closest('input[type="checkbox"]')) {
      // this.performingFunctions(products)
    }
    if (e.target.closest('.making-order-btn')) {
      this.orderRegistration(e)
    }
  }
}
export default PriceCalculation