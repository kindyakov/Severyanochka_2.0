const deleteAnimate = (array) => {
  const cardsDelete = array
  const durationHeight = 150;
  const delay = 150
  let indexAnim = 0

  const animate = () => {
    const wCard = cardsDelete[indexAnim];
    const card = wCard.querySelector('.basket__card');

    let animTranslateX = card.animate([
      { transform: 'translateX(0px)', opacity: '1' },
      { transform: 'translateX(-100%)', opacity: '0' },
    ], { duration: 250 });

    animTranslateX.addEventListener('finish', () => {
      wCard.style.opacity = '0';

      let animHeight = wCard.animate([
        { height: wCard.clientHeight + 'px', marginBottom: 30 + 'px' },
        { height: 0, margin: 0 + 'px' },
      ], { duration: durationHeight })

      animHeight.addEventListener('finish', () => wCard.remove());
    })

    indexAnim++;
    if (indexAnim < cardsDelete.length) setTimeout(() => animate(), delay);
  }

  animate()
}

export default deleteAnimate