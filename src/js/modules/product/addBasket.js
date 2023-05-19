import { Add, GetProductId, GetProductLocalStorage } from "./request.js"
import { changeAuth } from '../user/isAuth.js'

const addBasket = () => {
  const menuBasket = document.querySelector('#menu-basket')
  const rout = 'basket'
  let productId
  let counterProduct = Number(menuBasket.textContent)
  const isAuth = changeAuth()

  const disableBtn = e => {
    const cardBtn = e.target.closest('.card-button.add-btn')
    cardBtn.classList.add('disable')
    ++counterProduct
    menuBasket.textContent = counterProduct
  }

  const addBasketLocal = (products) => {
    const basketLocalData = GetProductLocalStorage('basket')
    basketLocalData.push(products)
    localStorage.setItem('basket', JSON.stringify(basketLocalData))
  }

  const clickBtn = e => {
    const wCard = e.target.closest('.wrapper-card')
    productId = Number(wCard.dataset.productid)

    if (isAuth) {
      Add(rout, productId)
        .then(data => data.isAdd && disableBtn(e))
        .catch(err => console.log(err))
    } else {
      GetProductId(productId)
        .then(data => {
          addBasketLocal(data)
          disableBtn(e)
        })
        .catch(err => console.log(err))
    }
  }

  const handlerClick = (e) => {
    if (e.target.closest('.card-button.add-btn:not(.disable)')) {
      clickBtn(e)
    }
  }

  window.addEventListener('click', handlerClick)
}

export default addBasket