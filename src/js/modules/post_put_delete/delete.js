import { $auth } from "../API.js"
import { errorRes } from "../user/res/errorRes.js"

const Delete = async (rout, id, modal) => {
  try {
    const { data } = await $auth.post(`api/${rout}/delete`, id)
    return data
  } catch (error) {
    errorRes(error, modal)
  }
}

export default Delete