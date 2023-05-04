import { $auth } from "../API.js";

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

export const Delete = async (rout, idArr) => {
  try {
    const { data } = await $auth.post(`api/${rout}/delete`, idArr)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const remove = async (rout, id) => {
  try {
    const { data } = await $auth.delete(`api/${rout}/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}