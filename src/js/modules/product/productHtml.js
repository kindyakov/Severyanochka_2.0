import translit from "../translite.js"
import { apiImgProducts } from "../API.js"

const renderImgProduct = (arr, name) => {
  const images = JSON.parse(arr)
  const srcImg = `${apiImgProducts}${translit(name)}/`
  const [img] = images
  return `${srcImg}${img}`
}

let isFavorites = false
if (location.pathname === 'favourites.html') {
  isFavorites = true
}

export const productHtml = (data) => {
  return `<div class="wrapper-card" data-productId="${data.id}">
  <div class="card">
    <a href="" class="card-wrapper-img">
      <img src="${renderImgProduct(data.img, data.name)}" alt="${data.name}" class="card-img">
      ${data.discount ? `<span class="card-discount">${data.discount}%</span>` : ''}
    </a>
    <div class="card-content">
      <div class="card-wrapper-price">
        <p class="card-price-text">
          <span class="card-price__ordinary card-price">${data.price} ₽</span>
          <i class="card-price__i">Обычная</i>
        </p>
      <p class="card-price-text">
        ${data.price_card ? `<span class="card-price__card card-price">${data.price_card} ₽</span>
        <i>С картой</i>` : ''}
      </p></div>
      <div class="card-info">
        <a href="" class="card-name-product">${data.name}</a>
        <div class="card-rating">
          <div class="card-rating__active">
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
          </div>
          <div class="card-rating__items" data-rating="${data.rating}">
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
    ${isFavorites ? `<span class="card-delete">✖</span>` : ''}
  </div>
  </div>`
}
export const productError = () => {
  return `<div class="error-products">
  <div class="error-products_content">
    <span class="error-products_text">К сожелению раздел пуст</span>
    <a href="../catalog.html" class="basket__empty-link">Нажмите здесь, чтобы продолжить покупки</a>
  </div>
</div>`
}