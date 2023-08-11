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
      <input type="text" name="price" class="admin__input _input" autocomplete="off">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Цена по карте</label>
      <input type="text" name="price_card" class="admin__input _input" autocomplete="off">
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
      <input type="text" name="discount" class="admin__input _input" autocomplete="off">
    </div>
  </div>
</div>
<div class="admin__wrapper-characteristic">
  <div class="admin__button characteristic-btn">Добавить характеристику</div>
</div>
<button class="admin__button">Добавить</button>
</form>
<div class="modal__close"></div>
<div class="modal__error-body">
  <div class="modal__error-content">
    <div class="modal__error-block">
      <p class="modal__error-text">Какойто текст</p>
      <button class="modal__error-btn">Ок</button>
    </div>
  </div>
</div>`

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
<div class="modal__close"></div>
<div class="modal__error-body">
  <div class="modal__error-content">
    <div class="modal__error-block">
      <p class="modal__error-text">Какойто текст</p>
      <button class="modal__error-btn">Ок</button>
    </div>
  </div>
</div>`

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
<div class="modal__close"></div>
<div class="modal__error-body">
  <div class="modal__error-content">
    <div class="modal__error-block">
      <p class="modal__error-text">Какойто текст</p>
      <button class="modal__error-btn">Ок</button>
    </div>
  </div>
</div>`

const user = `
<div class="modal-wrapper-title">
    <h3 class="modal__title">Пользователь</h3>
    <span class="error-res"></span>
  </div>
<form class="modal__form" data-validate="user">
<div class="modal__flex">
<div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Роль</label>
      <select class="admin__select" name="role">
        <option value="user">Пользователь</option>
        <option value="editor">Редактор</option>
        <option value="admin">Администратор</option>
      </select>
    </div>
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
      <label class="admin__label">Телефон</label>
      <input type="text" name="phone" class="admin__input _input" autocomplete="off" inputmode="tel">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Имя</label>
      <input type="text" name="name" class="account-data__input _input" autocomplete="off">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Фамилия</label>
      <input type="text" name="surname" class="account-data__input _input" autocomplete="off">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Пароль</label>
      <input type="password" name="password" class="account-data__input _input" autocomplete="off">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Повторите пароль</label>
      <input type="password" name="confirm-password" class="account-data__input _input" autocomplete="off">
    </div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Область</label>
      <input type="text" name="region" class="admin__input _input" autocomplete="off">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Город</label>
      <input type="text" name="city" class="account-data__input _input" autocomplete="off">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Пол</label>
      <div class="registration__item-content">
        <label for="gender" class="registration__item-label" data-gender="Мужской">
          <input type="radio" id="gender" name="gender" value="Мужской" class="registration__input-radio" checked="">
          <label for="gender" class="registration__item-label-check"><span>Мужской</span></label>
        </label>
        <label for="gender1" class="registration__item-label" data-gender="Женский">
          <input type="radio" id="gender1" name="gender" value="Женский" class="registration__input-radio">
          <label for="gender1" class="registration__item-label-check"><span>Женский</span></label>
        </label>
      </div>
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Дата рождения</label>
      <input type="date" name="date_birth" class="account-data__input _input" autocomplete="off">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Почта</label>
      <input type="text" name="email" class="account-data__input _input" autocomplete="off">
    </div>
  </div>
</div>
<button class="admin__button">Добавить</button>
</form>
<div class="modal__close"></div>
<div class="modal__error-body">
  <div class="modal__error-content">
    <div class="modal__error-block">
      <p class="modal__error-text">Какойто текст</p>
      <button class="modal__error-btn">Ок</button>
    </div>
  </div>
</div>`

const article = `
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
<div class="modal__close"></div>
<div class="modal__error-body">
  <div class="modal__error-content">
    <div class="modal__error-block">
      <p class="modal__error-text">Какойто текст</p>
      <button class="modal__error-btn">Ок</button>
    </div>
  </div>
</div>`

const forms = {
  product, brand, type, user,
  article
}

export default forms