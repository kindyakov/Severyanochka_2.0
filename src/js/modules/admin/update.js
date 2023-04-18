import modal from "./modal_update.js"

const $update = (e, input) => {
  const key = e.target.dataset.updata
  const id = input.id.split('_').reverse()[0]
  const tr = input.closest(`.tr_${id}`)
  const cell = tr.querySelectorAll('.admin__table_cell[data-updata]')

  modal(input)
}

export default $update