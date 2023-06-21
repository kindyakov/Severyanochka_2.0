const product = `
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
      </select>
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Бренд</label>
      <select class="admin__select" name="brandId">
      </select>
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Скидка</label>
      <input type="text" name="discount" class="admin__input _input">
    </div>
  </div>
</div>
<div class="admin__wrapper-characteristic">
  <div class="admin__button characteristic-btn">Добавить характеристику</div>
</div>
<button class="admin__button">Добавить</button>
</form>
<div class="modal__close"></div>`

const brand = `
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
<div class="modal__close"></div>`

const type = `
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
<div class="modal__close"></div>`

const forms = {
  product, brand, type
}

export default forms