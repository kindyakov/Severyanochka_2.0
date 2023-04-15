import Modal from "../modal/Modal.js";

export const createdProduct = new Modal({
  // speed: 400,
  id: 'created-product',
  btnActive: '[data-create="product"]',
  name: '.modal',
  title: 'Продукт',
  btnClose: '.modal__close',
  closeArea: 'modal__body',
  insertHTML: document.querySelector('.admin'),
  formH: `
<form action="#" class="modal__form" data-validate="created-product">
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
    <div class="admin__wrapper-img"></div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Название</label>
      <input type="text" name="name" class="admin__input _input" autocomplete="off">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Цена</label>
      <input type="text" name="price" class="admin__input _input">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Цена по карте</label>
      <input type="text" name="price_card" class="admin__input _input">
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
      <input type="text" name="discount" class="admin__input _input">
    </div>
  </div>
</div>
<button class="admin__button">Добавить</button>
</form>
`
})

export const createdBrand = new Modal({
  id: 'created-brand',
  btnActive: '[data-create="brand"]',
  name: '.modal',
  title: 'Бренд',
  btnClose: '.modal__close',
  closeArea: 'modal__body',
  insertHTML: document.querySelector('.admin'),
  formH: `
<form action="#" class="modal__form" data-validate="created-brand">
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
    <div class="admin__wrapper-img"></div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Название</label>
      <input type="text" name="name" class="admin__input _input" autocomplete="off">
    </div>
  </div>
</div>
<button class="admin__button">Добавить</button>
</form>
`
})

export const createdType = new Modal({
  id: 'created-type',
  btnActive: '[data-create="type"]',
  name: '.modal',
  title: 'Тип',
  btnClose: '.modal__close',
  closeArea: 'modal__body',
  insertHTML: document.querySelector('.admin'),
  formH: `
<form action="#" class="modal__form" data-validate="created-type">
<div class="modal__flex">
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Название</label>
      <input type="text" name="name" class="admin__input _input" autocomplete="off">
    </div>
  </div>
</div>
<button class="admin__button">Добавить</button>
</form>
`
})