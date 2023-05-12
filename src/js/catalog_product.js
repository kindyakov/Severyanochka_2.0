import loader from "./modules/loader.js";
import renderProduct from "./modules/product/renderProduct.js";
import addBasket from "./modules/product/addBasket.js";
import addFavourite from "./modules/product/addFavourit.js";
import paginationProduct from "./modules/product/pagination.js";
import sideBar from "./modules/product/sideBar.js";
import filters from "./modules/product/filter.js";
import { useDynamicAdapt } from "./modules/dynamicAdapt.js";

const productsContainer = document.querySelector('#products-container')
productsContainer.innerHTML = loader()
const Rout = 'product'

renderProduct.then(({ product, basket, favourite, filter, count }) => {
  sideBar(product)
  if (count > 0) {
    addBasket()
    addFavourite()
    paginationProduct({ count, basket, favourite, Rout })
    filters({ filter, basket, favourite, Rout })
    useDynamicAdapt()
  }
})

