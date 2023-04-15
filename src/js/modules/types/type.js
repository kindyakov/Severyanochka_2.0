import { $auth } from "../API.js"
import { errorRes } from "../user/res/errorRes.js"

export const created_type = async (form) => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    let formData = new FormData(form)

    const { data } = await $auth.post('api/type', formData)
    return data
  } catch (error) {
    errorRes(error, form)
  }
}