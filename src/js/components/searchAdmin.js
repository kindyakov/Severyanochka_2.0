import { renderImgProduct, createProductURL, baseUrl } from "../modules/API.js";
import { search } from "../modules/product/request.js";

function insertMark(str, val) {
  let i = str.trim().toLowerCase().search(val)
  let len = val.length
  if (i === -1) return str
  return str.slice(0, i) + '<mark>' + str.slice(i, i + len) + '</mark>' + str.slice(i + len)
}

export class SearchAdmin {
  constructor(rout) {
    this.searchBlock = document.querySelector(`.admin__search-block[data-search="${rout}"]`)
    this.form = this.searchBlock.querySelector('.form-search')
    this.searchInput = this.searchBlock.querySelector('.admin__menu_input');
    this.searchResults = this.searchBlock.querySelector('.search_result');
    this.searchList = this.searchBlock.querySelector('.search_list')

    this.timerId = null;
    this.value;
    this.rout = rout;

    this.searchInput.addEventListener('input', this.handleInput.bind(this));
    this.form.addEventListener('submit', this.submit.bind(this))
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
      } else {
        this.disableList()
      }
    }, 300);
  }

  handleClick(e) {
    if (!e.target.closest(`.admin__search-block[data-search="${this.rout}"]`)) {
      this.form.reset()
      this.disableList()
    }
  }

  async performSearch(value) {
    try {
      const data = await search(this.rout, value);

      if (data.length > 0) {
        this.renderResults(data)
      } else {
        this.disableList()
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса', error);
    }
  }

  submit(e) {
    e.preventDefault()
    if (!this.value && this.value.length === 0) return
  }

  activeList() {
    this.searchList.innerHTML = '';
    this.searchResults.classList.add('_active')
  }

  disableList() {
    this.searchList.innerHTML = '';
    this.searchResults.classList.remove('_active')
  }

  renderResults(data) {
    this.activeList()
    data.forEach(card => {
      this.searchList.insertAdjacentHTML('beforeend', this.cardHtml(card))
    })
  }

  cardHtml(card) {
    return `<li class="search_li" data-productid="${card.id}">
    <div class="search_link">
      <div class="search-wrapper_img">
        <img class="search_img" src="" alt="Картинка">
      </div>
      <span class="search_span">
        ${this.rout === 'user' ? insertMark(`${card.surname} ${card.name}`, this.value) : insertMark(card.name, this.value)}
      </span>
      ${this.rout === 'product' ? `<span class="search_price">${card.price} ₽</span>` : ''}
    </div>
  </li>`
  }
}
