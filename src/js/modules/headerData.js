import { Get } from "./product/request.js";
import { checkAuth } from "./user/isAuth.js";
import { GetProductLocalStorage } from "./product/request.js";

const headerData = () => {
  const isAuth = checkAuth()
  const basketLocalData = GetProductLocalStorage('basket')
  const favouriteLocalData = GetProductLocalStorage('favourite')

  const getBasket = async () => {
    try {
      if (isAuth) {
        const basket = await Get('basket')
        return basket
      } else return basketLocalData
    } catch (error) {
      console.log(error)
    }
  }
  const getFavourite = async () => {
    try {
      if (isAuth) {
        const favourite = await Get('favourite')
        return favourite
      } else return favouriteLocalData
    } catch (error) {
      console.log(error)
    }
  }

  const renderHeader = (data) => {
    const [basket, favourite] = data
    const menuFavourites = document.querySelector('#menu-favourite')
    const menuOrders = document.querySelector('#menu-order')
    const menuBasket = document.querySelector('#menu-basket')

    favourite ? menuFavourites.textContent = favourite.length
      : menuFavourites.textContent = 0
    menuOrders.textContent = 0
    basket ? menuBasket.textContent = basket.length
      : menuBasket.textContent = 0
  }

  Promise.all([getBasket(), getFavourite()])
    .then(data => renderHeader(data))
    .catch(err => console.log(err))
}

export default headerData