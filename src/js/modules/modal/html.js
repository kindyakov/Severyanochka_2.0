export const formLoginH = `
<form action="#" class="modal__form" data-validate="login">
<div class="login-column">
<div class="modal__wrapper-input">
  <label class="login__label">Телефон</label>
  <input type="tel" name="phone" class="login__input modal-phone">
</div>
<div class="modal__wrapper-input">
  <label class="login__label">Пароль</label>
  <input type="password" name="password" class="login__input modal-password">
</div>
<button class="login__btn-log">Вход</button>
<div class="form-footer">
  <a href="${location.origin}/registration.html" class="form-footer__btn-registration">Регистрация</a>
  <button class="form-footer__forgot-pass">Забыли пароль?</button>
</div>
</div>
</form>`

export const modalHtml = (id) => {
  return `<div class="modal" id="${id}">
  <div class="modal__body">
    <div class="modal__content">

    </div>
  </div>
  </div>`
}