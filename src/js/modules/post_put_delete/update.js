import { $auth } from "../API.js"
import { errorRes } from "../user/res/errorRes.js"

export const Update = async (form, rout, id, modal, characteristicData) => {
  try {
    let formData = new FormData(form)
    if (rout === 'product') {
      formData.delete('title')
      formData.delete('description')
      if (!formData.get('price_card')) formData.delete('price_card')
      if (!formData.get('discount')) formData.delete('discount')
      formData.append('characteristic', JSON.stringify(characteristicData))
    } else if (rout === 'user') {
      const phone = document.querySelector(`.modal__form[data-validate="${rout}"]`).querySelector('input[name="phone"]')
      formData.set('phone', '7' + phone.inputmask.unmaskedvalue())
    }

    const response = await $auth.put(`api/${rout}/${id}`, formData)
    return response
  } catch (error) {
    errorRes(error, modal, false)
  }
}

export default Update