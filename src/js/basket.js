import loader from "./modules/loader.js";
import { productHtml, productError } from "./modules/basket/productHtml.js";
import { getWithAuth } from "./modules/product/request.js";
import deleteProduct from "./modules/basket/deleteProduct.js";
import numberProducts from "./modules/basket/numberProducts.js";
import { checkAuth } from "./modules/user/isAuth.js";
import { GetProductLocalStorage } from "./modules/product/request.js";

const titleQuantity = document.querySelector('.main-title-quantity')
const basket__content = document.querySelector('.basket__content')
const asideInfo = document.querySelector('.basket__aside-info')
const isAuth = checkAuth()
const basketLocalData = GetProductLocalStorage('basket')

basket__content.innerHTML = loader()
asideInfo.innerHTML = loader(50)
asideInfo.style.height = '60px'

const renderProduct = (products) => {
  basket__content.innerHTML = ''
  if (products.length > 0) {
    products.forEach(product => {
      basket__content.insertAdjacentHTML('beforeend', productHtml(product))
    });
    titleQuantity.textContent = products.length
    return products
  } else {
    basket__content.innerHTML = productError()
    asideInfo.innerHTML = ''
    titleQuantity.textContent = 0
    return false
  }
}

const mainLogic = (products) => {
  if (products.length === 0) return
  deleteProduct()
  numberProducts(products)
}

const getBasket = async () => {
  try {
    if (isAuth) {
      const data = await getWithAuth('basket/product')
      renderProduct(data)
      mainLogic(data)
    } else if (basketLocalData.length > 0) {
      renderProduct(basketLocalData)
      mainLogic(basketLocalData)
    } else {
      basket__content.innerHTML = productError()
      asideInfo.innerHTML = ''
      titleQuantity.textContent = 0
    }
  } catch (error) {
    console.log("Ошибка в получения корзины:", error.message)
  }
}

getBasket()
