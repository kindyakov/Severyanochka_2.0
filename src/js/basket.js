import { productHtml, productError } from "./modules/basket/productHtml.js";
import { Get } from "./modules/product/request.js";
import deleteProduct from "./modules/basket/deleteProduct.js";
import priceCalculation from "./modules/basket/priceСalculation.js";
import NumberProducts from "./modules/basket/numberProducts.js";

const titleQuantity = document.querySelector('.main-title-quantity')
const basket__content = document.querySelector('.basket__content')

const renderProduct = (products) => {
  if (products.length > 0) {
    products.forEach(product => {
      basket__content.insertAdjacentHTML('beforeend', productHtml(product))
    });
    titleQuantity.textContent = products.length
    return products
  } else {
    basket__content.innerHTML = productError()
    titleQuantity.textContent = 0
    return false
  }

}
const mainLogic = (products) => {
  if (!products) return
  deleteProduct()
  priceCalculation(products)
  new NumberProducts(products)
}

Get('basket/product')
  .then(products => renderProduct(products))
  .then(products => mainLogic(products))
  .catch(err => console.log(err))