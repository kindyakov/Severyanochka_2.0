import { $auth } from "../API.js"

const getData = async (rout) => {
  try {
    const { data } = await $auth.get(`api/${rout}`)

    return data
  } catch (error) {
    console.log(error)
  }
}

export default getData