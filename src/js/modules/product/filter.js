import RangeSlider from "./rangeSlider.js";
import { getData } from "../admin/get_data.js";
import { productHtml, productError } from "./productHtml.js";
import loader from "../loader.js";
import paginationProduct from "./pagination.js";
import rating from "./rating.js";
import { disableCardButtons } from "./disableCardBtn.js";
import { Params } from "./queryParams.js";

const filters = ({ filter, basket, favourite, Rout }) => {
  const footer = document.querySelector('.catalog-products__footer')
  const inputCheckbox = document.querySelector('.filters__wrapper-checkbox__checkbox');
  const filterMenuList = document.querySelector('.filter-menu__list');
  const filterItemClear = document.querySelector('.filter-menu__item-clear');
  const product_container = document.querySelector('#products-container')
  const filter__select = document.querySelector('.filter__select')
  const rangeSlider = new RangeSlider(filter.min, filter.max)
  const rout = Rout

  const clearFilter = () => {
    rangeSlider.clear()
    inputCheckbox.checked = true
  }

  const getProduct = async (rout, params) => {
    try {
      const data = await getData({ rout, params })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const stackFun = (products) => {
    const count = products.count
    rating()
    disableCardButtons(basket, '.card-button.add-btn')
    disableCardButtons(favourite, '.card-like')
    paginationProduct({ count, basket, favourite, Rout })
  }

  const renderProduct = (products) => {
    if (products.count > 0) {
      product_container.innerHTML = ''
      products.rows.forEach(product => {
        product_container.insertAdjacentHTML('beforeend', productHtml(product))
      });
      stackFun(products)
      footer.classList.remove('novisible')
    } else {
      product_container.innerHTML = productError()
      footer.classList.add('novisible')
    }
  }

  const renderFilter = (filter) => {
    filterMenuList.innerHTML = `<li class="filter-menu__item filterss__items filters__item-price active" data-filter="price"><span class="filter-menu__item-span filters__item-price_text">${++filter.min} ₽ - ${--filter.max} ₽</span><span
    class="filter-menu__item-close"></span></li>`
    filterItemClear.classList.remove('none')
  }

  const createParams = () => {
    const minPriceInput = document.querySelector('#min-price');
    const maxPriceInput = document.querySelector('#max-price');
    const [name, type] = filter__select.value.split('-');

    let params = Params
    params.page = 1
    params.filters = {
      min: +minPriceInput.value,
      max: +maxPriceInput.value,
      sort_name: name,
      sort_type: type
    }

    return params
  }

  const submint = () => {
    const params = createParams()
    product_container.innerHTML = loader()

    getProduct(rout, params)
      .then(data => {
        renderProduct(data)
        renderFilter(data.filter)
      })
      .catch(err => console.log(err))
  }

  const select = () => {
    let params = createParams()
    const [name, type] = filter__select.value.split('-');

    product_container.innerHTML = loader()
    params.filters.sort_name = name
    params.filters.sort_type = type

    getProduct(rout, params)
      .then(data => renderProduct(data))
      .catch(err => console.log(err))
  }

  const handlerClick = (e) => {
    if (e.target.classList.contains('filters_box-paramets__btn')) {
      clearFilter()
    }
    if (e.target.classList.contains('catalog-products__filters_button')) {
      submint()
    }
    if (e.target.closest('.filter-menu__item-clear')) {
      filterMenuList.innerHTML = ''
      filterItemClear.classList.add('none')
      clearFilter()
      select()
    }
  }

  filter__select.addEventListener('change', select)
  window.addEventListener('click', handlerClick)
}

export default filters