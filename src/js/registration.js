import JustValidate from "just-validate";
import { registration } from "./modules/user/register.js";
import { Validate } from './modules/user/validate.js'

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

