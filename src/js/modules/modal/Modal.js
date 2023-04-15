import JustValidate from "just-validate";
import {
  Validated,
  validate_login, validate_created_product,
  validate_created_brand, validate_created_type
} from "./validate.js";
import { login } from "../user/login.js";
import { created_product } from "../products/created_product.js";
import { created_brand } from "../brands/brand.js";
import { created_type } from "../types/type.js";
import { renderTypes } from "../admin/render.js";

const modalH = `<div class="modal" >
<div class="modal__body">
  <div class="modal__content">
    <div class="modal__close"></div>
  </div>
</div>
</div>`

class Modal {
  constructor({ id, name, btnActive, btnClose, closeArea, title,
    insertHTML = document.querySelector('.wrapper'), formH }) {
    this.isModal = false;
    this.isCreate = false;
    this.modal = null;
    this.form = null
    this.idModal = id;
    this.modalName = name;
    this.modalInsertHTML = insertHTML;
    this.modalHtml = `<div class="modal" id="${this.idModal}">
    <div class="modal__body">
      <div class="modal__content">
        <div class="modal__close"></div>
      </div>
    </div>
    </div>`;
    this.modalTitle = title;
    this.formHtml = formH;
    this.modalActive = btnActive;
    this.modalClose = btnClose;
    this.modalBody = closeArea;
    this.validateForm;
    this.hendleClick()
  }
  hendleClick() {
    document.addEventListener('click', e => {
      if (e.target.closest(`${this.modalActive}`)) {
        if (!this.isCreate) {
          this.createModal()
          this.validate()
        }
        this.open()
      }
      if (!this.isModal) return;
      if (e.target.classList.contains(`${this.modalBody}`) || e.target.closest(`${this.modalClose}`)) {
        this.close()
      }
    })
    document.addEventListener('keyup', e => {
      if (e.key !== 'Escape' || !this.isModal) return
      this.close()
    })
  }
  createModal() {
    this.modalInsertHTML.insertAdjacentHTML('beforeend', this.modalHtml)
    this.modal = document.querySelector(`#${this.idModal}`);

    const content = this.modal.querySelector('.modal__content');
    content.insertAdjacentHTML('afterbegin', `<div class="modal-wrapper-title">
    <h3 class="modal__title">${this.modalTitle}</h3>
    <span class="error-res"></span>
  </div>`)
    content.insertAdjacentHTML('beforeend', this.formHtml)
    this.form = this.modal.querySelector('.modal__form')

    this.isCreate = true;
  }
  open() {
    this.isModal = true;
    this.addPadding()
    this.modal.classList.add('active');
    document.body.classList.add('_lock');
    document.querySelector('html').classList.add('_lock');
  }
  close() {
    this.isModal = false;
    // this.modalInsertHTML.style.cssText = '';
    document.body.classList.remove('_lock');
    document.querySelector('html').classList.remove('_lock');
    this.modal.classList.remove('active');
    this.validateForm.refresh()
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
    this.validateForm = new JustValidate(`div#${this.idModal} .modal__form`, {
      errorLabelStyle: {
        color: '#d31111'
      },
    });

    if (this.form.dataset.validate === 'login') validate_login(this.validateForm, this.form)
    const validateForm = Validated[`${this.form.dataset.validate}`]
    validateForm(this.validateForm, `#${this.idModal}`)

    this.submit()
  }
  submit() {
    this.form.addEventListener('submit', () => {

      this.validateForm.revalidate()
        .then(isValid => {
          if (!isValid) return
          if (this.form.dataset.validate === 'login') {
            login(this.form)
              .then(isLogin => isLogin && window.location.reload())
              .catch((err) => console.log(err))
          }
          if (this.form.dataset.validate === 'created-product') {
            created_product(this.form)
              .then(data => location.reload())
              .catch((err) => console.log(err))
          }
          if (this.form.dataset.validate === 'created-brand') {
            created_brand(this.form)
              .then(data => location.reload())
              .catch((err) => console.log(err))
          }
          if (this.form.dataset.validate === 'created-type') {
            created_type(this.form)
              .then(data => {
                const tbody = document.querySelector('#type .admin__table_tbody')
                renderTypes(tbody, data, false)
                this.close()
              })
              .catch((err) => console.log(err))
          }
        })
    })
  }
}

export default Modal;