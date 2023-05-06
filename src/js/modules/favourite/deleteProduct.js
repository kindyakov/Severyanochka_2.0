import { remove } from "../product/request.js"
import countProducts from "../countProducts.js"
import { productError } from "../product/productHtml.js"

const deleteProduct = () => {
  const products__container = document.querySelector('#products-container')

  const handlerClick = e => {
    if (e.target.closest('.card-delete')) {
      const wCard = e.target.closest('.wrapper-card')
      const id = wCard.dataset.productid

      remove('favourite', id)
        .then(products => {
          wCard.remove()
          countProducts('.main-title-quantity', '#menu-favourites', products)
          if (products.length === 0) products__container.innerHTML = productError()
        })
        .catch(err => console.log(err))
    }
  }
  window.addEventListener('click', handlerClick)
}

export default deleteProduct