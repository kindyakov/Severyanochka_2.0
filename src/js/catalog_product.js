import loader from "./modules/loader.js";
import renderProduct from "./modules/product/renderProduct.js";
import addBasket from "./modules/product/addBasket.js";
import addFavourite from "./modules/product/addFavourit.js";
import paginationProduct from "./modules/product/pagination.js";
import sideBar from "./modules/product/sideBar.js";
import filters from "./modules/product/filter.js";

const productsContainer = document.querySelector('#products-container')
productsContainer.innerHTML = loader()


renderProduct.then(({ product, basket, favourite, filter }) => {
  sideBar(product)
  if (product.count > 0) {
    addBasket()
    addFavourite()
    paginationProduct(product.count, basket, favourite)
    filters(filter, basket, favourite)
  }
})

