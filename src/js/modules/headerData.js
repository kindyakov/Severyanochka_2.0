import { Get } from "./product/request.js";

const headerData = () => {
  const getBasket = async () => {
    try {
      if (localStorage.getItem('token')) {
        const basket = await Get('basket')
        return basket
      } else return null
    } catch (error) {
      console.log(error)
    }
  }
  const getFavourite = async () => {
    try {
      if (localStorage.getItem('token')) {
        const favourite = await Get('favourite')
        return favourite
      } else return null
    } catch (error) {
      console.log(error)
    }
  }

  const renderHeader = (data) => {
    const [basket, favourite] = data
    const menuFavourites = document.querySelector('#menu-favourites')
    const menuOrders = document.querySelector('#menu-orders')
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