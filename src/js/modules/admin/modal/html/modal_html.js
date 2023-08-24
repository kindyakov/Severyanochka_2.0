function renderCharacteristic(arr) {
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

function rederSelect(role) {
  let option = {
    user: `<option value="user" ${'user' === role ? 'selected' : ''}>Пользователь</option>`,
    editor: `<option value="editor" ${'editor' === role ? 'selected' : ''}>Редактор</option>`,
    admin: `<option value="admin" ${'admin' === role ? 'selected' : ''}>Администратор</option>`
  }

  return Object.values(option).join('');
}

function rederGender(gender) {
  let option = {
    man: `
      <label for="gender-man" class="registration__item-label" data-gender="Мужской">
        <input type="radio" id="gender-man" name="gender" value="Мужской" class="registration__input-radio" ${gender === 'Мужской' ? 'checked' : ''}>
        <label for="gender-man" class="registration__item-label-check"><span>Мужской</span></label>
      </label>`,
    woman: `
      <label for="gender-woman" class="registration__item-label" data-gender="Женский">
        <input type="radio" id="gender-woman" name="gender" value="Женский" class="registration__input-radio" ${gender === 'Женский' ? 'checked' : ''}>
        <label for="gender-woman" class="registration__item-label-check"><span>Женский</span></label>
      </label>`,
  }
  return Object.values(option).join('');
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
    <div class="admin__wrapper-img"></div>
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
</form>
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
    <div class="admin__wrapper-img"></div>
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
  return `<div div class="modal-wrapper-title">
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
  return `<div class="modal-wrapper-title">
  <h3 class="modal__title">Пользователь</h3>
  <span class="error-res"></span>
</div>
<form class="modal__form" data-validate="user">
<div class="modal__flex">
<div class="admin-column">
<div class="modal__wrapper-input">
<label class="admin__label">Роль</label>
<select class="admin__select" name="role"> 
  ${rederSelect(data.role)}
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
  <div class="admin__wrapper-img">
  </div>
</div>
<div class="admin-column">
  <div class="modal__wrapper-input">
    <label class="admin__label">Телефон</label>
    <input type="text" name="phone" class="admin__input _input" autocomplete="off" inputmode="tel" value="${data.phone.replace(/^7/, '')}">
  </div>
  <div class="modal__wrapper-input">
    <label class="admin__label">Имя</label>
    <input type="text" name="name" class="account-data__input _input" autocomplete="off" value="${data.name}">
  </div>
  <div class="modal__wrapper-input">
    <label class="admin__label">Фамилия</label>
    <input type="text" name="surname" class="account-data__input _input" autocomplete="off" value="${data.surname}">
  </div>
  <div class="modal__wrapper-input">
      <label class="admin__label">Пароль</label>
      <input type="password" name="password" class="account-data__input _input" autocomplete="off" disabled>
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Повторите пароль</label>
      <input type="password" name="confirm-password" class="account-data__input _input" autocomplete="off" disabled>
    </div>
</div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Область</label>
      <input type="text" name="region" class="admin__input _input" autocomplete="off" value="${data.region}">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Город</label>
      <input type="text" name="city" class="account-data__input _input" autocomplete="off" value="${data.city}">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Пол</label>
      <div class="registration__item-content">
        ${rederGender(data.gender)}
      </div>
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Дата рождения</label>
      <input type="date" name="date_birth" class="account-data__input _input" autocomplete="off" value="${data.date_birth}">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Почта</label>
      <input type="text" name="email" class="account-data__input _input" autocomplete="off" value="${data.email ? data.email : ''}">
    </div>
  </div>
</div >
  <button class="admin__button">Обновить</button>
</form >
<div class="modal__close"></div>
<div class="modal__error-body">
<div class="modal__error-content">
  <div class="modal__error-block">
    <p class="modal__error-text"></p>
    <button class="modal__error-btn">Ок</button>
  </div>
</div>
</div>`
}

const articleHtml = (data) => {
  return `
  <div div class="modal-wrapper-title">
  <h3 class="modal__title">Статья</h3>
  <span class="error-res"></span>
</div>
<form class="modal__form" data-validate="article">
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
<div class="modal__close"></div>
<div class="modal__error-body">
  <div class="modal__error-content">
    <div class="modal__error-block">
      <p class="modal__error-text"></p>
      <button class="modal__error-btn">Ок</button>
    </div>
  </div>
</div>`
}

export const modal_html = {
  product: productHtml,
  brand: brandHtml,
  type: typeHtml,
  user: userHtml,
  article: articleHtml
}
