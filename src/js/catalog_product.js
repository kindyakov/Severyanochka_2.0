// import { getDataAll } from "./modules/admin/get_data.js"
// import { apiImgTypes } from "./modules/API.js"

// const imgSrc = (imgName) => {
//   return `${apiImgTypes}${JSON.parse(imgName)}`
// }

// const typeHtml = (data) => {
//   return `<div class="main__catalog-cards">
//   <a href="catalog__milk-cheese-egg.html" class="main__catalog-link link-catalog">
//     <img src="${imgSrc(data.img)}" alt="${data.name}" class="main__catalog-img">
//     <div class="main__catalog-cards_gradient"><span class="main__catalog-name_cards">${data.name}</span></div>
//   </a>
// </div>`
// }

// const main__catalog = document.querySelector('.main__catalog')

// if (main__catalog) {
//   const renderCatalog = async () => {
//     try {
//       const types = await getDataAll('type')
//       types.forEach(type => {
//         main__catalog.insertAdjacentHTML('beforeend', typeHtml(type))
//       });

//     } catch (error) {
//       console.log(error)
//     }
//   }
//   renderCatalog()
// }
import renderProduct from "./modules/product/renderProduct.js";

renderProduct()