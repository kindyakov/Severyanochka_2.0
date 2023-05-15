import { Add } from "./request.js"

const addBasket = () => {
  if (!localStorage.getItem('token')) return
  const menuBasket = document.querySelector('#menu-basket')
  const rout = 'basket'
  let productId
  let counterProduct = Number(menuBasket.textContent)

  const disableBtn = e => {
    const cardBtn = e.target.closest('.card-button.add-btn')
    cardBtn.classList.add('disable')
    ++counterProduct
    menuBasket.textContent = counterProduct
  }

  const clickBtn = e => {
    const wCard = e.target.closest('.wrapper-card')
    productId = Number(wCard.dataset.productid)

    Add(rout, productId)
      .then(data => data.isAdd && disableBtn(e))
      .catch(err => console.log(err))
  }

  const handlerClick = (e) => {
    if (e.target.closest('.card-button.add-btn:not(.disable)')) {
      clickBtn(e)
    }
  }

  window.addEventListener('click', handlerClick)
}

export default addBasket