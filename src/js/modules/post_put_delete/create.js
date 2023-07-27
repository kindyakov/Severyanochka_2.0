import { $auth } from "../API.js"
import { errorRes } from "../user/res/errorRes.js"
import translit from "../translite.js";
import axios from "axios";

async function createTypeFile(fileName, name, id, rout, nameType) {
  try {
    const response = await axios.post(
      'http://sevaryanochka/dist/php/create_html_file.php',
      { fileName, name, id, rout, nameType }
    )

    return response
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

const Create = async (form, rout, modal, characteristicData) => {
  try {
    let formData = new FormData(form)
    if (rout === 'product') {
      formData.delete('title')
      formData.delete('description')
      if (formData.get('price_card').length === 0) formData.delete('price_card')
      if (formData.get('discount').length === 0) formData.delete('discount')
      if (characteristicData.length > 0) {
        formData.append('characteristic', JSON.stringify(characteristicData))
      }
    }

    const response = await $auth.post(`api/${rout}`, formData)
    console.log(response)

    if (rout !== 'product' && rout !== 'type') return response

    if (response.status === 200) {
      const responsePHP = await createTypeFile(
        translit(response.data.name),
        response.data.name,
        response.data.id, rout,
        response.data.type ? translit(response.data.type.name) : ''
      )
      return responsePHP
    } else return response
  } catch (error) {
    errorRes(error, modal, false)
    console.error(`Произошла ошибка при создании "${rout}"`, error.message);
  }
}

export default Create