const modal_info = (data) => {
  console.log(data)
  const modal_body = document.querySelector('.modal__error-body')
  const modal_text = modal_body.querySelector('.modal__error-text')
  const modal_btn = modal_body.querySelector('.modal__error-btn')

  if (data.folderMessage || data.htmlMessage) {
    const notification = document.querySelector('.notification')
    const notification_span = notification.querySelector('.notification__span')

    notification_span.textContent = `${data.htmlMessage ? data.htmlMessage : ''} 
    ${data.folderMessage ? data.folderMessage : ''}`
    notification.classList.add('_active')

    setTimeout(() => { notification.classList.remove('_active') }, 4000)
  } else if (data.errorMessage || data.message) {


    modal_body.classList.add('error')
    modal_text.textContent = `${data.errorMessage ? data.errorMessage : ''} 
    ${data.message ? data.message : ''}`

    modal_btn.addEventListener('click', () => {
      modal_body.classList.remove('error')
      modal_text.textContent = ''
    })
  }
}

export default modal_info