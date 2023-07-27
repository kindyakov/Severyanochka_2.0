import axios from "axios"

export const url = window.location.origin;
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
