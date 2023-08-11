import { $auth } from "../API.js"
import { errorRes } from "../user/res/errorRes.js"

const Delete = async (rout, id, modal) => {
  try {
    const response = await $auth.post(`api/${rout}/delete`, id)
    return response
  } catch (error) {
    errorRes(error, modal)
  }
}

export default Delete