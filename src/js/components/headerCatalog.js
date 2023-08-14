import { baseUrl } from "../modules/API.js";
import { getWithAuth } from "../modules/product/request.js"
import translit from "../modules/translite.js";

const headerCatalog = async () => {
  try {
    const headerCatalogList = document.querySelector('.header-catalog__list')
    const response = await getWithAuth('type')

    if (response.count > 0) {
      response.rows.forEach(type => {
        headerCatalogList.insertAdjacentHTML('beforeend',
          `<li class="header-catalog__item"><a href="${baseUrl}/catalog/${translit(type.name)}.html" class="header-catalog__link">${type.name}</a></li>`)
      });
    }

  } catch (error) {
    console.log('Ошибка при получение всех типов: ', error.message)
  }
}

export default headerCatalog