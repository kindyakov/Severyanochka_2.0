import deleteProduct from "./modules/favourite/deleteProduct.js";
import loader from "./modules/loader.js";
import renderProduct from './modules/favourite/renderProduct.js'
import sideBar from "./modules/product/sideBar.js";
import filters from "./modules/product/filter.js";
import paginationProduct from "./modules/product/pagination.js";
import addBasket from "./modules/product/addBasket.js";

const products__container = document.querySelector('#products-container')
products__container.innerHTML = loader()
const Rout = 'favourite/product'

renderProduct.then(({ product, basket, favourite, filter, count }) => {
  sideBar(product)
  if (count > 0) {
    addBasket()
    deleteProduct()
    paginationProduct({ count, basket, favourite, Rout })
    filters({ filter, basket, favourite, Rout })
  }
})
