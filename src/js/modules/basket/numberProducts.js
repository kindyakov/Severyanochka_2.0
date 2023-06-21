import PriceCalculation from "./priceСalculation.js";

const priceWithoutSpaces = (str) => {
  return str.replace(/[^\d.-]/g, '');
}

const createNewArr = (products) => {
  let newProducts = []
  products.map(product => {
    newProducts.push({
      id: product.id, price: +product.price,
      priceSum: +product.price, count: 1
    })
  });
  return newProducts
}

const numberProducts = (products) => {
  let newProducts = createNewArr(products)
  const priceCalculation = new PriceCalculation()

  const quantityLoad = () => {
    const wCards = document.querySelectorAll('.basket__wrapper-cards')

    wCards.forEach(card => {
      const counterInput = card.querySelector('.basket__card-counter-input')
      const counterPriceSum = card.querySelector('.basket__card-counter-price-sum')
      const id = card.dataset.id

      let [product] = newProducts.filter(product => product.id === id)
      if (product) {
        product.count = +counterInput.textContent
        product.priceSum = +counterPriceSum.textContent.split(' ')[0]
      }
    })

    priceCalculation.performingFunctions(newProducts)
  }

  const quantityClick = (e, counter) => {
    const wCards = e.target.closest('.basket__wrapper-cards')
    const counterInput = wCards.querySelector('.basket__card-counter-input')
    const counterPriceSum = wCards.querySelector('.basket__card-counter-price-sum')
    const id = wCards.dataset.id

    let [product] = newProducts.filter(product => product.id === id)
    if (counter === '+') product.count = ++product.count
    if (counter === '-' && product.count !== 1) product.count = --product.count
    product.priceSum = +(product.price * product.count).toFixed(2)

    counterInput.textContent = product.count
    counterPriceSum.textContent = product.priceSum + ' ₽'

    priceCalculation.performingFunctions(newProducts)
  }

  const handlerClick = e => {
    if (e.target.closest('.basket__card-counter-btn')) {
      const counter = e.target.dataset.counter
      quantityClick(e, counter)
    }
    if (e.target.closest('input[type="checkbox"]')) {
      priceCalculation.performingFunctions(newProducts)
    }
  }

  quantityLoad()
  window.addEventListener('click', handlerClick)
}

export default numberProducts