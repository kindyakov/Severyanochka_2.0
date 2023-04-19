import modalDelete from "./modal/modal_delete.js"

const handlerBtnDelete = (e, checkbox) => {
  let idArr = []
  const key = e.target.dataset.delete
  const inputCheked = Array.from(checkbox).filter(input => input.checked === true)
  inputCheked.forEach(input => idArr.push(input.id.split('_').reverse()[0]))

  // const tr = input.closest(`.tr_${id}`)
  // const cell = tr.querySelectorAll('.admin__table_cell[data-update]')

  modalDelete(key, idArr)
}

export default handlerBtnDelete