import { $auth } from "../API.js"
import { errorRes } from "../user/res/errorRes.js"

const Create = async (form, rout, modal, characteristicData) => {
  try {
    let formData = new FormData(form)
    if (rout === 'product') {
      formData.delete('title')
      formData.delete('description')
      if (formData.get('price_card').length === 0) formData.delete('price_card')
      formData.append('characteristic', JSON.stringify(characteristicData))
    }

    const { data } = await $auth.post(`api/${rout}`, formData)
    return data
  } catch (error) {
    errorRes(error, modal, false)
  }
}

export default Create