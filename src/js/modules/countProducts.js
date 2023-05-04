const countProducts = (titleSelector, menuSelector, products) => {
  const titleQuantity = document.querySelector(`${titleSelector}`)
  const menu = document.querySelector(`${menuSelector}`)
  titleQuantity.textContent = products.length
  menu.textContent = products.length
}

export default countProducts