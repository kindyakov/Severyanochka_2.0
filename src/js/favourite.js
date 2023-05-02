import loader from "./modules/loader.js"
import { productHtml, productError } from "./modules/product/productHtml.js";
import { Get } from "./modules/product/request.js";

const titleQuantity = document.querySelector('.main-title-quantity')
const favourites__content = document.querySelector('#favourites-products')


favourites__content.innerHTML = loader()

const renderProduct = (products) => {
  favourites__content.innerHTML = ''
  if (products.length > 0) {
    products.forEach(product => {
      favourites__content.insertAdjacentHTML('beforeend', productHtml(product))
    });
    titleQuantity.textContent = products.length
    return products
  } else {
    favourites__content.innerHTML = productError()
    titleQuantity.textContent = 0
    return false
  }
}

const mainLogic = (products) => {
  if (!products) return
}

Get('favourite/product')
  .then(products => renderProduct(products))
  .then(products => mainLogic(products))