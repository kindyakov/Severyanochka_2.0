import { search } from "../modules/product/request.js";
import loader from "../modules/loader.js"
import RenderTable from "../modules/admin/render.js"
import { getData } from "../modules/admin/get_data.js"
import { paramsAdmin } from "../modules/admin/Params.js"
import pagination from "../modules/admin/pagination.js"

function insertMark(str, val) {
  let i = str.trim().toLowerCase().search(val)
  let len = val.length
  if (i === -1) return str
  return str.slice(0, i) + '<mark>' + str.slice(i, i + len) + '</mark>' + str.slice(i + len)
}

export class SearchAdmin {
  constructor({ tbody, table, rout }) {
    this.timerId = null;
    this.value;
    this.params = paramsAdmin

    this.form = table.querySelector('.form-search')
    this.searchInput = table.querySelector('.admin__menu_input');

    this.tbody = tbody;
    this.table = table;
    this.rout = rout;
    this.Renders = RenderTable[rout]

    this.searchInput.addEventListener('input', this.handleInput.bind(this));
    document.addEventListener('click', this.handleClick.bind(this))
    document.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        this.form.reset()
        this.disableList()
      }
    })
  }

  handleInput(e) {
    clearTimeout(this.timerId);
    this.value = e.target.value.trim().toLowerCase();

    this.timerId = setTimeout(() => {
      if (this.value.length > 0) {
        this.performSearch(this.value);
        this.table.querySelector('.admin__wrapper-pagination').style.display = 'none'
      } else {
        this.clearTbody()
        this.renderTable()
      }
    }, 300);
  }

  handleClick(e) {
    if (e.target.closest(`.admin__aside-tab`)) {
      this.form.reset()
    }
  }

  async performSearch(value) {
    try {
      this.Loader()
      const data = await search(this.rout, value);
      this.Loader(true)

      if (data.length > 0) {
        this.Renders(this.tbody, { count: data.length, rows: data })
      } else {
        this.clearTbody()
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса', error);
    }
  }

  clearTbody() {
    this.tbody.innerHTML = '';
  }

  Loader(isNone = false) {
    const backgroundLoader = document.querySelector('.background-loader')
    if (isNone) {
      backgroundLoader.classList.remove('_visible')
    } else {
      backgroundLoader.classList.add('_visible')
      backgroundLoader.innerHTML = loader()
    }
  }

  async renderTable() {
    try {
      this.Loader()
      const data = await getData(this.rout, this.params)
      this.Loader(true)

      if (data || data.count > 0) {
        this.Renders(this.tbody, data)
        this.table.querySelector('.admin__wrapper-pagination').removeAttribute('style')
        pagination(data.count, this.rout)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}
