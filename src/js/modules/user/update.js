import { $auth } from "../API.js"
import { errorRes } from "./res/errorRes.js"
import { checkAuth } from "./isAuth.js"

export const updataUser = async (forma) => {
  const isAuth = checkAuth()
  if (!isAuth) return
  try {
    const phone = forma.querySelector('input[name="phone"]')
    let formData = new FormData(forma)
    formData.set("phone", phone.inputmask.unmaskedvalue());

    const { data } = await $auth.put('api/user', formData)
    if (data.token) {
      localStorage.setItem('token', `Bearer ${data.token}`)
      window.location.reload()
    }
    window.location.reload()
  } catch (error) {
    errorRes(error, forma, false)
  }
}

