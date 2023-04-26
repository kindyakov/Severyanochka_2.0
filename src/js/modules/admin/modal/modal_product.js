import { getDataAll } from "../get_data.js";

const characteristicHtml = () => {
  return `<div class="admin__characteristic-row">
  <div class="modal__wrapper-input">
    <label class="admin__label"></label>
    <input type="text" name="title" class="admin__input _input" autocomplete="off">
  </div>
  <div class="modal__wrapper-input">
    <label class="admin__label"></label>
    <input type="text" name="description" class="admin__input _input" autocomplete="off">
  </div>
  </div>`
}

const modalProduct = (modalId) => {
  const modal = document.querySelector(`${modalId}`);
  const selectType = modal.querySelector('.admin__select[name="typeId"]')
  const selectBrand = modal.querySelector('.admin__select[name="brandId"]')
  const wrapperCharacteristic = modal.querySelector('.admin__wrapper-characteristic')
  const btmCharacteristic = modal.querySelector('.admin__button.characteristic-btn')

  const renderSelect = (select, data) => {
    select.innerHTML = '';
    data.forEach(obj => {
      select.insertAdjacentHTML('beforeend', `<option value="${obj.id}">${obj.name}</option>`)
    });
  }

  getDataAll('type')
    .then(data => renderSelect(selectType, data))
    .catch(err => console.log(err))

  getDataAll('brand')
    .then(data => renderSelect(selectBrand, data))
    .catch(err => console.log(err))

  btmCharacteristic.addEventListener('click', () => {
    wrapperCharacteristic.insertAdjacentHTML('beforeend', characteristicHtml())
  })
}

export default modalProduct