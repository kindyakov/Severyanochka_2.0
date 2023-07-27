import RangeSlider from "./rangeSlider.js";
import { productHtml, productError } from "./productHtml.js";
import loader from "../loader.js";
import paginationProduct from "./pagination.js";
import rating from "./rating.js";
import { disableCardButtons } from "./disableCardBtn.js";
import { params } from "./queryParams.js";
import { getWithAuthParams, getWithParams } from "./request.js";

const filters = ({ filter, basket, favourite, rout }) => {
  const footer = document.querySelector('.catalog-products__footer')
  const inputCheckbox = document.querySelector('.filters__wrapper-checkbox__checkbox');
  const filterMenuList = document.querySelector('.filter-menu__list');
  const filterItemClear = document.querySelector('.filter-menu__item-clear');
  const product_container = document.querySelector('#products-container')
  const filter__select = document.querySelector('.filter__select')
  const rangeSlider = new RangeSlider(filter.min, filter.max)

  const clearFilter = () => {
    rangeSlider.clear()
    inputCheckbox.checked = true
  }


  const stackFun = (products) => {
    const count = products.count
    rating()
    disableCardButtons(basket, '.card-button.add-btn')
    disableCardButtons(favourite, '.card-like')
    paginationProduct({ count, basket, favourite, rout })
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

    params.page = 1
    params.filters = {
      min: +minPriceInput.value,
      max: +maxPriceInput.value,
      sort_name: name,
      sort_type: type
    }

    return params
  }

  const submint = async () => {
    try {
      let params = createParams()
      product_container.innerHTML = loader()

      const data = await getWithAuthParams({ rout, params })
      renderProduct(data)
      renderFilter(data.filter)
    } catch (error) {
      console.log(error.message)
    }
  }

  const select = async () => {
    try {
      let params = createParams()
      product_container.innerHTML = loader()

      const data = await getWithParams({ rout, params })
      renderProduct(data)
    } catch (error) {
      console.log(error.message)
    }
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