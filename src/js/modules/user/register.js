import { $api } from "../API.js";
import { modalLogin } from "./user.js";
import { errorRes } from "./res/errorRes.js";

export const registration = async (forma, phone) => {
  try {
    let formData = new FormData(forma)
    formData.set('phone', '7' + phone.inputmask.unmaskedvalue())
    if (formData.get('email').length === 0) formData.delete('email')
    // if (formData.get('card_discount').length === 0) formData.delete('card_discount')
    formData.delete('checkbox')
    formData.delete('confirm-password')

    const user = await $api.post('api/user/register', formData)

    modalLogin.call()
    forma.querySelectorAll('input').forEach(input => input.value = '')
  } catch (error) {
    errorRes(error, document.querySelector('.registration'), false)
  }
}
