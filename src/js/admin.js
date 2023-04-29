import jwt_decode from "jwt-decode";
import { url } from "./modules/API.js";
import { getData } from "./modules/admin/get_data.js";
import RenderTable from "./modules/admin/render.js";
import Table from "./modules/admin/table.js";
import pagination from "./modules/admin/pagination.js";

if (location.pathname === '/admin.html') {
  if (!localStorage.getItem('token')) location.assign(`${url}/index.html`)
  const t_User = jwt_decode(localStorage.getItem('token'))
  if (t_User.role !== 'admin') location.assign(`${url}/index.html`)

  //  =====================================================

  const admin__aside = document.querySelector('.admin__aside')
  const admin__content = document.querySelectorAll('.admin__content')
  const admin__asideTab = document.querySelectorAll('.admin__aside-tab')

  const asideClick = e => {
    const target = e.target
    if (target.closest('.admin__aside-tab:not(._active)')) {
      admin__content.forEach(content => content.classList.remove('_active'))
      admin__asideTab.forEach(tab => tab.classList.remove('_active'))

      const id = target.getAttribute('href')
      const table = document.querySelector(`${id}`)
      const tbody = table.querySelector('.admin__table_tbody')
      const rout = id.replace('#', '')
      let params = {
        page: 1, limit: 15
      }
      target.classList.add('_active')
      table.classList.add('_active')

      const Renders = RenderTable[rout]

      getData({ rout, params })
        .then(data => {
          Renders(tbody, data)
          pagination(data.count, rout)
          Table(table)
        })
        .catch(error => console.log(error))
    }
  }

  const asideLoad = e => {
    admin__content.forEach(content => content.classList.remove('_active'))
    admin__asideTab.forEach(tab => tab.classList.remove('_active'))

    const id = location.hash || '#product'
    const [tab] = Array.from(admin__asideTab).filter(tab => tab.getAttribute('href') === id)
    const table = document.querySelector(`${id}`)
    const tbody = table.querySelector('.admin__table_tbody')
    const rout = id.replace('#', '')
    const Renders = RenderTable[rout]
    let params = {
      page: 1, limit: 15
    }

    getData({ rout, params })
      .then(res => {
        if (!res) throw new Error(`Ошибка: пусто`)
        return res
      })
      .then(data => {
        Renders(tbody, data)
        Table(table)
        pagination(data.count, rout)
      })
      .catch(error => console.log(error))

    tab.classList.add('_active')
    table.classList.add('_active')
  }

  admin__aside.addEventListener('click', asideClick)
  window.addEventListener('load', asideLoad)
}