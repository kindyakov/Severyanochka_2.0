import deleteProduct from "./modules/favourite/deleteProduct.js";
import loader from "./modules/loader.js";
import renderProduct from './modules/favourite/renderProduct.js'
import sideBar from "./modules/product/sideBar.js";
import filters from "./modules/product/filter.js";
import paginationProduct from "./modules/product/pagination.js";
import addProducts from './modules/product/addProducts.js'
import { checkAuth } from "./modules/user/isAuth.js";

const aside = document.querySelector('.catalog-products__filters')
const products__content = document.querySelector('.catalog-products__content')
const products__container = document.querySelector('#products-container')
const filterMenu = document.querySelector('.filter-menu')
const products__footer = document.querySelector('.catalog-products__footer')

const Rout = 'favourite/product'
const isAuth = checkAuth()

products__container.innerHTML = loader()

const disableFilter = () => {
  aside.classList.add('not-authorized')
  filterMenu.classList.add('not-authorized')
  products__content.classList.add('not-authorized')
  products__footer.classList.add('not-authorized')
}

renderProduct.then(({ basket, favourite, filter, count }) => {
  isAuth && sideBar()
  if (count > 0) {
    addProducts('basket', '.card-button')
    deleteProduct()
    if (isAuth) {
      paginationProduct({ count, basket, favourite, Rout })
      filters({ filter, basket, favourite, Rout })
    } else disableFilter()
  }
})
