import { getData } from "./get_data.js"
import RenderTable from "./render.js"

const paginationHtml = (page, active = '') => {
  return `<div class="admin__pagination ${active}" data-page="${page}">
  <span class="admin__pagination-count">${page}</span>
  </div>`
}

const pagination = (counts, id) => {
  const content = document.querySelector(`#${id}`)
  const tbody = content.querySelector('.admin__table_tbody')
  const wrapperPagin = content.querySelector('.admin__wrapper-pagination')
  const rout = id
  let page, limit = 15
  const numberPages = Math.ceil(counts / limit)
  const Renders = RenderTable[rout]

  wrapperPagin.innerHTML = ''
  for (let _page = 1; _page <= numberPages; _page++) {
    if (_page === 1) {
      wrapperPagin.insertAdjacentHTML('beforeend', paginationHtml(_page, '_active'))
    } else { wrapperPagin.insertAdjacentHTML('beforeend', paginationHtml(_page)) }
  }
  const paginations = content.querySelectorAll('.admin__pagination')

  const activePagin = (page) => {
    paginations.forEach(pagin => {
      if (pagin.dataset.page === page) {
        pagin.classList.add('_active')
      } else pagin.classList.remove('_active')
    });
  }

  const handlerClick = (e) => {
    if (e.target.closest('.admin__pagination:not(._active)')) {
      const pagin = e.target.closest('.admin__pagination')
      page = pagin.dataset.page
      const params = { page, limit }
      activePagin(page)

      getData({ rout, params })
        .then(data => Renders(tbody, data))
        .catch(err => console.log(err))
    }
  }

  wrapperPagin.addEventListener('click', handlerClick)
}

export default pagination