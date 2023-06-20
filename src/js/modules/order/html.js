import translit from "../translite.js"
import { apiImgProducts } from "../API.js"

const renderImgProduct = (arr, name) => {
  const images = JSON.parse(arr)
  const srcImg = `${apiImgProducts}${translit(name)}/`
  const [img] = images
  return `${srcImg}${img}`
}

export const productOrderHtml = (obj) => {
  return `<div class="wrapper-card swiper-slide" data-productId="${obj.product.id}">
  <div class="card">
    <a href="" class="card-wrapper-img">
      <img src="${renderImgProduct(obj.product.img, obj.product.name)}" alt="${obj.product.name}" class="card-img">
      ${obj.product.discount ? `<span class="card-discount">${obj.product.discount}%</span>` : ''}
    </a>
    <div class="card-content">
      <div class="card-wrapper-price">
        <p class="card-price-text">
          <span class="card-price__ordinary card-price">${obj.product.price} ₽</span>
          <i class="card-price__i">Обычная</i>
        </p>
      <p class="card-price-text">
        ${obj.product.price_card ? `<span class="card-price__card card-price">${obj.product.price_card} ₽</span>
        <i>С картой</i>` : ''}
      </p></div>
      <div class="card-info">
        <a href="" class="card-name-product">${obj.product.name}</a>
        <div class="card-rating">
          <div class="card-rating__active">
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
          </div>
          <div class="card-rating__items" data-rating="${obj.product.rating}">
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
          </div>
        </div>
      </div>
      <button class="card-button add-btn">В корзину</button>
    </div>
    <span class="card-like _icon-shape like"></span>
    <div class="_icon-cart count-product">${obj.count}</div>
  </div>
  </div>`
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

const infoOrder = ['Получен', 'В процессе', 'Не доставили', 'Возврат']

export const orderHtml = (obj) => {
  return `
  <div class="order__container" data-id="${obj.id}">
    <div class="order__container_header">
      <div class="order__container_row">
        <span class="order__container_dateTime">${formatDate(obj.delivery_datum.delivery_date)}</span>
        <span class="order__container_dateTime">${obj.delivery_datum.delivery_time}</span>
        <span class="order__container_infoOrder">${infoOrder[obj.delivery_datum.delivery_information]}</span>
      </div>
      <div class="order__container_row">
        <span class="order__container_price">${obj.delivery_datum.price} ₽</span>
        <input type="date" name="date" class="order__container_inputDate">
      </div>
    </div>
    <div class="order__container-swiper swiper">
      <div class="swiper-wrapper">
      </div>
      <div class="swiper-button-prev products-swiper-prev"></div>
      <div class="swiper-button-next products-swiper-next"></div>
    </div>
  <button class="order__showBtn">Посмотреть заказ</button>
</div>`
}

