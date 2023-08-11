import { renderImgProduct, createProductURL } from "../API.js"

export const productOrderHtml = (data) => {
  return `<div class="wrapper-card swiper-slide" data-productId="${data.product.id}">
  <div class="card">
    <a href="${createProductURL(data.product.type.name, data.product.name)}" class="card-wrapper-img">
      <img src="${renderImgProduct(data.product.img, data.product.name)}" alt="${data.product.name}" class="card-img">
      ${data.product.discount ? `<span class="card-discount">${data.product.discount}%</span>` : ''}
    </a>
    <div class="card-content">
      <div class="card-wrapper-price">
        <p class="card-price-text">
          <span class="card-price__ordinary card-price">${data.product.price} ₽</span>
          <i class="card-price__i">Обычная</i>
        </p>
      <p class="card-price-text">
        ${data.product.price_card ? `<span class="card-price__card card-price">${data.product.price_card} ₽</span>
        <i>С картой</i>` : ''}
      </p></div>
      <div class="card-info">
        <a href="${createProductURL(data.product.type.name, data.product.name)}" class="card-name-product">${data.product.name}</a>
        <div class="card-rating">
          <div class="card-rating__active">
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
          </div>
          <div class="card-rating__items" data-rating="${data.product.rating}">
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
    <div class="_icon-cart count-product">${data.count}</div>
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

function classInfo(id) {
  if (Number(id) === 0) {
    return '_info0'
  } else if (Number(id) === 1) {
    return '_info1'
  } else return '_info2'
}

const infoOrder = ['Получен', 'В процессе', 'Не доставили', 'Возврат']

export const orderHtml = (data) => {
  return `
  <div class="order__container" data-orderid="${data.id}">
    <div class="order__container_header">
      <div class="order__container_row">
        <span class="order__container_dateTime">${formatDate(data.delivery_datum.delivery_date)}</span>
        <span class="order__container_dateTime span-time">${data.delivery_datum.delivery_time}</span>
        <span class="order__container_infoOrder ${classInfo(data.delivery_datum.delivery_information)}">${infoOrder[data.delivery_datum.delivery_information]}</span>
      </div>
      <div class="order__container_row">
        <span class="order__container_price">${data.delivery_datum.price} ₽</span>
        ${Number(data.delivery_datum.delivery_information) === 1 ? `<label for="inputDate-${data.id}" class="order__container_labelDate">
        <span>Когда доставить</span>
        <input type="date" name="date" id="inputDate-${data.id}" class="order__container_inputDate"></label>` : ''}
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

