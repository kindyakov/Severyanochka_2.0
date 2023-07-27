import translit from '../../../translite.js'
import { apiImgProducts, apiImgBrands, apiImgTypes, } from "../../../API.js"
import { imgHtml } from '../../../modal/previewImg.js'

const renderCharacteristic = (arr) => {
  let html = []
  arr.forEach(obj => {
    html.push(`<div class="admin__characteristic-row" data-charId="${obj.id}">
    <div class="modal__wrapper-input">
  <label class="admin__label"></label>
  <input type="text" name="title" class="admin__input _input" autocomplete="off" value="${obj.title}">
  </div>
  <div class="modal__wrapper-input">
  <label class="admin__label"></label>
  <input type="text" name="description" class="admin__input _input" autocomplete="off" 
  value="${obj.description}">
  </div>
  </div>`)
  });
  return html.join('')
}

const renderImg = (arr, src) => {
  const images = JSON.parse(arr)
  const [img] = images
  return (imgHtml(img, `${src}${img}`))
}

const renderImgProduct = (arr, name) => {
  const html = []
  const images = JSON.parse(arr)
  const srcImg = `${apiImgProducts}${translit(name)}/`
  images.forEach(img => {
    html.push(imgHtml(img, `${srcImg}${img}`))
  })
  return html.join('')
}

const productHtml = (data) => {
  return `
  <div class="modal-wrapper-title">
    <h3 class="modal__title">Продукт</h3>
    <span class="error-res"></span>
  </div>
  <form class="modal__form" data-validate="product">
<div class="modal__flex">
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Изображение</label>
      <label class="admin__label-file" for="img-update-product">
        <input type="file" accept="image/*" id="img-update-product" multiple name="img" class="admin__input _input">
        <span class="file-name"></span>
        <label class="file-download" for="img-update-product">Загрузить</label>
      </label>
    </div>
    <div class="admin__wrapper-img">${data.img ? renderImgProduct(data.img, data.name) : ''}</div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Название</label>
      <input type="text" name="name" class="admin__input _input" value="${data.name}" autocomplete="off">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Цена</label>
      <input type="text" name="price" class="admin__input _input" value="${data.price}" autocomplete="off">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Цена по карте</label>
      <input type="text" name="price_card" class="admin__input _input" value="${data.price_card ? data.price_card : ''}" autocomplete="off">
    </div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Тип</label>
      <select class="admin__select" name="typeId">
      </select>
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Бренд</label>
      <select class="admin__select" name="brandId">
      </select>
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Скидка</label>
      <input type="text" name="discount" class="admin__input _input" value="${data.discount ? data.discount : ''}" autocomplete="off">
    </div>
  </div>
</div>
<div class="admin__wrapper-characteristic">
  <div class="admin__button characteristic-btn">Добавить характеристику</div>
  ${data.characteristic.length > 0 ? renderCharacteristic(data.characteristic) : `<div class="admin__characteristic-row">
  <div class="modal__wrapper-input">
<label class="admin__label"></label>
<input type="text" name="title" class="admin__input _input" autocomplete="off">
</div>
<div class="modal__wrapper-input">
<label class="admin__label"></label>
<input type="text" name="description" class="admin__input _input" autocomplete="off">
</div>
</div>`}
</div >
  <button class="admin__button">Обновить</button>
</form >
  <div class="modal__close"></div>`
}
const brandHtml = (data) => {
  return `
    <div class="modal-wrapper-title">
    <h3 class="modal__title">Бренд</h3>
    <span class="error-res"></span>
  </div>
  <form class="modal__form" data-validate="brand">
<div class="modal__flex">
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Изображение</label>
      <label class="admin__label-file" for="img-update-brand">
        <input type="file" accept="image/*" id="img-update-brand" name="img" class="admin__input _input" autocomplete="off">
        <span class="file-name"></span>
        <label class="file-download" for="img-update-brand">Загрузить</label>
      </label>
    </div>
    <div class="admin__wrapper-img">${data.img ? renderImg(data.img, apiImgBrands) : ''}</div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Название</label>
      <input type="text" name="name" class="admin__input _input" autocomplete="off" value="${data.name}">
    </div>
  </div>
</div>
<button class="admin__button">Обновить</button>
</form>
<div class="modal__close"></div>`
}
const typeHtml = (data) => {
  return `<div div class="modal-wrapper-title" >
    <h3 class="modal__title">Тип</h3>
    <span class="error-res"></span>
  </div>
  <form class="modal__form" data-validate="type">
<div class="modal__flex">
<div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Изображение</label>
      <label class="admin__label-file" for="img-update-type">
        <input type="file" accept="image/*" id="img-update-type" name="img" class="admin__input _input">
        <span class="file-name"></span>
        <label class="file-download" for="img-update-type">Загрузить</label>
      </label>
    </div>
    <div class="admin__wrapper-img">
    ${data.img ? renderImg(data.img, apiImgTypes) : ''}
    </div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Название</label>
      <input type="text" name="name" class="admin__input _input" autocomplete="off" value="${data.name}">
    </div>
  </div>
</div>
<button class="admin__button">Обновить</button>
</form>
<div class="modal__close"></div>`
}
const userHtml = (data) => {
  return ` < div class="modal-wrapper-title" >
  <h3 class="modal__title">Продукт</h3>
  <span class="error-res"></span>
</ >
<form class="modal__form" data-validate="type">
<div class="modal__flex">
<div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Изображение</label>
      <label class="admin__label-file" for="img-update-type">
        <input type="file" accept="image/*" id="img-update-type" name="img" class="admin__input _input">
        <span class="file-name"></span>
        <label class="file-download" for="img-update-type">Загрузить</label>
      </label>
    </div>
    <div class="admin__wrapper-img">

    </div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Название</label>
      <input type="text" name="name" class="admin__input _input" autocomplete="off" value="${data.name}">
    </div>
  </div>
</div>
<button class="admin__button">Обновить</button>
</form>
<div class="modal__close"></div>`
}

export const modal_html = {
  product: productHtml,
  brand: brandHtml,
  type: typeHtml,
  // user: userHtml
}
