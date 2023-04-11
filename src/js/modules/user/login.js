import { $user } from "../API.js";
import { errorRes } from "./res/errorRes.js";

export const login = async (form, phone, password) => {
  let isLogin = false;
  try {
    const { data } = await $user.post('api/user/login', { phone, password })

    localStorage.setItem('token', `Bearer ${data.token}`)
    return isLogin = true;
  } catch (error) {
    errorRes(error, form)
    return isLogin;
  }
}