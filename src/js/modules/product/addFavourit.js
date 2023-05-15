import { Add } from "./request.js"

const addFavourite = () => {
  if (!localStorage.getItem('token')) return
  const menuFavourite = document.querySelector('#menu-favourites')
  const rout = 'favourite'
  let productId
  let counterProduct = Number(menuFavourite.textContent)

  const disableBtn = e => {
    const cardBtn = e.target.closest('.card-like')
    cardBtn.classList.add('disable')
    ++counterProduct
    menuFavourite.textContent = counterProduct
  }

  const clickBtn = e => {
    const wCard = e.target.closest('.wrapper-card')
    productId = Number(wCard.dataset.productid)

    Add(rout, productId)
      .then(data => data.isAdd && disableBtn(e))
      .catch(err => console.log(err))
  }

  const handlerClick = (e) => {
    if (e.target.closest('.card-like:not(.disable)')) {
      clickBtn(e)
    }
  }

  window.addEventListener('click', handlerClick)
}

export default addFavourite