import { Add } from "./request/request.js"

const addFavourite = () => {
  const rout = 'favourite'
  let productId

  const disableBtn = e => {
    const cardBtn = e.target.closest('.card-like')
    cardBtn.classList.add('disable')
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