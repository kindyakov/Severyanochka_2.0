import { $api } from "../API.js";
import { modalLogin } from "./user.js";
import { errorRes } from "./res/errorRes.js";

export const registration = async (forma, phone) => {
  try {
    let data = {};
    new FormData(forma).forEach((value, key) => {
      if (key === 'checkbox' || key === 'confirm-password') return
      if (key === 'card_discount' && value.length === 0) return
      if (key === 'phone') value = '7' + phone.inputmask.unmaskedvalue()
      data[key] = value
      data.role = 'user'
    });
    const res = await $api.post('api/user/register', data)

    localStorage.setItem('token', `Bearer ${res.data.token}`)
    modalLogin.call()
    forma.querySelectorAll('input').forEach(input => input.value = '')
  } catch (error) {
    errorRes(error, forma)
  }
}
