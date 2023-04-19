import { $auth } from "../API.js"
import { errorRes } from "../user/res/errorRes.js"

export const Update = async (form, rout, id, modal) => {
  try {
    let formData = new FormData(form)
    const { data } = await $auth.put(`api/${rout}/${id}`, formData)
    return data
  } catch (error) {
    errorRes(error, modal, false)
  }
}

export default Update