import { $auth } from "../API.js"

export const getData = async ({ rout, params }) => {
  try {
    const { data } = await $auth.get(`api/${rout}/admin`, { params })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getDataAll = async (rout) => {
  try {
    const { data } = await $auth.get(`api/${rout}/all`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getDataId = async (rout, id) => {
  try {
    const { data } = await $auth.get(`api/${rout}/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
}