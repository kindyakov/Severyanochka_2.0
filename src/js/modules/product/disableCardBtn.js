export const disableCardButtons = (products, btnSelector) => {
  if (!products) return
  products.forEach(obj => {
    const wCards = document.querySelectorAll(`.wrapper-card[data-productid="${obj.productId}"]`)
    wCards.forEach(card => {
      const cardBtn = card.querySelector(`${btnSelector}`)
      cardBtn.classList.add('disable')
    })
  });
}