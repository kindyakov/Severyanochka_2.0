export const errorRes = (error, modal, isClear = true) => {
  const span = modal.querySelector('.error-res')
  if (error.response) {
    span.textContent = error.response.data.message;
    span.classList.add('err')
  }
  setTimeout(() => span.classList.remove('err'), 3000)
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  if (isClear) {
    modal.querySelectorAll('input').forEach(input => {
      input.value = ''
      input.classList.remove('just-validate-success-field')
    })
  }
}
