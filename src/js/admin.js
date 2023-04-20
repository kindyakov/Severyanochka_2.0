import jwt_decode from "jwt-decode";
import { url } from "./modules/API.js";
import { createdProduct, createdBrand, createdType } from "./modules/admin/modal/modal_create.js";
import getData from "./modules/admin/get_data.js";
import RenderTable from "./modules/admin/render.js";
import PreviewImg from "./modules/modal/previewImg.js";
import checkbox from "./modules/admin/table.js";
import modalProduct from "./modules/admin/modal/modal_product.js";

if (location.pathname === '/admin.html') {
  if (!localStorage.getItem('token')) location.assign(`${url}/index.html`)
  const t_User = jwt_decode(localStorage.getItem('token'))
  if (t_User.role !== 'admin') location.assign(`${url}/index.html`)

  createdProduct.createModal()
  createdProduct.validate()
  PreviewImg('#created-product', true)
  modalProduct('#created-product')

  createdBrand.createModal()
  createdBrand.validate()
  PreviewImg('#created-brand')

  createdType.createModal()
  createdType.validate()
  PreviewImg('#created-type')
  // ======================================================
  //  =====================================================

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
      const tbody = table.querySelector('.admin__table_tbody')

      target.classList.add('_active')
      table.classList.add('_active')

      getData(id)
        .then(data => {
          const Renders = RenderTable[id]
          Renders(tbody, data)
        })
        .then(() => checkbox(table))
        .catch(error => console.error(error))
    }
  }

  const asideLoad = e => {
    if (location.hash) {
      admin__content.forEach(content => content.classList.remove('_active'))
      admin__asideTab.forEach(tab => tab.classList.remove('_active'))

      const id = location.hash
      const [tab] = Array.from(admin__asideTab).filter(tab => tab.getAttribute('href') === id)
      const table = document.querySelector(`${id}`)
      const tbody = table.querySelector('.admin__table_tbody')
      const rout = id.replace('#', '')
      const Renders = RenderTable[`${rout}`]

      getData(rout)
        .then(res => {
          if (!res) throw new Error(`Ошибка: пусто`)
          return res
        })
        .then(data => Renders(tbody, data))
        .then(() => checkbox(table))
        .catch(error => console.error(error))

      tab.classList.add('_active')
      table.classList.add('_active')

    } else {
      document.querySelector('.admin__aside-tab[href="#product"]').classList.add('_active')
      const table = document.querySelector('#product')
      table.classList.add('_active')
      checkbox(table)
    }
  }

  admin__aside.addEventListener('click', asideClick)
  window.addEventListener('load', asideLoad)
}