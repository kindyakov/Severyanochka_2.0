import jwt_decode from "jwt-decode";
import { $auth, apiImgUsers } from "../API.js";

const header = document.querySelector('.header')
const header_profil = header.querySelector('.header-profil')
const profile__img = header.querySelector('.profile__img')
const profile_name = header.querySelector('.profile__name')

export const getProfile = async () => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const { data } = await $auth.get('api/user/profile')
    return data
  } catch (error) {
    return false
  }
}

export const HeaderProfile = (user) => {
  if (!user) return
  header_profil.classList.add('auth')
  profile_name.textContent = user.name;
  if (user.img) profile__img.src = `${apiImgUsers}${user.img}`

  const t_User = jwt_decode(localStorage.getItem('token'))
  if (t_User.role === 'admin') {
    const header__admin = document.querySelector('.header__admin')
    header__admin.classList.remove('disable')
  } else header__admin.classList.add('disable')
}

export const exit = () => {
  delete localStorage.token;
  header_profil.classList.remove('auth')
  profile_name.textContent = '';
  window.location.reload()
}