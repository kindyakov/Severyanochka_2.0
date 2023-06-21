import { $auth } from "../API.js"
import { errorRes } from "../user/res/errorRes.js"
import translit from "../translite.js";
import axios from "axios";

async function createTypeFile(fileName, name, typeId) {
  try {
    const response = await axios.post('php/type/create_html_file.php', {
      fileName, name, typeId
    });

    if (response.status === 200) {
      console.log('Файл успешно создан');
    } else {
      console.error('Произошла ошибка при создании файла');
    }
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
      if (characteristicData[0].title && characteristicData[0].description) {
        formData.append('characteristic', JSON.stringify(characteristicData))
      }
    }

    const response = await $auth.post(`api/${rout}`, formData)

    if (response.status === 200) {
      if (rout === 'type') {

        const res = await createTypeFile(
          translit(response.data.name),
          response.data.name, response.data.id
        )

        console.log(res)
      }
    }
    return response.data
  } catch (error) {
    errorRes(error, modal, false)
    console.error(`Произошла ошибка при создании ${rout}`, error.message);
  }
}
// location.reload()
export default Create