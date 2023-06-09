import { paramsAdmin } from "./Params.js"
import RenderTable from "./render.js"
import { getData } from "./get_data.js"
import pagination from "./pagination.js"
import Table from "./table.js"
import loader from "../loader.js"
import sortingTabble from "./sortingTable.js"

const aside = () => {
  const admin__content = document.querySelectorAll('.admin__content')
  const admin__asideTab = document.querySelectorAll('.admin__aside-tab')
  const params = paramsAdmin

  const Loader = (isNone = false) => {
    const backgroundLoader = document.querySelector('.background-loader')
    if (isNone) {
      backgroundLoader.classList.remove('_visible')
    } else {
      backgroundLoader.classList.add('_visible')
      backgroundLoader.innerHTML = loader()
    }
  }

  const renderTable = async ({ tbody, table, rout }) => {
    try {
      Loader()
      const Renders = RenderTable[rout]
      const data = await getData({ rout, params })
      Loader(true)
      Renders(tbody, data)
      pagination(data.count, rout)
      Table(table)
      sortingTabble()
    } catch (error) {
      console.log(error)
    }
  }

  const assign = (e) => {
    const hash = location.hash || '#product'
    const id = e ? e.target.getAttribute('href') : hash
    const table = document.querySelector(`${id}`)
    const tbody = table.querySelector('.admin__table_tbody')
    const rout = id.replace('#', '')
    return { id, table, tbody, rout }
  }

  const removeActive = () => {
    admin__content.forEach(content => content.classList.remove('_active'))
    admin__asideTab.forEach(tab => tab.classList.remove('_active'))
  }

  const addActive = (tab, table) => {
    tab.classList.add('_active')
    table.classList.add('_active')
  }

  const handlerClick = e => {
    if (e.target.closest('.admin__aside-tab:not(._active)')) {
      const { table, tbody, rout } = assign(e)
      removeActive()
      addActive(e.target, table)
      renderTable({ tbody, table, rout })
    }
  }

  const handlerLoad = () => {
    const { id, table, tbody, rout } = assign()
    const [tab] = Array.from(admin__asideTab).filter(tab => tab.getAttribute('href') === id)

    removeActive()
    addActive(tab, table)
    renderTable({ tbody, table, rout })
  }

  window.addEventListener('click', handlerClick)
  window.addEventListener('load', handlerLoad)
}

export default aside