import getData from "../get_data.js";

const modalProduct = (modalId) => {
  const modal = document.querySelector(`${modalId}`);
  const selectType = modal.querySelector('.admin__select[name="typeId"]')
  const selectBrand = modal.querySelector('.admin__select[name="brandId"]')

  const renderSelect = (select, data) => {
    select.innerHTML = '';
    data.forEach(obj => {
      select.insertAdjacentHTML('beforeend', `<option value="${obj.id}">${obj.name}</option>`)
    });
  }

  getData('type')
    .then(data => renderSelect(selectType, data))
    .catch(err => console.log(err))

  getData('brand')
    .then(data => renderSelect(selectBrand, data))
    .catch(err => console.log(err))
}

export default modalProduct