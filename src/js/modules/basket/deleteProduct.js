import deleteAnimate from './deleteAnimate.js'
import { Delete } from '../product/request.js'
import NumberProducts from './numberProducts.js'
import loader from '../loader.js'

const deleteProduct = () => {
  const titleQuantity = document.querySelector('.main-title-quantity')
  const menuBasket = document.querySelector('#menu-basket')
  const deleteBtn = document.querySelector('.basket__settings-button')
  const all_checkbox = document.querySelector('.basket__card-check.basket__settings-check')
  const asideInfo = document.querySelector('.basket__aside-info')
  let checkbox = document.querySelectorAll('.basket__card-check:not(.basket__settings-check)')

  let idArr = [], wCardsDel = []

  const activeBtn = () => deleteBtn.classList.add('_active')
  const disableBtn = () => deleteBtn.classList.remove('_active')
  const assign = () => {
    wCardsDel = []
    idArr = []
    checkbox = document.querySelectorAll('.basket__card-check:not(.basket__settings-check)')
    asideInfo.innerHTML = loader(50)
  }
  const productCounter = products => {
    titleQuantity.textContent = products.length
    menuBasket.textContent = products.length
  }
  const clickAllImput = () => {
    if (all_checkbox.checked === true) {
      checkbox.forEach(input => input.checked = true)
      activeBtn()
    }
    else {
      checkbox.forEach(input => input.checked = false)
      disableBtn()
    }
  }
  const clickInput = () => {
    let checkedInputs = []
    checkbox.forEach(input => {
      if (input.checked === true) {
        checkedInputs.push(input)
        activeBtn()
        if (checkedInputs.length === checkbox.length) all_checkbox.checked = true
      } else if (checkedInputs.length === 0) {
        disableBtn()
        all_checkbox.checked = false;
      }
    })
    if (checkedInputs.length !== checkbox.length) all_checkbox.checked = false
  }
  const clickDeleteBtn = () => {
    assign()

    const inputCheked = Array.from(checkbox).filter(input => input.checked === true)
    inputCheked.forEach(input => idArr.push(input.id.split('-').reverse()[0]))

    idArr.forEach(id => wCardsDel.push(document
      .querySelector(`.basket__wrapper-cards[data-id="${id}"]`)))

    deleteAnimate(wCardsDel)

    Delete('basket', idArr)
      .then((products) => {
        disableBtn()
        productCounter(products)
        new NumberProducts(products).quantityLoad()
      })
  }
  const handlerClick = e => {
    if (e.target.closest('.basket__card-check.basket__settings-check')) {
      clickAllImput()
    }
    if (e.target.closest('.basket__card-check:not(.basket__settings-check)')) {
      clickInput()
    }
    if (e.target.classList.contains('basket__settings-button')) {
      clickDeleteBtn()
    }
  }

  window.addEventListener('click', handlerClick)
}

export default deleteProduct