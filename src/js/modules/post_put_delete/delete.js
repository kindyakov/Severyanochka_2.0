import { $auth } from "../API.js"
import { errorRes } from "../user/res/errorRes.js"

const Delete = async (rout, id, modal) => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const { data } = await $auth.delete(`api/${rout}`, id)
    return data
  } catch (error) {
    errorRes(error, modal)
  }
}

export default Delete