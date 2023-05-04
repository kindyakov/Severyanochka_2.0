import { remove } from "../product/request.js"
import countProducts from "../countProducts.js"

const deleteProduct = () => {

  const handlerClick = e => {
    if (e.target.closest('.card-delete')) {
      const wCard = e.target.closest('.wrapper-card')
      const id = wCard.dataset.productid

      remove('favourite', id)
        .then(products => {
          wCard.remove()
          countProducts('.main-title-quantity', '#menu-favourites', products)
        })
        .catch(err => console.log(err))
    }
  }
  window.addEventListener('click', handlerClick)
}

export default deleteProduct