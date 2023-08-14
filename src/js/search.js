import { productHtml } from './modules/product/productHtml.js'
import addProducts from "./modules/product/addProducts.js";
import rating from './modules/product/rating.js'
import { disableCardButtons } from "./modules/product/disableCardBtn.js"
import { checkAuth } from "./modules/user/isAuth.js"
import { GetProductLocalStorage, getWithAuth, search } from "./modules/product/request.js"

const spanValue = document.querySelector('.search-result__value')
const notFound = document.querySelector('.search-result__error')
const result_content = document.querySelector('.search-result__content')
const isAuth = checkAuth()
const basketLocalData = GetProductLocalStorage('basket')
const favouriteLocalData = GetProductLocalStorage('favourite')

const searchProduct = async () => {
  try {
    const currentURL = new URL(window.location.href)
    const queryParams = currentURL.searchParams
    const value = queryParams.get("search")
    spanValue.textContent = value

    const data = await search('product', value);
    const [basket, favourite] = await Promise.all([getWithAuth('basket'), getWithAuth('favourite')])

    if (data.length > 0) {
      notFound.style.display = 'none'
      renderProduct(data)
      disableCardBtn(basket, favourite)
    } else {
      notFound.style.display = 'inline'
    }
  } catch (error) {
    console.log('Ошибка при поиске:', error.message)
  }
}

const renderProduct = (data) => {
  data.forEach(card => {
    result_content.insertAdjacentHTML('beforeend', productHtml(card))
  })
  addProducts('basket', '.card-button')
  addProducts('favourite', '.card-like')
  rating()
}

const disableCardBtn = (basket, favourite) => {
  const btnBasket = '.card-button.add-btn'
  const btnFavourite = '.card-like'
  if (isAuth) {
    disableCardButtons(basket, btnBasket)
    disableCardButtons(favourite, btnFavourite)
  } else {
    disableCardButtons(basketLocalData, btnBasket)
    disableCardButtons(favouriteLocalData, btnFavourite)
  }
}

searchProduct()



