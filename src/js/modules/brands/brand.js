import { $auth } from "../API.js"
import { errorRes } from "../user/res/errorRes.js"

export const created_brand = async (form) => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    let formData = new FormData(form)

    const { data } = await $auth.post('api/brand', formData)
    return data
  } catch (error) {
    errorRes(error, form)
  }
}