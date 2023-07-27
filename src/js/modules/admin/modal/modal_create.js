import JustValidate from "just-validate"
import { modalHtml } from "../../modal/html.js"
import { Validated } from "../../modal/validate.js"
import PreviewImg from "../../modal/previewImg.js"
import Create from "../../post_put_delete/create.js";
import forms from "../forms.js";
import modalProduct from "./modal_product.js";
import RenderTable from "../render.js";

const modalCreate = (e) => {
  const key = e.target.dataset.create
  const formHtml = forms[key]
  const admin = document.querySelector('.admin')
  const modalId = 'modal-create'
  let modal, form, validateForm, renderTable, tbody,
    content, formName, characteristicModal, characteristicArr = []

  const hendleClick = (e) => {
    if (e.target.classList.contains('modal__body') || e.target.closest('.modal__close')) {
      close()
    }
  }

  const create = () => {
    admin.insertAdjacentHTML('beforeend', modalHtml(modalId))
    modal = document.querySelector(`#${modalId}`)
    content = modal.querySelector('.modal__content')
    content.innerHTML = formHtml

    filling() // 1 выполняется после создания

    if (key === 'product') {
      PreviewImg(`#${modalId}`, true)
      modalProduct(`#${modalId}`)
    } else PreviewImg(`#${modalId}`)

    setTimeout(() => open(), 10)
    validate()
    submit()
  }

  const filling = () => {
    form = modal.querySelector('.modal__form')
    formName = form.dataset.validate
    renderTable = RenderTable[formName]
    tbody = document.querySelector(`#${formName} .admin__table_tbody`)
    characteristicModal = modal.querySelector('.admin__wrapper-characteristic')
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

  const remove = () => {
    modal.remove()
  }

  const validate = () => {
    validateForm = new JustValidate(`div#${modalId} .modal__form`, {
      errorLabelStyle: {
        color: '#d31111'
      },
    });

    const validate = Validated[`${formName}`]
    validate(validateForm, `#${modalId}`)
  }

  const characteristic = () => {
    const characteristicRow = characteristicModal.querySelectorAll('.admin__characteristic-row')

    characteristicRow.forEach(row => {
      let obj = {}
      const title = row.querySelector('input[name="title"]')
      const description = row.querySelector('input[name="description"]')

      obj.title = title.value
      obj.description = description.value
      characteristicArr.push(obj)
    });
  }

  const submit = () => {
    form.addEventListener('submit', () => {
      validateForm.revalidate()
        .then(isValid => {
          if (!isValid) return
          if (key === 'product') {
            characteristic()
            Create(form, formName, modal, characteristicArr)
              // .then(res => res.status === 200 && location.reload())
              .then(res => console.log(res))
              // .then(() => close())
              .catch(err => console.log(err))
          } else {
            Create(form, formName, modal)
              // .then(res => res.status === 200 && location.reload())
              .then(res => console.log(res))
              // .then(() => close())
              .catch(err => console.log(err))
          }
        })
    })
  }

  create()

  window.addEventListener('click', hendleClick)
  window.addEventListener('keyup', e => { if (e.key === 'Escape') close() })
}

export default modalCreate