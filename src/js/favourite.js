import deleteProduct from "./modules/favourite/deleteProduct.js";
import loader from "./modules/loader.js";
import renderProduct from './modules/favourite/renderProduct.js'
import sideBar from "./modules/product/sideBar.js";

const favourites__content = document.querySelector('#favourites-products')
favourites__content.innerHTML = loader()

renderProduct.then(product => {
  sideBar(product)
  if (!product) return
  deleteProduct()
})
