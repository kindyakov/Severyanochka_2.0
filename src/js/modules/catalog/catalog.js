import translit from '../translite.js'
import { $api } from '../API.js'
import { apiImgTypes } from '../API.js'

function renderImg(arrImg) {
  const [img] = JSON.parse(arrImg)
  return `${apiImgTypes}${img}`
}

function typeItemHtml({ img, name }) {
  return `<div class="main__catalog-cards">
  <a href="catalog/${translit(name)}.html" class="main__catalog-link link-catalog">
    <img src="${img && renderImg(img)}" alt="${name}" class="main__catalog-img">
    <div class="main__catalog-cards_gradient"><span class="main__catalog-name_cards">${name}</span></div>
  </a>
</div>`
}
console.log(translit('Сметана ПРОСТОКВАШИНО 15%, без змж, 300г, Россия, 300 г'))
const catalog = () => {
  const main_catalog = document.querySelector('#catalog ')
  if (!main_catalog) return

  const renderType = (types) => {
    types.forEach(type => {
      main_catalog.insertAdjacentHTML('beforeend', typeItemHtml(type))
    });
  }

  const getTypes = async () => {
    try {
      const { data } = await $api.get('api/type')
      data.count > 0 && renderType(data.rows)
    } catch (error) {
      console.error('Ошибка получение типов в каталоге:', error.message);
    }
  }

  getTypes()
}

export default catalog