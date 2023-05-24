import { remove } from "../product/request.js"
import countProducts from "../countProducts.js"
import { productError } from "../product/productHtml.js"
import { checkAuth } from "../user/isAuth.js"
import { GetProductLocalStorage } from "../product/request.js"

const deleteProduct = () => {
  const products__container = document.querySelector('#products-container')
  const isAuth = checkAuth()

  const deleteProductLocalStorage = (id) => {
    const favouriteLocalData = GetProductLocalStorage('favourite')
    const newFavouriteLocalData = favouriteLocalData.filter(obj => obj.id !== id)
    localStorage.setItem('favourite', JSON.stringify(newFavouriteLocalData))
    return newFavouriteLocalData
  }

  const deleteFavoyrite = async (id) => {
    try {
      const products = isAuth ? await remove('favourite', id) : deleteProductLocalStorage(id)

      countProducts('.main-title-quantity', '#menu-favourite', products)
      if (products.length === 0) products__container.innerHTML = productError()
    } catch (error) {
      console.log(error)
    }
  }

  const handlerClick = e => {
    if (e.target.closest('.card-delete')) {
      const wCard = e.target.closest('.wrapper-card')
      const id = wCard.dataset.productid

      deleteFavoyrite(id)
    }
  }
  window.addEventListener('click', handlerClick)
}

export default deleteProduct