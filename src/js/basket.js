import loader from "./modules/loader.js";
import { productHtml, productError } from "./modules/basket/productHtml.js";
import { Get } from "./modules/product/request.js";
import deleteProduct from "./modules/basket/deleteProduct.js";
import priceCalculation from "./modules/basket/priceСalculation.js";
import NumberProducts from "./modules/basket/numberProducts.js";
import { changeAuth } from "./modules/user/isAuth.js";
import { GetProductLocalStorage } from "./modules/product/request.js";

const titleQuantity = document.querySelector('.main-title-quantity')
const basket__content = document.querySelector('.basket__content')
const asideInfo = document.querySelector('.basket__aside-info')
const isAuth = changeAuth()
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
  if (!products) return
  deleteProduct()
  priceCalculation(products)
  new NumberProducts(products)
}

const getBasket = async () => {
  try {
    if (isAuth) {
      const data = await Get('basket/product')
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
    console.log(error)
  }
}

getBasket()