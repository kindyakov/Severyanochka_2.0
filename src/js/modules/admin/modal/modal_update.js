import JustValidate from "just-validate"
import { modalHtml } from "../../modal/html.js"
import { Validated } from "../../modal/validate.js"
import PreviewImg, { imgHtml } from "../../modal/previewImg.js"
import Update from "../../post_put_delete/update.js"

import {
  apiImgUsers,
  apiImgProducts,
  apiImgBrands,
  apiImgTypes,
} from "../../API.js"

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
    <div class="admin__wrapper-img">${data.src ? imgHtml(data.img, data.img) : ''}</div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Название</label>
      <input type="text" name="name" class="admin__input _input" autocomplete="off" value="${data.name}">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Цена</label>
      <input type="text" name="price" class="admin__input _input" value="${data.price}">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Цена по карте</label>
      <input type="text" name="price_card" class="admin__input _input" value="${data.price_card}">
    </div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Тип</label>
      <select class="admin__select" name="typeId">
        <option value="1">Молоко, яйца, сыр</option>
      </select>
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Бренд</label>
      <select class="admin__select" name="brandId">
        <option value="1">Простоквашино</option>
        <option value="DANON">DANON</option>
      </select>
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Скидка</label>
      <input type="text" name="discount" class="admin__input _input" value="${data.discount}">
    </div>
  </div>
</div>
<button class="admin__button">Обновить</button>
</form>
  `
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
        <input type="file" accept="image/*" id="img-update-brand" name="img" class="admin__input _input">
        <span class="file-name"></span>
        <label class="file-download" for="img-update-brand">Загрузить</label>
      </label>
    </div>
    <div class="admin__wrapper-img">${data.src ? imgHtml(data.img, data.src) : ''}</div>
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
  `
}
const typeHtml = (data) => {
  return `
  <div class="modal-wrapper-title">
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
      ${data.src ? imgHtml(data.img, data.src) : ''}
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
</form>`
}
const userHtml = (data) => { }

const html = {
  product: productHtml,
  brand: brandHtml,
  type: typeHtml,
  user: userHtml
}
const urlImg = {
  product: apiImgProducts,
  brand: apiImgBrands,
  type: apiImgTypes,
  user: apiImgUsers
}

const modalUpdate = (key, cell, id) => {
  const KEY = key
  const ID = id
  const formHtml = html[KEY]
  const admin = document.querySelector('.admin')
  const modalId = 'modal-update'
  let modal, form, validateForm, data = {}, content, formName

  const hendleClick = (e) => {
    if (e.target.classList.contains('modal__body') || e.target.closest('.modal__close')) {
      close()
    }
  }
  const createObject = (cell) => {
    modal = document.querySelector(`#${modalId}`)
    content = modal.querySelector('.modal__content')
    cell.forEach(_cell => {
      const key = _cell.dataset.update
      data[key] = _cell.textContent
    });
    if (data.img !== 'null') data.src = urlImg[KEY] + data.img
  }
  const create = () => {
    admin.insertAdjacentHTML('beforeend', modalHtml(modalId))

    createObject(cell)
    content.insertAdjacentHTML('beforeend', formHtml(data))

    filling() // 1 выполняется после создания
    setTimeout(() => open(), 10)
    validate()
    PreviewImg(`#${modalId}`)
    submit()
  }
  const filling = () => {
    form = modal.querySelector('.modal__form')
    formName = form.dataset.validate
  }
  const open = () => {
    modal.classList.add('active');
    document.body.classList.add('_lock');
    document.querySelector('html').classList.add('_lock');
  }
  const close = () => {
    document.body.classList.remove('_lock');
    document.querySelector('html').classList.remove('_lock');
    modal.classList.remove('active');
    setTimeout(() => remove(), 200)
  }

  const remove = () => modal.remove()

  const validate = () => {
    validateForm = new JustValidate(`div#${modalId} .modal__form`, {
      errorLabelStyle: {
        color: '#d31111'
      },
    });

    const validate = Validated[`${formName}`]
    validate(validateForm, `#${modalId}`)
  }
  const submit = () => {
    form.addEventListener('submit', () => {

      validateForm.revalidate()
        .then(isValid => {
          if (!isValid) return
          Update(form, formName, ID, modal)
            .then(data => location.reload())
            .catch(err => console.log(err))
        })
    })
  }

  create()

  window.addEventListener('click', hendleClick)
  window.addEventListener('keyup', e => { if (e.key === 'Escape') close() })
}

export default modalUpdate