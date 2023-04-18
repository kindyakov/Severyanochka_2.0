export function imgHtml(name, data) {
  return `<div data-name="${name}"><span class="img-name">${name}</span><img src="${data}" alt="${name}"><span class="img-delete">✖</span></div>`
}

const PreviewImg = (id, multiple = false) => {
  const modal = document.querySelector(`${id}`)
  const admin__labelFile = modal.querySelector('.admin__label-file')
  const admin__wrapperImg = modal.querySelector('.admin__wrapper-img')
  const input__img = modal.querySelector('input[type="file"]');
  const fileName = modal.querySelector('.file-name')
  let files, file

  function labelSccess() {
    admin__labelFile.classList.add('success')
    admin__labelFile.classList.remove('invalide')
  }

  const downloadImg = (e) => {
    if (multiple) {
      files = Array.from(e.target.files)

      files.forEach(file => {
        fileName.insertAdjacentText('beforeend', `${file.name}, `)
        const reader = new FileReader()

        reader.onload = e => {
          admin__wrapperImg.insertAdjacentHTML('beforeend', imgHtml(file.name, e.target.result))
          labelSccess()
        }

        reader.readAsDataURL(file)
      })
    } else {
      file = e.target.files[0];
      fileName.textContent = file.name;

      const reader = new FileReader()

      reader.onload = e => {
        admin__wrapperImg.innerHTML = imgHtml(file.name, e.target.result)
        labelSccess()
      }

      reader.readAsDataURL(file)
    }
  }

  const deleteImg = (e) => {
    const target = e.target;
    if (target.classList.contains('img-delete')) {
      const div = target.closest('div')
      const name = div.dataset.name

      if (multiple) {
        files = files.filter(file => file.name !== name)
        input__img.value = files

        if (files.length == 0) {
          fileName.textContent = ''
          input__img.value = null
          admin__labelFile.classList.remove('success')
          admin__labelFile.classList.add('invalide')
        }
      } else {
        file = null
        input__img.value = null
        fileName.textContent = ''
        admin__labelFile.classList.remove('success')
        admin__labelFile.classList.add('invalide')
      }

      const deleteImg = admin__wrapperImg.querySelector(`[data-name="${name}"]`)
      deleteImg.remove()
    }
  }

  input__img.addEventListener('change', downloadImg)
  admin__wrapperImg.addEventListener('click', deleteImg)
}

export default PreviewImg