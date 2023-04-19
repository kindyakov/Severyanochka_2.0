import { $auth } from "../API.js"
import { errorRes } from "../user/res/errorRes.js"

const Create = async (form, rout, modal) => {
  try {
    let formData = new FormData(form)
    const { data } = await $auth.post(`api/${rout}`, formData)
    return data
  } catch (error) {
    errorRes(error, modal, false)
  }
}

export default Create