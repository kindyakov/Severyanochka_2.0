const product__container = document.querySelector('#products-container')

export let params = {
  page: 1,
  limit: 6,
  typeId: product__container.dataset.typeid
    ? product__container.dataset.typeid : null
}