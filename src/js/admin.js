import jwt_decode from "jwt-decode";
import { url } from "./modules/API.js";
import aside from "./modules/admin/aside.js";

if (!localStorage.getItem('token')) location.assign(`${url}/index.html`)
const t_User = jwt_decode(localStorage.getItem('token'))
if (t_User.role !== 'admin') location.assign(`${url}/index.html`)

//  =====================================================
aside()

async function createHtmlFile() {
  try {
    const data = {
      title: 'Заголовок страницы',
      content: 'Содержимое страницы'
    };

    const response = await fetch('create_html_file.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('HTML файл создан.');
    } else {
      throw new Error('Ошибка создания HTML файла.');
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteHtmlFile(filename) {
  try {
    const response = await fetch('delete_html_file.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileToDelete: filename }),
    });

    if (response.ok) {
      console.log('HTML файл успешно удален.');
    } else {
      throw new Error('Ошибка удаления HTML файла.');
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateHtmlFile(htmlData) {
  try {
    const response = await fetch('update_html_file.php', {
      method: 'PUT',
      body: htmlData,
    });

    if (response.ok) {
      console.log('HTML файл успешно обновлен.');
    } else {
      throw new Error('Ошибка обновления HTML файла.');
    }
  } catch (error) {
    console.error(error);
  }
}