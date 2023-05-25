import translit from "../translite.js"
import { apiImgProducts } from "../API.js"

const renderImgProduct = (arr, name) => {
  const images = JSON.parse(arr)
  const srcImg = `${apiImgProducts}${translit(name)}/`
  const [img] = images
  return `${srcImg}${img}`
}

export const productError = () => {
  return `<div class="basket__wrapper-empty"><div class="basket__empty"><p class="basket__empty-text">Ваша корзина пуста</p><a href="catalog.html" class="basket__empty-link">Нажмите здесь, чтобы продолжить покупки</a></div></div>`
}

export const infoProductHtml = (data) => {
  return `<div class="basket__aside-info-block" data-card-id="${data.id}">
  <p class="basket__aside-info-text">${data.count ? data.count : '1'} товар</p>
  <span class="basket__aside-info-price">${data.count ? data.priceSum : data.price} ₽</span>
  </div>`
}

export const minSumError = min => {
  return `<div class="basket__aside-minsum">Минимальная сумма заказа ${min}р</div>`
}

export const productHtml = (data) => {
  return `<div class="basket__wrapper-cards" data-id="${data.id}" style="margin-bottom: 30px;">
  <div class="basket__card">
    <div class="basket__card-wrapper-checkbox">
      <div class="basket__card-checkbox">
        <input type="checkbox" id="basket-card-check-${data.id}" class="basket__card-check" checked>
        <label for="basket-card-check-${data.id}" class="basket__card-check-label">✓</label>
      </div>
    </div>

    <div class="basket__card-wrapper-content">
      <a href="" class="basket__card-wrapper-img">
        <img src="${renderImgProduct(data.img, data.name)}" class="basket__card-img">
      </a>
      <div class="basket__card-content">
        <a href="" class="basket__card-name">${data.name}</a>
        <div class="basket__card-text">
          <p class="basket__card-wrapper-price wrapper-price">
            <span class="basket__card-price basket__card-price-usual">${data.price} ₽</span>
            <i class="basket__card-price-context card-price-context-ordinary">Обычная</i>
          </p>
          ${data.price_card ? `<p class="basket__card-wrapper-price">
          <span class="basket__card-price basket__card-price-card">${data.price_card} ₽</span>
          <i class="basket__card-price-context card-price-context-card">С картой</i>
        </p>` : ''}
          <p>
            <span class="basket__card-info">за шт.</span>
          </p>
          ${data.discount ? `<p><span class="basket__card-discount">${data.discount}%</span></p>` : ''}
        </div>
      </div>
    </div>
    <div class="basket__card-count-wrapper">
      <div class="basket__card-counter">
        <button class="basket__card-counter-btn counter-plus" data-counter="+"></button>
        <span class="basket__card-counter-input">1</span>
        <button class="basket__card-counter-btn counter-minus" data-counter="-"></button>
      </div>
      <div class="basket__card-counter-wrapper-price">
        <span class="basket__card-counter-price-sum">${data.price} ₽</span>
        ${data.price_card ? ` <i class="basket__card-counter-price-old">${data.price_card} ₽</i>` : ''}
      </div >
    </div >
  </div >
</div > `
}