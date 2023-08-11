import JustValidate from "just-validate"
import { modalHtml } from "../../modal/html.js"
import { Validated } from "../../modal/validate.js"
import PreviewImg from "../../modal/previewImg.js"
import Update from "../../post_put_delete/update.js"
import modalProduct from "./modal_product.js"
import { getDataId } from "../get_data.js"
import { modal_html } from "./html/modal_html.js"

const modalUpdate = (rout, id) => {
  const formHtml = modal_html[rout]
  const admin = document.querySelector('.admin')
  const modalId = 'modal-update'
  let modal, form, validateForm, data, content, formName, characteristicArr = []

  const hendleClick = (e) => {
    if (e.target.classList.contains('modal__body') || e.target.closest('.modal__close')) {
      close()
    }
  }
  const request = async () => {
    try {
      data = await getDataId(rout, id)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const create = () => {
    admin.insertAdjacentHTML('beforeend', modalHtml(modalId))
    modal = document.querySelector(`#${modalId} `)
    content = modal.querySelector('.modal__content')
    request()
      .then(data => content.innerHTML = formHtml(data))
      .then(() => orderFunction())
  }
  const orderFunction = () => {
    filling() // 1 выполняется после создания
    setTimeout(() => open(), 10) // Открытие окна
    if (rout === 'product') {
      modalProduct(`#${modalId}`)
      PreviewImg(`#${modalId}`, true) // Загрузка фото
    } else PreviewImg(`#${modalId}`)
    validate() // Валидация
    form.addEventListener('submit', submit) // Отправка формы
  }
  const filling = () => {
    form = modal.querySelector('.modal__form')
    // formName = form.dataset.validate
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

  const characteristic = () => {
    const characteristicRow = modal.querySelectorAll('.admin__characteristic-row')

    characteristicRow.forEach(row => {
      let obj = {}
      const id = row.dataset.charid
      const title = row.querySelector('input[name="title"]')
      const description = row.querySelector('input[name="description"]')

      obj.title = title.value
      obj.description = description.value
      obj.id = id ? id : 'new'
      characteristicArr.push(obj)
    });
  }
  const validate = () => {
    validateForm = new JustValidate(`div#${modalId} .modal__form`, {
      errorLabelStyle: {
        color: '#d31111'
      },
    });

    const validated = Validated[rout]
    validated(validateForm, `#${modalId}`)
  }
  const submit = async () => {
    try {
      const isValid = await validateForm.revalidate()
      if (!isValid) return
      if (rout === 'product') {
        characteristic()
        const response = await Update(form, rout, id, modal, characteristicArr)
        response.status === 200 && location.reload()
      } else {
        const response = await Update(form, rout, id, modal)
        response.status === 200 && location.reload()
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  create()

  window.addEventListener('click', hendleClick)
  window.addEventListener('keyup', e => { if (e.key === 'Escape') close() })
}

export default modalUpdate