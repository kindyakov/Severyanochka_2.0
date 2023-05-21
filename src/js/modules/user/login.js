import { $api } from "../API.js";
import { errorRes } from "./res/errorRes.js";

export const login = async (form) => {
  let isLogin = false;
  try {
    const phone = '7' + form.querySelector('.modal-phone').inputmask.unmaskedvalue();
    const password = form.querySelector('.modal-password').value;

    const { data: token } = await $api.post('api/user/login', { phone, password })

    localStorage.setItem('token', `Bearer ${token}`)
    return isLogin = true;
  } catch (error) {
    errorRes(error, document.querySelector('#login'), form)
    return isLogin;
  }
}