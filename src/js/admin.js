import jwt_decode from "jwt-decode";
import { url } from "./modules/API.js";
import { createdProduct, createdBrand, createdType } from "./modules/admin/modal_admin.js";
import getData from "./modules/admin/get_data.js";
import { renderProducts, renderBrands, renderTypes, renderFeedback, renderUsers } from "./modules/admin/render.js";

if (location.pathname === '/admin.html') {
  if (!localStorage.getItem('token')) location.assign(`${url}/index.html`)
  const t_User = jwt_decode(localStorage.getItem('token'))
  if (t_User.role !== 'admin') location.assign(`${url}/index.html`)

  createdProduct.createModal()
  createdProduct.validate()

  createdBrand.createModal()
  createdBrand.validate()

  createdType.createModal()
  createdType.validate()

  const admin__labelFile = document.querySelector('.admin__label-file')
  const admin__wrapperImg = document.querySelector('.admin__wrapper-img')
  const input__img = document.querySelector('#img-product');
  const fileName = document.querySelector('.file-name')
  let files;

  const uploadImg = e => {
    files = Array.from(e.target.files)
    files.forEach(file => {
      fileName.insertAdjacentText('beforeend', `${file.name}, `)
      const reader = new FileReader()

      reader.onload = e => {
        admin__wrapperImg.insertAdjacentHTML('beforeend', `<div data-name="${file.name}"><span class="img-name">${file.name}</span><img src="${e.target.result}" alt="${file.name}"><span class="img-delete">✖</span></div>`)
        admin__labelFile.classList.add('success')
        admin__labelFile.classList.remove('invalide')
      }

      reader.readAsDataURL(file)
    })
  }
  const deleteImg = (e) => {
    const target = e.target;
    if (target.classList.contains('img-delete')) {
      const div = target.closest('div')
      const name = div.dataset.name
      files = files.filter(file => file.name !== name)
      const deleteImg = admin__wrapperImg.querySelector(`[data-name="${name}"]`)
      deleteImg.remove()
      console.log(files)

      if (files.length == 0) {
        fileName.textContent = ''
        admin__labelFile.classList.remove('success')
        admin__labelFile.classList.add('invalide')
      }
    }
  }

  input__img.addEventListener('change', uploadImg)
  admin__wrapperImg.addEventListener('click', deleteImg)
  // ======================================================


  const admin__aside = document.querySelector('.admin__aside')
  const admin__content = document.querySelectorAll('.admin__content')
  const admin__asideTab = document.querySelectorAll('.admin__aside-tab')

  const asideClick = e => {
    const target = e.target
    if (target.closest('.admin__aside-tab')) {
      admin__content.forEach(content => content.classList.remove('_active'))
      admin__asideTab.forEach(tab => tab.classList.remove('_active'))

      const id = target.getAttribute('href').replace('#', '')
      const table = document.querySelector(`#${id}`)
      // const tbody = table.querySelector('.admin__table_tbody')

      target.classList.add('_active')
      table.classList.add('_active')

      // getData(id)
      //   .then(data => {
      //     if (id === 'brand') renderBrand(tbody, data)
      //   })
      //   .catch(error => console.error(error))
    }
  }

  const asideLoad = e => {
    if (location.hash) {
      admin__content.forEach(content => content.classList.remove('_active'))
      admin__asideTab.forEach(tab => tab.classList.remove('_active'))

      admin__asideTab.forEach(tab => {
        const id = tab.getAttribute('href')
        const table = document.querySelector(`${id}`)
        const tbody = table.querySelector('.admin__table_tbody')
        const rout = id.replace('#', '')


        getData(rout)
          .then(res => {
            if (!res) throw new Error(`Ошибка: пусто`)
            return res
          })
          .then(data => {
            if (rout === 'products') renderProducts(tbody, data)
            if (rout === 'brand') renderBrands(tbody, data)
            if (rout === 'type') renderTypes(tbody, data)
            if (rout === 'feedback') renderFeedback(tbody, data)
            if (rout === 'user') renderUsers(tbody, data)
          })
          .catch(error => console.error(error))

        if (id === location.hash) {
          tab.classList.add('_active')
          table.classList.add('_active')
        }
      })
    } else {
      document.querySelector('.admin__aside-tab[href="#product"]').classList.add('_active')
      document.querySelector('#product').classList.add('_active')
    }
  }


  admin__aside.addEventListener('click', asideClick)
  window.addEventListener('load', asideLoad)
}