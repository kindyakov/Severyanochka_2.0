import JustValidate from "just-validate"
import { Validated } from "../modal/validate.js"
import { imgHtml } from "../modal/previewImg.js"
import PreviewImg from "../modal/previewImg.js"

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
      <label class="admin__label-file" for="img-product">
        <input type="file" accept="image/*" id="img-product" multiple name="img" class="admin__input _input">
        <span class="file-name"></span>
        <label class="file-download" for="img-product">Загрузить</label>
      </label>
    </div>
    <div class="admin__wrapper-img">${data.src ? imgHtml(data.img.name, data.img.src) : ''}</div>
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
<button class="admin__button">Обнавить</button>
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
      <label class="admin__label-file" for="img-brand">
        <input type="file" accept="image/*" id="img-brand" name="img" class="admin__input _input">
        <span class="file-name"></span>
        <label class="file-download" for="img-brand">Загрузить</label>
      </label>
    </div>
    <div class="admin__wrapper-img">${data.src ? imgHtml(data.img.name, data.img.src) : ''}</div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Название</label>
      <input type="text" name="name" class="admin__input _input" autocomplete="off" value="${data.name}">
    </div>
  </div>
</div>
<button class="admin__button">Обнавить</button>
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
      <label class="admin__label-file" for="img-type">
        <input type="file" accept="image/*" id="img-type" name="img" class="admin__input _input">
        <span class="file-name"></span>
        <label class="file-download" for="img-type">Загрузить</label>
      </label>
    </div>
    <div class="admin__wrapper-img">
      ${data.src ? imgHtml(data.img.name, data.img.src) : ''}
    </div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Название</label>
      <input type="text" name="name" class="admin__input _input" autocomplete="off" value="${data.name}">
    </div>
  </div>
</div>
<button class="admin__button">Обнавить</button>
</form>`
}
const userHtml = (data) => { }

const html = {
  product: productHtml,
  brand: brandHtml,
  type: typeHtml,
  user: userHtml
}

const modal = (key) => {
  const formHtml = html[`${key}`]
  const content = document.querySelector('.admin')
  const modalId = 'modal-update'
  let modal, modalBody, btnClose, form, validateForm

  const hendleClick = (e) => {
    if (e.target.classList.contains('modal__body') || e.target.closest('modal__close')) {
      close()
    }
  }

  const create = () => {
    content.insertAdjacentHTML('beforend', `
    <div class="modal modal-update" id="${modalId}">
      <div class="modal__body">
        <div class="modal__content">
          <div class="modal__close"></div>
              ${formHtml(data)}
        </div>
      </div>
    </div>`)
    filling() // 1 выполняется после создания
    open()
    validate()
  }
  const filling = () => {
    modal = document.querySelector(`#${modalId}`)
    modalBody = modal.querySelector('.modal__body')
    btnClose = modal.querySelector('.modal__close')
    form = modal.querySelector('.modal__form')
  }
  const open = () => {
    modal.classList.add('active');
    document.body.classList.add('_lock');
    document.querySelector('html').classList.add('_lock');
  }
  const close = () => {
    document.body.classList.remove('_lock');
    document.querySelector('html').classList.remove('_lock');
    this.modal.classList.remove('active');
    validateForm.refresh()
    setTimeout(() => remove, 200)
  }
  const remove = () => modal.remove()

  const validate = () => {
    validateForm = new JustValidate(`div#${this.idModal} .modal__form`, {
      errorLabelStyle: {
        color: '#d31111'
      },
    });

    const validate = Validated[`${form.dataset.validate}`]
    validate(validateForm, `#${modalId}`)

    submit()
  }
  const submit = () => { }

  create()
  window.addEventListener('click', hendleClick)
  window.addEventListener('keyup', e => { if (e.key !== 'Escape') close() })
}

export default modal