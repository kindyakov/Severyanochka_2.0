import { $auth } from "../../API.js";

export const Add = async (rout, productId) => {
  try {
    const { data } = await $auth.post(`api/${rout}`, { productId })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const Get = async (rout) => {
  try {
    const { data } = await $auth.get(`api/${rout}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const Delete = async (rout) => {
  try {
    const { data } = await $auth.get(`api/${rout}`)
    return data
  } catch (error) {
    console.log(error)
  }
}