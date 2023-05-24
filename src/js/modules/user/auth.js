import jwt_decode from "jwt-decode";
import { $auth, apiImgUsers } from "../API.js";

const header = document.querySelector('.header')
const header_profil = document.querySelector('.header-profil')
const profile__img = document.querySelector('.profile__img')
const profile_name = document.querySelector('.profile__name')

export const getProfile = async () => {
  if (!localStorage.getItem('token')) return
  try {
    const { data } = await $auth.get('api/user/profile')
    return data
  } catch (error) {
    return false
  }
}

export const HeaderProfile = (user) => {
  if (!user || !header) return
  header_profil.classList.add('auth')
  profile_name.textContent = user.name;
  if (user.img) profile__img.src = `${apiImgUsers}${user.img}`

  const t_User = jwt_decode(localStorage.getItem('token'))
  const header__admin = document.querySelector('.header__admin')
  const profile__menu = document.querySelector('.profile__menu')

  if (t_User.role === 'admin') {
    header__admin.classList.remove('disable')
    profile__menu.classList.add('opacity')
  } else {
    header__admin.classList.add('disable')
    profile__menu.classList.remove('opacity')
  }
}

export const exit = () => {
  delete localStorage.token;
  header_profil.classList.remove('auth')
  profile_name.textContent = '';
  window.location.reload()
}