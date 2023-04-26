import translit from "../translite.js"

const renderImgProduct = (arr, name) => {
  const images = JSON.parse(arr)
  const srcImg = `${apiImgProducts}${translit(name)}/`
  const [img] = images
  return `${srcImg}${img}`
}

const productHtml = (data) => {
  return `<div class="wrapper-card" data-productId="${data.id}">
  <div class="card">
    <a href="https://kindyakov.github.io/severyanochka/html/milk-cheese-egg/slivki-vkusnoteevo-upast-20-rossiya-475g.html" class="card-wrapper-img">
      <img src="${renderImgProduct(data.img, data.name)}" alt="Блинчики" class="card-img" data-img="vkusnoteevo-slivki-475g-20.jfif">
      <span class="card-discount">-7%</span>
    </a>
    <div class="card-content">
      <div class="card-wrapper-price">
        <p class="card-price-text">
          <span class="card-price__ordinary card-price">187.60 ₽</span>
          <i class="card-price__i">Обычная</i>
        </p>
      <p class="card-price-text">
        <span class="card-price__card card-price">175.10 ₽</span>
        <i>С картой</i>
      </p></div>
      <div class="card-info">
        <a href="https://kindyakov.github.io/severyanochka/html/milk-cheese-egg/slivki-vkusnoteevo-upast-20-rossiya-475g.html" class="card-name-product">Сливки ультрапастеризованные ВКУСНОТЕЕВО 20%, без змж, 475г, Россия, 475 г</a>
        <div class="card-rating">
          <div class="card-rating__active" style="width: 86px;">
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
          </div>
          <div class="card-rating__items" data-rating="4.3">
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
    <span class="card-like _icon-shape like disable"></span>
  <div class="card-delete-wrapper">
    <span class="card-delete">✖</span>
  </div></div>
  </div>`
}

export default productHtml