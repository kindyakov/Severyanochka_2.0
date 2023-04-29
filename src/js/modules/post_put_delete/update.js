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
    }
    const { data } = await $auth.put(`api/${rout}/${id}`, formData)
    return data
  } catch (error) {
    errorRes(error, modal, false)
  }
}

export default Update