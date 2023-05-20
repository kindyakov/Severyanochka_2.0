import deleteAnimate from './deleteAnimate.js'
import { Delete } from '../product/request.js'
import NumberProducts from './numberProducts.js'
import loader from '../loader.js'
import countProducts from '../countProducts.js'
import { productError } from './productHtml.js'
import { checkAuth } from '../user/isAuth.js'
import { GetProductLocalStorage } from '../product/request.js'

const deleteProduct = () => {
  const basket__content = document.querySelector('.basket__content')
  const deleteBtn = document.querySelector('.basket__settings-button')
  const all_checkbox = document.querySelector('.basket__card-check.basket__settings-check')
  const asideInfo = document.querySelector('.basket__aside-info')
  let checkbox = document.querySelectorAll('.basket__card-check:not(.basket__settings-check)')
  const isAuth = checkAuth()
  let idArr = [], wCardsDel = []

  const activeBtn = () => deleteBtn.classList.add('_active')
  const disableBtn = () => deleteBtn.classList.remove('_active')
  const assign = () => {
    wCardsDel = []
    idArr = []
    checkbox = document.querySelectorAll('.basket__card-check:not(.basket__settings-check)')
    asideInfo.innerHTML = loader(50)
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

  const filterBasketLocal = (basket) => {
    let newBasketLocalData = basket
    for (const id of idArr) {
      newBasketLocalData = newBasketLocalData.filter(obj => obj.id !== id)
    }
    return newBasketLocalData
  }
  const mainLogic = (products) => {
    disableBtn()
    new NumberProducts(products).quantityLoad()
    countProducts('.main-title-quantity', '#menu-basket', products)
  }
  const deleteProduct = async () => {
    try {
      const products = isAuth ? await Delete('basket', idArr) : deleteProductLocalStorage()
      if (products.length > 0) {
        mainLogic(products)
      } else {
        basket__content.innerHTML = productError()
        asideInfo.innerHTML = ''
        mainLogic(products)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProductLocalStorage = () => {
    const basketLocalData = GetProductLocalStorage('basket')
    const newBasketLocalData = filterBasketLocal(basketLocalData)
    localStorage.setItem('basket', JSON.stringify(newBasketLocalData))
    return newBasketLocalData
  }

  const clickDeleteBtn = () => {
    assign()

    const inputCheked = Array.from(checkbox).filter(input => input.checked === true)
    inputCheked.forEach(input => idArr.push(input.id.split('-').reverse()[0]))

    idArr.forEach(id => wCardsDel.push(document
      .querySelector(`.basket__wrapper-cards[data-id="${id}"]`)))

    deleteAnimate(wCardsDel)
    deleteProduct()
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