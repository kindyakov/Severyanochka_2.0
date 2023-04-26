import Modal from "../modal/Modal.js"
import { getProfile, HeaderProfile, exit } from "./auth.js";
import { formLoginH } from "../modal/html.js";

export const modalLogin = new Modal({
  // speed: 400,
  id: 'login',
  btnActive: '.profil-btn',
  name: '.modal',
  title: 'Вход',
  btnClose: '.modal__close',
  closeArea: 'modal__body',
  formH: formLoginH,
})

const user = () => {
  const exit_account = document.querySelector('.exit-account');

  if (exit_account) {
    getProfile()
      .then(user => HeaderProfile(user))
      .catch(err => console.error(err))

    exit_account.addEventListener('click', exit)
  }
}

export default user