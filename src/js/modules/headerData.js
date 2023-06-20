import { Get } from "./product/request.js";
import { checkAuth } from "./user/isAuth.js";
import { GetProductLocalStorage } from "./product/request.js";
import { $auth } from "./API.js";

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

  const getOrder = async () => {
    try {
      const order = await Get('order/list')
      return order
    } catch (error) {
      console.log(error)
    }
  }

  const addProducts = async (rout, idArr) => {
    try {
      const data = await $auth.post(`api/${rout}/add`, idArr)
      window.location.reload()
      delete localStorage[rout];
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const renderHeader = ({ basket, favourite, order }) => {
    const menuFavourites = document.querySelector('#menu-favourite')
    const menuOrders = document.querySelector('#menu-order')
    const menuBasket = document.querySelector('#menu-basket')

    favourite ? menuFavourites.textContent = favourite.length
      : menuFavourites.textContent = 0

    order ? menuOrders.textContent = order.length : menuOrders.textContent = 0

    basket ? menuBasket.textContent = basket.length
      : menuBasket.textContent = 0
  }

  const uniqueProduct = (productLocalData, idArr, rout) => {
    if (productLocalData.length === 0) return
    const idArrLocal = productLocalData.map(obj => obj.id)
    const filterLocalData = idArrLocal.filter(id =>
      !idArr.includes(id));

    if (filterLocalData.length === 0) return
    addProducts(rout, filterLocalData)
  }

  const synchronizationDatabaseLocalStorage = (basket, favourite) => {
    if (!isAuth) return
    const arrBasketId = basket.map(obj => obj.productId)
    const arrFavouriteId = favourite.map(obj => obj.productId)

    uniqueProduct(basketLocalData, arrBasketId, 'basket')
    uniqueProduct(favouriteLocalData, arrFavouriteId, 'favourite')
  }

  Promise.all([getBasket(), getFavourite(), getOrder()])
    .then(data => {
      const [basket, favourite, order] = data

      renderHeader({ basket, favourite, order })
      synchronizationDatabaseLocalStorage(basket, favourite)
    })
    .catch(err => console.error(err.message))
}

export default headerData