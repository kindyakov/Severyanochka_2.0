export const disableCardButtons = (basket, btnSelector) => {
  basket.forEach(obj => {
    const wCards = document.querySelectorAll(`.wrapper-card[data-productid="${obj.productId}"]`)
    wCards.forEach(card => {
      const cardBtn = card.querySelector(`${btnSelector}`)
      cardBtn.classList.add('disable')
    })
  });
}