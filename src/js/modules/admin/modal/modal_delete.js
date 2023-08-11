import Delete from '../../post_put_delete/delete.js'
import { modalHtml } from "../../modal/html.js"

function deleteModal(title, rout) {
  return `<div class="modal-wrapper-title">
  <h3 class="modal__title">${title}</h3>
  <span class="error-res"></span>
</div>
<form class="modal__form" data-validate="${rout}">
  <div class="modal__flex">
    <div class="admin-column">
      <p class="admin__info-text">Вы дествительно хотите удалить выбранные ${rout}</p>
    </div>
  </div>
  <div class="admin__wrapper-button">
  <button class="admin__button">Подтвердить</button>
  <button class="admin__button cancel">Отменить</button>
  </div>
</form>`
}

async function deleteFile(fileName, name, id, rout, nameType) {
  try {
    const response = await axios.post(
      'http://sevaryanochka/dist/php/delete_html_file.php',
      { fileName, name, id, rout, nameType }
    )

    return response
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

const modalDelete = (rout, id) => {
  const admin = document.querySelector('.admin')
  const admin_content = admin.querySelector(`#${rout}`)
  const admin_title = admin_content.querySelector('.admin__title')
  const modalId = 'modal-delete'
  let modal, content, form

  const handleclick = (e) => {
    if (e.target.classList.contains('modal__body') || e.target.closest('.modal__close')) {
      close()
    }
  }
  const create = () => {
    admin.insertAdjacentHTML('beforeend', modalHtml(modalId))
    modal = document.querySelector(`#${modalId}`)
    content = modal.querySelector('.modal__content')
    content.innerHTML = deleteModal(admin_title.textContent, rout)
    form = modal.querySelector('.modal__form')

    setTimeout(() => open(), 10)
    form.addEventListener('submit', submit)
  }
  const open = () => {
    modal.classList.add('active');
    document.body.classList.add('_lock');
    document.querySelector('html').classList.add('_lock');
  }
  const close = () => {
    document.body.classList.remove('_lock');
    document.querySelector('html').classList.remove('_lock');
    modal.classList.remove('active');
    setTimeout(() => remove(), 200)
  }

  const remove = () => modal.remove()

  const submit = async (e) => {
    try {
      e.preventDefault()
      if (e.submitter.classList.contains('cancel')) {
        close()
        return
      }
      const response = await Delete(rout, id, modal)
      // response.status === 200 && location.reload()
      console.log(response)
    } catch (error) {
      console.log(error.message)
    }
  }

  create()
  document.removeEventListener('click', handleclick)
  document.addEventListener('click', handleclick)
  window.addEventListener('keyup', e => { if (e.key === 'Escape') close() })
}

export default modalDelete