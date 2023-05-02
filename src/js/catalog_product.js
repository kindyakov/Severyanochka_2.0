import loader from "./modules/loader.js";
import renderProduct from "./modules/product/renderProduct.js";
import addBasket from "./modules/product/addBasket.js";
import addFavourite from "./modules/product/addFavourit.js";
import paginationProduct from "./modules/product/pagination.js";

const productsContainer = document.querySelector('#products-container')
productsContainer.innerHTML = loader()

renderProduct.then(({ isProduct, product, basket, favourite }) => {
  if (isProduct) {
    addBasket()
    addFavourite()
    paginationProduct(product.count, basket, favourite)
  }
})

