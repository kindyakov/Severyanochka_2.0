import pagination from "./pagination.js"
import loader from "../loader.js"
import { paramsAdmin } from "./Params.js"
import Table from "./table.js"
import RenderTable from "./render.js"
import { getData } from "./get_data.js"

const sortingTabble = () => {
  let params = paramsAdmin

  const Loader = (isNone = false) => {
    const backgroundLoader = document.querySelector('.background-loader')
    if (isNone) {
      backgroundLoader.classList.remove('_visible')
    } else {
      backgroundLoader.classList.add('_visible')
      backgroundLoader.innerHTML = loader()
    }
  }

  const assign = () => {
    const hash = location.hash || '#product'
    const id = hash
    const table = document.querySelector(`${id}`)
    const tbody = table.querySelector('.admin__table_tbody')
    const rout = id.replace('#', '')
    return { id, table, tbody, rout }
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
    } catch (error) {
      console.log(error)
    }
  }

  const removeActive = (table) => {
    const table_title = table.querySelectorAll('.admin__table_title')
    table_title.forEach(title => title.classList.remove('_active-1'))
    table_title.forEach(title => title.classList.remove('_active-2'))
  }

  const addActive = (title) => {
    title.classList.add('_active-1')
    return 'ASC'
  }


  const handlerClick = e => {
    if (e.target.closest('.admin__table_title')) {
      const th = e.target.closest('.admin__table_title')
      const dataSorting = th.dataset.sorting
      const { table, tbody, rout } = assign()

      removeActive(table)
      const attribute = addActive(th)

      params.sorting = { data: dataSorting, type: attribute }

      renderTable({ tbody, table, rout })

    }
  }

  window.addEventListener('click', handlerClick)
}

export default sortingTabble