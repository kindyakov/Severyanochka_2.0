import jwt_decode from "jwt-decode";
import { url } from "./modules/API.js";

if (location.pathname === '/admin.html') {
  if (!localStorage.getItem('token')) location.assign(`${url}/index.html`)
  const t_User = jwt_decode(localStorage.getItem('token'))
  if (t_User.role !== 'admin') location.assign(`${url}/index.html`)
}