import JustValidate from "just-validate"
import { modalHtml } from "../../modal/html.js"
import { Validated } from "../../modal/validate.js"
import PreviewImg, { imgHtml } from "../../modal/previewImg.js"
import Update from "../../post_put_delete/update.js"
import modalProduct from "./modal_product.js"
import { getDataId } from "../get_data.js"
import translit from "../../translite.js"

import {
  apiImgUsers,
  apiImgProducts,
  apiImgBrands,
  apiImgTypes,
} from "../../API.js"

const renderCharacteristic = (arr) => {
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
const renderImg = (arr, src) => {
  const html = []
  const images = JSON.parse(arr)
  images.forEach(img => {
    html.push(imgHtml(img, `${src}${img}`))
  })
  return html.join('')
}
const renderImgProduct = (arr, src, name) => {
  const html = []
  const images = JSON.parse(arr)
  const srcImg = `${src}${translit(name)}/`
  images.forEach(img => {
    html.push(imgHtml(img, `${srcImg}${img}`))
  })
  return html.join('')
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
    <div class="admin__wrapper-img">${data.img ? renderImgProduct(data.img, apiImgProducts, data.name) : ''}</div>
  </div>
  <div class="admin-column">
    <div class="modal__wrapper-input">
      <label class="admin__label">Название</label>
      <input type="text" name="name" class="admin__input _input" autocomplete="off" value="${data.name}">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Цена</label>
      <input type="text" name="price" class="admin__input _input" value="${data.price}">
    </div>
    <div class="modal__wrapper-input">
      <label class="admin__label">Цена по карте</label>
      <input type="text" name="price_card" class="admin__input _input" value="${data.price_card ? data.price_card : ''}">
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
      <input type="text" name="discount" class="admin__input _input" value="${data.discount}">
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
</form >
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
        <input type="file" accept="image/*" id="img-update-brand" name="img" class="admin__input _input">
        <span class="file-name"></span>
        <label class="file-download" for="img-update-brand">Загрузить</label>
      </label>
    </div>
    <div class="admin__wrapper-img">${data.img ? renderImg(data.img, apiImgBrands) : ''}</div>
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
  return `<div div class="modal-wrapper-title" >
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
    ${data.img ? renderImg(data.img, apiImgTypes) : ''}
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
  return ` < div class="modal-wrapper-title" >
  <h3 class="modal__title">Продукт</h3>
  <span class="error-res"></span>
</ >
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

const html = {
  product: productHtml,
  brand: brandHtml,
  type: typeHtml,
  // user: userHtml
}
const urlImg = {
  product: apiImgProducts,
  brand: apiImgBrands,
  type: apiImgTypes,
  user: apiImgUsers
}

const modalUpdate = (key, id) => {
  const rout = key
  const ID = id
  const formHtml = html[rout]
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
      .then(data => content.insertAdjacentHTML('beforeend', formHtml(data)))
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
    submit() // Отправка формы
  }
  const filling = () => {
    form = modal.querySelector('.modal__form')
    formName = form.dataset.validate
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

    const validated = Validated[formName]
    validated(validateForm, `#${modalId} `)
  }
  const submit = () => {
    form.addEventListener('submit', (e) => {
      validateForm.revalidate()
        .then(isValid => {
          if (!isValid) return
          if (rout === 'product') {
            characteristic()
            Update(form, rout, ID, modal, characteristicArr)
              .then(data => location.reload())
              .catch(err => console.log(err))
          } else {
            Update(form, rout, ID, modal)
              .then(data => console.log(data))
              .catch(err => console.log(err))
          }
        })
    })
  }

  create()

  window.addEventListener('click', hendleClick)
  window.addEventListener('keyup', e => { if (e.key === 'Escape') close() })
}

export default modalUpdate