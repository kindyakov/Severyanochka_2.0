import JustValidate from "just-validate";
import { modal_validate } from "./modal_validate.js";
import { login } from "../user/login.js";

class Modal {
  constructor({ name, btnActive, btnClose, closeArea,
    insertHTML = document.querySelector('.wrapper') }) {
    this.modal = false
    this.isModal = false;
    this.isCreate = true;
    this.modalName = name;
    this.modalInsertHTML = insertHTML;
    this.modalHtml = `<div class="modal-login" >
    <div class="modal-login__body">
      <div class="modal-login__content">
      <div class="modal-wrapper-title">
      <h3 class="modal-login__title">Вход</h3>
        <span class="error-res"></span>
        </div>
        <form action="#" class="modal-login__form">
          <div class="modal-login__wrapper-input">
          <label class="modal-login__label">Телефон</label>
          <input type="tel" name="phone" class="modal-login__input modal-phone">
          </div>
          <div class="modal-login__wrapper-input">
          <label class="modal-login__label">Пароль</label>
          <input type="password" name="password" class="modal-login__input modal-password">
          </div>
            <button class="modal-login__btn-log">Вход</button>
            <div class="form-footer">
              <a href="${location.origin}/registration.html" class="form-footer__btn-registration">Регистрация</a>
              <button class="form-footer__forgot-pass">Забыли пароль?</button>
            </div>
        </form>
        <div class="modal-login__close"></div>
      </div>
    </div>
    </div>`;
    this.modalActive = btnActive;
    this.modalClose = btnClose;
    this.modalCloseBody = closeArea;
    this.hendleClick()
  }
  hendleClick() {
    document.addEventListener('click', e => {
      if (e.target.closest(`${this.modalActive}`)) {
        if (this.isCreate) {
          this.createModal()
          this.isCreate = false;
          this.validate()
        }
        this.open()
      }
      if (!this.isModal) return;
      if (e.target.classList.contains(`${this.modalCloseBody}`) || e.target.closest(`${this.modalClose}`)) {
        this.close()
      }
    })
    document.addEventListener('keyup', e => {
      if (e.key !== 'Escape') return
      this.close()
    })
  }
  createModal() {
    this.modalInsertHTML.insertAdjacentHTML('beforeend', this.modalHtml)
    this.modal = document.querySelector(`${this.modalName}`);
    this.isModal = true;
  }
  open() {
    this.addPadding()
    this.modal.classList.add('active');
    document.body.classList.add('_lock');
    document.querySelector('html').classList.add('_lock');
  }
  close() {
    this.modalInsertHTML.style.cssText = ``;
    this.modal.classList.remove('active');
    document.body.classList.remove('_lock');
    document.querySelector('html').classList.remove('_lock');
  }
  call() {
    if (this.isCreate) {
      this.createModal()
      this.isCreate = false;
      this.validate()
    }
    this.open()
  }
  atimate() { }
  addPadding() {
    const document_width = document.documentElement.clientWidth;
    const window_width = window.innerWidth;
    const wrapper_margin = window_width - document_width;

    if (wrapper_margin > 0) this.modalInsertHTML.style.cssText = `padding-right: ${wrapper_margin}px;`;
  }
  validate() {
    const form = document.querySelector('.modal-login__form');
    const login_form = new JustValidate('.modal-login__form', {
      errorLabelStyle: {
        color: '#d31111'
      },
    });
    modal_validate(login_form, form)
    form.addEventListener('submit', () => {
      const phone = '7' + form.querySelector('.modal-phone').inputmask.unmaskedvalue();
      const password = form.querySelector('.modal-password').value;

      login_form.revalidate()
        .then(isValid => {
          if (isValid) {
            login(form, phone, password)
              .then(isLogin => isLogin && window.location.reload())
              .catch((err) => console.log(err))
          }
        })
    })
  }
}

export default Modal;