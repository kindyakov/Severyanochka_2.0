import { checkAuth } from "../user/isAuth.js";

export const disableCardButtons = (products, btnSelector) => {
  const isAuth = checkAuth()
  if (!products) return
  products.forEach(obj => {
    const wCards = document.querySelectorAll(`.wrapper-card[data-productid="${isAuth ? obj.productId : obj.id}"]`)
    wCards.forEach(card => {
      const cardBtn = card.querySelector(`${btnSelector}`)
      cardBtn.classList.add('disable')
    })
  });
}