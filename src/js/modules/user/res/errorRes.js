export const errorRes = (error, forma, isClear = true) => {
  const span = document.querySelector('.error-res')
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
    forma.querySelectorAll('input').forEach(input => {
      input.value = ''
      input.classList.remove('just-validate-success-field')
    })
  }
}
