import { $auth, $api } from "../API.js";

export const Add = async (rout, productId) => {
  try {
    const { data } = await $auth.post(`api/${rout}`, { productId })
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const search = async (rout, value) => {
  try {
    const { data } = await $auth.get(`/api/search/${rout}?search=${value}`)
    return data
  } catch (error) {
    console.log('Ошибка при поиске: ', error.message)
  }
}

export const getWithAuth = async (rout) => {
  try {
    const { data } = await $auth.get(`api/${rout}`)
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const getWithParams = async ({ rout, params }) => {
  try {
    const { data } = await $api.get(`api/${rout}`, { params })
    return data
  } catch (error) {
    console.error('Ошибка в get:', error.message)
  }
}

export const getWithAuthParams = async ({ rout, params }) => {
  try {
    const { data } = await $auth.get(`api/${rout}`, { params })
    return data
  } catch (error) {
    console.error('Ошибка в get:', error.message)
  }
}

export const GetProductId = async (id) => {
  try {
    const { data } = await $api.get(`api/product/${id}`)
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const GetProductLocalStorage = (name) => {
  const product = JSON.parse(localStorage.getItem(name)) || []
  return product
}

export const Delete = async (rout, idArr) => {
  try {
    const { data } = await $auth.post(`api/${rout}/delete`, idArr)
    return data
  } catch (error) {
    console.log(error.message)
  }
}

export const remove = async (rout, id) => {
  try {
    const { data } = await $auth.delete(`api/${rout}/${id}`)
    return data
  } catch (error) {
    console.log(error.message)
  }
}