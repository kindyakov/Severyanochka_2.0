import RangeSlider from "./rangeSlider.js";
import { getData } from "../admin/get_data.js";
import { productHtml, productError } from "./productHtml.js";
import loader from "../loader.js";
import paginationProduct from "./pagination.js";
import rating from "./rating.js";
import { disableCardButtons } from "./disableCardBtn.js";
import { Params } from "./queryParams.js";

const filters = (filter, basket, favourite) => {
  const footer = document.querySelector('.catalog-products__footer')
  const filter__menu = document.querySelector('.filter__menu')
  const inputCheckbox = document.querySelector('.filters__wrapper-checkbox__checkbox');
  const filterMenuList = document.querySelector('.filter-menu__list');
  const filterItemClear = document.querySelector('.filter-menu__item-clear');
  const product_container = document.querySelector('#products-container')
  const rangeSlider = new RangeSlider(filter.min, filter.max)
  // F3F2F1
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
    renderFilter(products.filter)
    rating()
    disableCardButtons(basket, '.card-button.add-btn')
    disableCardButtons(favourite, '.card-like')
    paginationProduct(products.count, basket, favourite)
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
    filterMenuList.insertAdjacentHTML('beforeend', `<li class="filter-menu__item filterss__items filters__item-price active"><span class="filter-menu__item-span filters__item-price_text">${filter.min} ₽ - ${filter.max} ₽</span><span
    class="filter-menu__item-close"></span></li>`)
    product_container.style.marginTop = '20px'
    filterItemClear.classList.remove('none')
  }

  const createParams = () => {
    const minPriceInput = document.querySelector('#min-price');
    const maxPriceInput = document.querySelector('#max-price');

    let params = Params
    params.filters = {
      min: +minPriceInput.value,
      max: +maxPriceInput.value,
    }

    return params
  }

  const submint = () => {
    const params = createParams()
    product_container.innerHTML = loader()

    getProduct('product', params)
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

    }
  }

  window.addEventListener('click', handlerClick)
}

export default filters