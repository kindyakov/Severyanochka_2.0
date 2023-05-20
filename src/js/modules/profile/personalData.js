import { apiImgUsers } from "../API.js";

const personalData = (user) => {
  const imput__img = document.querySelector('.account-data__input-file');
  const img__profile = document.querySelector('.account-data__img')
  const inputs = updata.querySelectorAll('input')

  const profile = (user) => {
    inputs.forEach(input => {
      const inputName = input.getAttribute('name')
      if (inputName !== 'img') {
        input.value = user[`${inputName}`]
      } else {
        if (user.img) {
          img__profile.src = `${apiImgUsers}${user.img}`;
          img__profile.classList.add('_is-img')
        }
      }
    })
  }

  const uploadImg = () => {
    const file = imput__img.files[0]
    const reader = new FileReader()
    reader.onload = e => img__profile.src = e.target.result
    img__profile.classList.add('_is-img')
    reader.readAsDataURL(file)
  }

  imput__img.addEventListener('change', uploadImg)

  profile(user)
}

export default personalData