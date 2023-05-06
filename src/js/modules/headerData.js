import { Get } from "./product/request.js";

const headerData = () => {
  const getBasket = async () => {
    try {
      const basket = await Get('basket')
      return basket
    } catch (error) {
      console.log(error)
    }
  }
  const getFavourite = async () => {
    try {
      const favourite = await Get('favourite')
      return favourite
    } catch (error) {
      console.log(error)
    }
  }

  const renderHeader = (data) => {
    const [basket, favourite] = data
    const menuFavourites = document.querySelector('#menu-favourites')
    const menuOrders = document.querySelector('#menu-orders')
    const menuBasket = document.querySelector('#menu-basket')

    favourite ? menuFavourites.textContent = favourite.length : menuFavourites.remove()
    menuOrders.remove()
    basket ? menuBasket.textContent = basket.length : menuBasket.remove()
  }

  Promise.all([getBasket(), getFavourite()])
    .then(data => renderHeader(data))
    .catch(err => console.log(err))
}

export default headerData