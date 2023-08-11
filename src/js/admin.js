import jwt_decode from "jwt-decode";
import { baseUrl } from "./modules/API.js";
import aside from "./modules/admin/aside.js";

if (!localStorage.getItem('token')) {
  location.assign(`${baseUrl}/index.html`)
}
const t_User = jwt_decode(localStorage.getItem('token'))
if (t_User.role !== 'admin') {
  location.assign(`${baseUrl}/index.html`)
} else {
  aside()
}

//  =====================================================
