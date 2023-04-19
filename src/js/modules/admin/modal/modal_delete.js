import Delete from '../../post_put_delete/delete.js'
import { modalHtml } from "../../modal/html.js"

const productHtml = () => {
  return `<div class="modal-wrapper-title">
  <h3 class="modal__title">Продукты</h3>
  <span class="error-res"></span>
</div>
<form class="modal__form">
  <div class="modal__flex">
    <div class="admin-column">
      <p class="admin__info-text">Вы дествительно хотите удалить выбранные продукты</p>
    </div>
  </div>
<div class="admin__wrapper-button">
<button class="admin__button">Подтвердить</button>
<button class="admin__button cancel">Отменить</button>
</div>
</form>`
}
const brandHtml = () => {
  return `<div class="modal-wrapper-title">
  <h3 class="modal__title">Бренды</h3>
  <span class="error-res"></span>
</div>
<form class="modal__form">
  <div class="modal__flex">
    <div class="admin-column">
      <p class="admin__info-text">Вы дествительно хотите удалить выбранные бренды</p>
    </div>
  </div>
  <div class="admin__wrapper-button">
  <button class="admin__button">Подтвердить</button>
  <button class="admin__button cancel">Отменить</button>
  </div>
</form>`
}
const typeHtml = () => {
  return `<div class="modal-wrapper-title">
  <h3 class="modal__title">Типы</h3>
  <span class="error-res"></span>
</div>
<form class="modal__form">
  <div class="modal__flex">
    <div class="admin-column">
      <p class="admin__info-text">Вы дествительно хотите удалить выбранные типы</p>
    </div>
  </div>
  <div class="admin__wrapper-button">
  <button class="admin__button">Подтвердить</button>
  <button class="admin__button cancel">Отменить</button>
  </div>
</form>`
}
const userHtml = () => {
  return `<div class="modal-wrapper-title">
  <h3 class="modal__title">Пользователи</h3>
  <span class="error-res"></span>
</div>
<form class="modal__form">
  <div class="modal__flex">
    <div class="admin-column">
      <p class="admin__info-text">Вы дествительно хотите удалить выбранных пользователей</p>
    </div>
  </div>
  <div class="admin__wrapper-button">
  <button class="admin__button">Подтвердить</button>
  <button class="admin__button cancel">Отменить</button>
  </div>
</form>`
}

const html = {
  product: productHtml,
  brand: brandHtml,
  type: typeHtml,
  user: userHtml
}
const modalDelete = (key, id) => {
  const KEY = key
  const ID = id
  const formHtml = html[KEY]
  const admin = document.querySelector('.admin')
  const modalId = 'modal-delete'
  let modal, content, form

  const hendleClick = (e) => {
    if (e.target.classList.contains('modal__body') || e.target.closest('.modal__close')) {
      close()
    }
  }
  const create = () => {
    admin.insertAdjacentHTML('beforeend', modalHtml(modalId))
    modal = document.querySelector(`#${modalId}`)
    content = modal.querySelector('.modal__content')
    content.insertAdjacentHTML('beforeend', formHtml())
    form = modal.querySelector('.modal__form')
    setTimeout(() => open(), 10)
    submit()
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
  const submit = () => {
    form.addEventListener('submit', () => {
      Delete(formName, ID, modal)
        .then(data => location.reload())
        .catch(err => console.log(err))
    })
  }
  create()
  window.addEventListener('click', hendleClick)
  window.addEventListener('keyup', e => { if (e.key === 'Escape') close() })
}

export default modalDelete