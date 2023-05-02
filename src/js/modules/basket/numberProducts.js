import priceCalculation from "./priceСalculation.js";
const priceWithoutSpaces = (str) => {
  return str.replace(/[^\d.-]/g, '');
}
class NumberProducts {
  constructor(products) {
    this.Products = []
    this.creareNewArr(products)
    this.handlerClick()
  }
  creareNewArr(products) {
    products.forEach(product => {
      this.Products.push({
        id: product.id, price: +product.price,
        priceSum: +product.price, count: 1
      })
    });
  }
  quantityLoad() {
    const wCards = document.querySelectorAll('.basket__wrapper-cards')

    wCards.forEach(card => {
      const counterInput = card.querySelector('.basket__card-counter-input')
      const counterPriceSum = card.querySelector('.basket__card-counter-price-sum')
      const id = card.dataset.id

      let [product] = this.Products.filter(product => product.id === id)
      if (product) {
        product.count = +counterInput.textContent
        product.priceSum = +counterPriceSum.textContent.split(' ')[0]
      }
    })

    priceCalculation(this.Products)
  }
  quantityClick(e, dataset) {
    const wCards = e.target.closest('.basket__wrapper-cards')
    const counterInput = wCards.querySelector('.basket__card-counter-input')
    const counterPriceSum = wCards.querySelector('.basket__card-counter-price-sum')
    const id = wCards.dataset.id

    let [product] = this.Products.filter(product => product.id === id)
    if (dataset === '+') product.count = ++product.count
    if (dataset === '-' && product.count !== 1) product.count = --product.count
    product.priceSum = (product.price * product.count).toFixed(2)

    counterInput.textContent = product.count
    counterPriceSum.textContent = product.priceSum + ' ₽'

    priceCalculation(this.Products)
  }
  handlerClick() {
    window.addEventListener('click', e => {
      if (e.target.closest('.basket__card-counter-btn')) {
        const dataset = e.target.dataset.counter
        this.quantityClick(e, dataset)
      }
    })
  }

}

export default NumberProducts