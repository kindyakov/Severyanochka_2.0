import JustValidate from "just-validate";
import { getProfile } from "./modules/user/auth.js";
import { apiImgUsers } from "./modules/API.js";
import { ValidateProfile } from "./modules/user/validate.js";
import { updataUser } from "./modules/user/update.js";
import { url } from "./modules/API.js";

const account = document.querySelector('.account')
const account__tabList = document.querySelector('.account__tab-list')
const account__content = document.querySelector('.account__content')
const account__tabPreview = Array.from(document.querySelectorAll('.account__tab-preview'))
const imput__img = document.querySelector('.account-data__input-file');
const img__profile = document.querySelector('.account-data__img')

// Формы
const updata = document.querySelector('#updata')

if (location.pathname === '/profile.html') {
  if (!localStorage.getItem('token')) location.assign(`${url}/index.html`)
}

if (account) {
  const updataForm = new JustValidate('#updata', {
    errorLabelStyle: {
      color: '#d31111'
    },
  })
  ValidateProfile(updataForm, updata)

  const submit = (e) => {
    updataForm.revalidate()
      .then(isValid => isValid && updataUser(updata))
  }

  updata.addEventListener('submit', submit)

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

  const handlerClick = (e) => {
    const target = e.target;
    if (target.closest('.account-tabs')) {
      clickTabs(target)
      account__tabList.classList.add('none')
      account__content.classList.remove('none')
    }
    if (target.closest('.account-data-back')) {
      account__tabList.classList.remove('none')
      account__content.classList.add('none')
    }
  }

  const clickTabs = (target) => {
    const tab = target.closest('.account-tabs')
    const data = tab.dataset.account
    const [tabP] = account__tabPreview.filter(tabP => tabP.dataset.account === data)
    account__tabPreview.forEach(tabP => tabP.classList.remove('active'))
    tabP.classList.add('active');
  }

  const uploadImg = () => {
    const file = imput__img.files[0]
    const reader = new FileReader()
    reader.onload = e => img__profile.src = e.target.result
    img__profile.classList.add('_is-img')
    reader.readAsDataURL(file)
  }

  account.addEventListener('click', handlerClick)
  imput__img.addEventListener('change', uploadImg)

  getProfile()
    .then(user => profile(user))
    .catch(error => console.log(error))
}