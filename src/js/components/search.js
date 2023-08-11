import { $api, renderImgProduct, createProductURL } from "../modules/API.js";

function insertMark(str, val) {
  let i = str.trim().toLowerCase().search(val)
  let len = val.length
  if (i === -1) return str
  return str.slice(0, i) + '<mark>' + str.slice(i, i + len) + '</mark>' + str.slice(i + len)
}

export class Search {
  constructor(inputElementId, resultsElementId) {
    this.searchInput = document.querySelector(inputElementId);
    this.searchResults = document.querySelector(resultsElementId);
    this.searchList = this.searchResults.querySelector('.search_list')

    this.timerId = null;
    this.value

    this.searchInput.addEventListener('input', this.handleInput.bind(this));
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

  async performSearch(value) {
    try {
      const response = await $api.get(`/api/search?search=${value}`);

      if (response.data.length > 0) {
        this.renderResults(response.data)
      } else {
        this.disableList()
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса', error);
    }
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
    <a href="${createProductURL(card.type.name, card.name)}" class="search_link">
      <div class="search-wrapper_img">
        <img class="search_img" src="${renderImgProduct(card.img, card.name)}" alt="Картинка">
      </div>
      <span class="search_span">${insertMark(card.name, this.value)}</span>
      <span class="search_price">${card.price} ₽</span>
    </a>
  </li>`
  }
}
