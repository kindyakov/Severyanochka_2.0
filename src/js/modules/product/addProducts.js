import { Add, GetProductId, GetProductLocalStorage } from "./request.js"
import { checkAuth } from '../user/isAuth.js'

const addProducts = (rout, selectorBtn) => {
  const menuCount = document.querySelector(`#menu-${rout}`)
  let productId
  let counterProduct = Number(menuCount.textContent)
  const isAuth = checkAuth()

  const disableBtn = e => {
    const cardBtn = e.target.closest(selectorBtn)
    cardBtn.classList.add('disable')
    ++counterProduct
    menuCount.textContent = counterProduct
  }

  const addBasketLocal = (products) => {
    const basketLocalData = GetProductLocalStorage(rout)
    basketLocalData.push(products)
    localStorage.setItem(rout, JSON.stringify(basketLocalData))
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
    if (e.target.closest(`${selectorBtn}:not(.disable)`)) {
      clickBtn(e)
    }
  }

  window.addEventListener('click', handlerClick)
}

export default addProducts