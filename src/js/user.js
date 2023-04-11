import JustValidate from "just-validate";
import { Validate } from "./modules/user/validate.js";
import { registration } from "./modules/user/register.js";
import Modal from "./modules/modal/Modal.js"
import { getProfile, HeaderProfile, exit } from "./modules/user/auth.js";

export const modal = new Modal({
  // speed: 400,
  btnActive: '.profil-btn',
  name: '.modal-login',
  btnClose: '.modal-login__close',
  closeArea: 'modal-login__body',
})

const exit_account = document.querySelector('.exit-account');
// Регистрация 
if (window.location.pathname === '/registration.html') {
  //Form
  const form = document.querySelector('#registration-form');
  const inputPhone = document.querySelector('input[type="tel"]');

  const register = new JustValidate('#registration-form', {
    errorLabelStyle: {
      color: '#d31111'
    },
  });

  Validate(register, form) // валидация формы

  const submit = () => {
    register.revalidate()
      .then(isValid => {
        if (isValid) registration(form, inputPhone)
      })
  }

  form.addEventListener('submit', submit)
}
getProfile()
  .then(user => HeaderProfile(user))
  .catch(err => console.error(err))

exit_account.addEventListener('click', exit)