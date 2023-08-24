import pagination from "./pagination.js"
import loader from "../loader.js"
import { paramsAdmin } from "./Params.js"
import Table from "./table.js"
import RenderTable from "./render.js"
import { getData } from "./get_data.js"

const sortingTabble = ({ tbody, table, rout }) => {
  const Loader = (isNone = false) => {
    const backgroundLoader = document.querySelector('.background-loader')
    if (isNone) {
      backgroundLoader.classList.remove('_visible')
    } else {
      backgroundLoader.classList.add('_visible')
      backgroundLoader.innerHTML = loader()
    }
  }

  const renderTable = async ({ tbody, rout }) => {
    try {
      Loader()
      const Renders = RenderTable[rout]
      const data = await getData(rout, paramsAdmin)
      Loader(true)
      Renders(tbody, data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeActive = (table, dataAttribute) => {
    const table_title = table.querySelectorAll('.admin__table_title')
    table_title.forEach(title => {
      if (title.dataset.sorting === dataAttribute) return
      title.classList.remove('_active-1')
      title.classList.remove('_active-2')
    })
  }

  const addActive = (title) => {
    if (title.classList.contains('_active-1')) {
      title.classList.add('_active-2')
      title.classList.remove('_active-1')
      return 'DESC'
    } else if (title.classList.contains('_active-2')) {
      title.classList.add('_active-1')
      title.classList.remove('_active-2')
      return 'ASC'
    } else {
      title.classList.add('_active-1')
      return 'ASC'
    }
  }

  const handleClick = e => {
    if (e.target.closest('.admin__table_title:not(._checkbox)')) {
      const th = e.target.closest('.admin__table_title')
      const dataSorting = th.dataset.sorting

      removeActive(table, dataSorting)
      const attribute = addActive(th)

      paramsAdmin.sorting = { data: dataSorting, type: attribute }

      renderTable({ tbody, rout })
    }
  }

  document.removeEventListener('click', handleClick)
  document.addEventListener('click', handleClick)
}

export default sortingTabble