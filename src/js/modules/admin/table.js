import handlerBtnUpdate from "./handlerBtnUpdate.js";
import handlerBtnDelete from "./handlerBtnDelete.js";
import modalCreate from "./modal/modal_create.js";

const table = (tables) => {
  const admin_wrapper = document.querySelector('.admin__wrapper')
  const btnCreate = tables.querySelector('.admin__menu_button.create')
  const btnUpdate = tables.querySelector('.admin__menu_button.update')
  const btnDelete = tables.querySelector('.admin__menu_button.delete')
  const all_checkbox = tables.querySelector('.admin__table_checkbox._all')
  const checkbox = tables.querySelectorAll('.input-checkbox')
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
        tables.querySelector('.admin__table_checkbox._all').checked = false;
      }
      if (checkedInput.length === 1) {
        btnUpdate.classList.add('_active')
        activeCheckbox = checkedInput[0]
      }
      else btnUpdate.classList.remove('_active')
    })
  }

  const handleClick = (e) => {
    if (e.target.matches('.input-checkbox')) {
      activeBtn()
    } else if (e.target.matches('.admin__table_checkbox._all')) {
      main_checkbox(e.target)
      activeBtn()
    } else if (e.target.closest('.admin__aside-tab')) {
      disableBtn()
    } else if (e.target.matches('.admin__menu_button.create')) {
      modalCreate(e)
    } else if (e.target.matches('.admin__menu_button.update')) {
      handlerBtnUpdate(e, activeCheckbox)
    } else if (e.target.matches('.admin__menu_button.delete')) {
      handlerBtnDelete(e, checkbox)
    }
  }

  // Удаляем предыдущий обработчик перед добавлением нового
  admin_wrapper.removeEventListener('click', handleClick)
  admin_wrapper.addEventListener('click', handleClick)
}

export default table