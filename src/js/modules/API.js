import axios from "axios"
import translit from "./translite.js";

export const baseUrl = `${window.location.origin}/dist`;
export const api = 'http://localhost:8080/'
export const apiImgUsers = api + 'img/img_users/'
export const apiImgProducts = api + 'img/img_products/'
export const apiImgPosts = api + 'img/img_posts/'
export const apiImgBrands = api + 'img/img_brands/'
export const apiImgTypes = api + 'img/img_types/'

export const $api = axios.create({
  baseURL: api
})

export const $auth = axios.create({
  baseURL: api,
  headers: {
    'Authorization': `${localStorage.getItem('token')}`
  },
})

export function renderImgProduct(arr, name) {
  const images = JSON.parse(arr)
  const srcImg = `${apiImgProducts}${translit(name)}/`
  const [img] = images
  return `${srcImg}${img}`
}

export function createProductURL(type, name) {
  return `${baseUrl}/catalog/${translit(type)}/${translit(name)}.html`
}