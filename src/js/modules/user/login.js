import { $user } from "../API.js";
import { errorRes } from "./res/errorRes.js";

export const login = async (form) => {
  let isLogin = false;
  try {
    const phone = '7' + form.querySelector('.modal-phone').inputmask.unmaskedvalue();
    const password = form.querySelector('.modal-password').value;

    const { data } = await $user.post('api/user/login', { phone, password })

    localStorage.setItem('token', `Bearer ${data.token}`)
    return isLogin = true;
  } catch (error) {
    errorRes(error, form)
    return isLogin;
  }
}