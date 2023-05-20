import loader from "./modules/loader.js";
import renderProduct from "./modules/product/renderProduct.js";
import addProducts from "./modules/product/addProducts.js";
import paginationProduct from "./modules/product/pagination.js";
import sideBar from "./modules/product/sideBar.js";
import filters from "./modules/product/filter.js";
import { useDynamicAdapt } from "./modules/dynamicAdapt.js";

const productsContainer = document.querySelector('#products-container')
productsContainer.innerHTML = loader()
const Rout = 'product'

renderProduct.then(({ basket, favourite, filter, count }) => {
  sideBar()
  if (count > 0) {
    addProducts('basket', '.card-button')
    addProducts('favourite', '.card-like')
    paginationProduct({ count, basket, favourite, Rout })
    filters({ filter, basket, favourite, Rout })
    useDynamicAdapt()
  }
})

