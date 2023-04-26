import handlerBtnUpdate from "./handlerBtnUpdate.js";
import handlerBtnDelete from "./handlerBtnDelete.js";
import modalCreate from "./modal/modal_create.js";

const table = (tables) => {
  const table = tables;
  const btnCreate = table.querySelector('.admin__menu_button.create')
  const btnUpdate = table.querySelector('.admin__menu_button.update')
  const btnDelete = table.querySelector('.admin__menu_button.delete')
  const all_checkbox = table.querySelector('.admin__table_checkbox._all')
  const checkbox = table.querySelectorAll('.input-checkbox')
  let activeCheckbox

  const main_checkbox = (target) => {
    if (target.checked === true) checkbox.forEach(input => input.checked = true)
    else checkbox.forEach(input => input.checked = false);
  }
  const disableBtn = () => {
    btnDelete.classList.remove('_active')
    btnUpdate.classList.remove('_active')
  }
  const activeBtn = () => {
    let checkedInput = []

    checkbox.forEach(input => {
      if (input.checked === true) {
        checkedInput.push(input)
        btnDelete.classList.add('_active')
        if (checkedInput.length === checkbox.length) all_checkbox.checked = true
      } else if (checkedInput.length === 0) {
        disableBtn()
        table.querySelector('.admin__table_checkbox._all').checked = false;
      }
      if (checkedInput.length === 1) {
        btnUpdate.classList.add('_active')
        activeCheckbox = checkedInput[0]
      }
      else btnUpdate.classList.remove('_active')
    })
  }

  const hendlerClick = (e) => {
    const target = e.target;
    if (target.closest('.input-checkbox')) {
      activeBtn()
    }
    if (target.closest('.admin__table_checkbox._all')) {
      main_checkbox(target)
      activeBtn()
    }
    if (target.closest('.admin__aside-tab')) {
      disableBtn()
    }
  }

  window.addEventListener('click', hendlerClick)
  if (btnUpdate) {
    btnUpdate.addEventListener('click', e => handlerBtnUpdate(e, activeCheckbox))
  }
  if (btnDelete) {
    btnDelete.addEventListener('click', e => handlerBtnDelete(e, checkbox))
  }
  if (btnCreate) {
    btnCreate.addEventListener('click', e => modalCreate(e))
  }
}

export default table