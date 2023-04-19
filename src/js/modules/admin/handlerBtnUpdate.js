import modalUpdate from "./modal/modal_update.js"

const handlerBtnUpdate = (e, input) => {
  const key = e.target.dataset.updata
  const id = input.id.split('_').reverse()[0]
  const tr = input.closest(`.tr_${id}`)
  const cell = tr.querySelectorAll('.admin__table_cell[data-update]')

  modalUpdate(key, cell, id)
}

export default handlerBtnUpdate