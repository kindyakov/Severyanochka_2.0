import { getData } from "../admin/get_data.js";
import { productHtml } from "./productHtml.js";
import { disableCardButtons } from "./disableCardBtn.js";
import rating from "./rating.js";

const paginationProduct = (counts, basket, favourite) => {
  const product__container = document.querySelector('#products-container')
  const products__footer = document.querySelector(`.catalog-products__footer`)
  const pagination__list = products__footer.querySelector('.module-pagination__list')
  const more__btn = products__footer.querySelector('.products__more-btn')

  const rout = 'product'
  let params = { page: 1, limit: 6, typeId: product__container.dataset.typeid }
  const numberPages = Math.ceil(counts / params.limit)
  let paginations, activePages = [params.page]

  const getProduct = async () => {
    try {
      const data = await getData({ rout, params })
      if (data) {
        renderProduct(data)
        rating()
      }
      return data
    } catch (error) {
      console.log(error)
    }
  }
  const renderProduct = (data) => {
    data.rows.forEach(data => {
      product__container.insertAdjacentHTML('beforeend', productHtml(data))
    });
  }
  const renderPagination = () => {
    products__footer.classList.remove('novisible')
    pagination__list.innerHTML = ''
    for (let _page = 1; _page <= numberPages; _page++) {
      pagination__list.insertAdjacentHTML('beforeend', `<li class="module-pagination__item" data-page="${_page}">${_page}</li>`)
    }

    paginations = pagination__list.querySelectorAll('.module-pagination__item')
    activePagin(params.page)
  }
  const disableBtn = () => {
    if (counts <= params.limit) return
    if (numberPages === params.page) {
      more__btn.classList.add('disable')
    } else more__btn.classList.remove('disable')
  }
  const disableArrows = () => {
    const pagination__span = products__footer.querySelectorAll('.module-pagination__span')
    pagination__span.forEach(paginSpan => paginSpan.classList.remove('disable'))
    if (params.page === 1) {
      const first = products__footer.querySelector('.module-pagination__span[data-page="first"]')
      const prev = products__footer.querySelector('.module-pagination__span[data-page="prev"]')
      first.classList.add('disable')
      prev.classList.add('disable')
    }
    if (params.page === numberPages) {
      const last = products__footer.querySelector('.module-pagination__span[data-page="last"]')
      const next = products__footer.querySelector('.module-pagination__span[data-page="next"]')
      last.classList.add('disable')
      next.classList.add('disable')
    }
  }
  const activePagin = () => {
    paginations.forEach(pagin => pagin.classList.remove('_active'));
    activePages.forEach(_page => {
      const pagination = products__footer.querySelector(`.module-pagination__item[data-page="${_page}"]`)
      pagination.classList.add('_active')
    })
  }
  const mainLogic = (page) => {
    activePagin(page)
    getProduct()
      .then(() => {
        disableCardButtons(basket, '.card-button.add-btn')
        disableCardButtons(favourite, '.card-like')
      })
    disableBtn()
  }

  const clickBtn = () => {
    params.page = ++params.page
    activePages.push(params.page)
    mainLogic(params.page)
  }

  const clickPagin = e => {
    product__container.innerHTML = ''
    const pagin = e.target.closest('.module-pagination__item')
    params.page = Number(pagin.dataset.page)
    activePages = [params.page]
    mainLogic(params.page)
  }

  const clickArrows = e => {
    product__container.innerHTML = ''
    const page = e.target.dataset.page
    const arrow = e.target
    if (page === 'first') {
      params.page = 1
      activePages = [params.page]
      mainLogic(params.page)
      arrow.classList.add('disable')
    }
    if (page === 'prev' && params.page !== 1) {
      params.page = --params.page
      activePages = [params.page]
      mainLogic(params.page)
      arrow.classList.add('disable')
    }
    if (page === 'next' && params.page !== numberPages) {
      params.page = ++params.page
      activePages = [params.page]
      mainLogic(params.page)
      arrow.classList.add('disable')
    }
    if (page === 'last') {
      params.page = numberPages
      activePages = [params.page]
      mainLogic(params.page)
      arrow.classList.add('disable')
    }
  }

  const handlerClick = e => {
    if (e.target.closest('.module-pagination__item')) {
      clickPagin(e)
    }
    if (e.target.closest('.products__more-btn:not(.disable)')) {
      clickBtn()
    }
    if (e.target.closest('.module-pagination__span:not(.disable)')) {
      clickArrows(e)
    }
    disableArrows()
  }

  renderPagination()
  disableBtn()
  disableArrows()
  products__footer.addEventListener('click', handlerClick)
}

export default paginationProduct