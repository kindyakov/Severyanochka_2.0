const dataFormate = (date) => {
  const newDate = new Date(date).toLocaleString()
  return newDate
}

export const renderProducts = (insert, arrayData, isArr = true) => {
  if (!arrayData || arrayData.length < 1) return
  if (isArr) {
    insert.innerHTML = ''
    arrayData.forEach(data => {
      insert.insertAdjacentHTML('beforeend', `<tr class="admin__table_row tr_${data.id}">
    <td class="admin__table_cell _checkbox"><label for="checkbox_product_td_${data.id}"><input type="checkbox"
          name="checkbox" id="checkbox_product_td_${data.id}" class="admin__table_checkbox input-checkbox"></label></td>
    <td class="admin__table_cell">${data.id}</td>
    <td class="admin__table_cell" data-update="name">${data.name}</td>
    <td class="admin__table_cell" data-update="price">${data.price} ₽</td>
    <td class="admin__table_cell" data-update="price_card">${data.price_card} ₽</td>
    <td class="admin__table_cell">${data.rating}</td>
    <td class="admin__table_cell" data-update="img">${data.img}</td>
    <td class="admin__table_cell" data-update="discount">${data.discount}%</td>
    <td class="admin__table_cell" data-update="type">${data.type}</td>
    <td class="admin__table_cell" data-update="brand">${data.brand}</td>
    <td class="admin__table_cell">${dataFormate(data.createdAt)}</td>
    <td class="admin__table_cell">${dataFormate(data.updatedAt)}</td>
  </tr>`)
    });
  } else {
    const data = arrayData;
    insert.insertAdjacentHTML('beforeend', `<tr class="admin__table_row tr_${data.id}">
    <td class="admin__table_cell _checkbox"><label for="checkbox_product_td_${data.id}"><input type="checkbox"
          name="checkbox" id="checkbox_product_td_${data.id}" class="admin__table_checkbox input-checkbox"></label></td>
    <td class="admin__table_cell">${data.id}</td>
    <td class="admin__table_cell" data-update="name">${data.name}</td>
    <td class="admin__table_cell" data-update="price">${data.price} ₽</td>
    <td class="admin__table_cell" data-update="price_card">${data.price_card} ₽</td>
    <td class="admin__table_cell">${data.rating}</td>
    <td class="admin__table_cell" data-update="img">${data.img}</td>
    <td class="admin__table_cell" data-update="discount">${data.discount}%</td>
    <td class="admin__table_cell" data-update="type">${data.type}</td>
    <td class="admin__table_cell" data-update="brand">${data.brand}</td>
    <td class="admin__table_cell">${dataFormate(data.createdAt)}</td>
    <td class="admin__table_cell">${dataFormate(data.updatedAt)}</td>
  </tr>`)
  }

}

export const renderBrands = (insert, arrayData, isArr = true) => {
  if (!arrayData) return
  if (isArr) {
    insert.innerHTML = ''
    arrayData.forEach(data => {
      insert.insertAdjacentHTML('beforeend', `<tr class="admin__table_row tr_${data.id}">
    <td class="admin__table_cell _checkbox"><label for="checkbox_brand_td_${data.id}"><input type="checkbox"
          name="checkbox" id="checkbox_brand_td_${data.id}" class="admin__table_checkbox input-checkbox"></label></td>
    <td class="admin__table_cell">${data.id}</td>
    <td class="admin__table_cell" data-update="img">${data.img}</td>
    <td class="admin__table_cell" data-update="name">${data.name}</td>
    <td class="admin__table_cell">${dataFormate(data.createdAt)}</td>
    <td class="admin__table_cell">${dataFormate(data.updatedAt)}</td>
  </tr>`)
    });
  } else {
    const data = arrayData;
    insert.insertAdjacentHTML('beforeend', `<tr class="admin__table_row tr_${data.id}">
    <td class="admin__table_cell _checkbox"><label for="checkbox_brand_td_${data.id}"><input type="checkbox"
          name="checkbox" id="checkbox_brand_td_${data.id}" class="admin__table_checkbox input-checkbox"></label></td>
    <td class="admin__table_cell">${data.id}</td>
    <td class="admin__table_cell" data-update="img">${data.img}</td>
    <td class="admin__table_cell" data-update="name">${data.name}</td>
    <td class="admin__table_cell">${dataFormate(data.createdAt)}</td>
    <td class="admin__table_cell">${dataFormate(data.updatedAt)}</td>
  </tr>`)
  }
}

export const renderTypes = (insert, arrayData, isArr = true) => {
  if (!arrayData) return
  if (isArr) {
    insert.innerHTML = ''
    arrayData.forEach(data => {
      insert.insertAdjacentHTML('beforeend', `<tr class="admin__table_row tr_${data.id}">
      <td class="admin__table_cell _checkbox"><label for="checkbox_type_td_${data.id}"><input type="checkbox"
            name="checkbox" id="checkbox_type_td_${data.id}" class="admin__table_checkbox input-checkbox"></label></td>
      <td class="admin__table_cell">${data.id}</td>
      <td class="admin__table_cell" data-update="img">${data.img}</td>
      <td class="admin__table_cell" data-update="name">${data.name}</td>
      <td class="admin__table_cell">${dataFormate(data.createdAt)}</td>
      <td class="admin__table_cell">${dataFormate(data.updatedAt)}</td>
    </tr>`)
    });
  } else {
    const data = arrayData;
    insert.insertAdjacentHTML('beforeend', `<tr class="admin__table_row tr_${data.id}">
      <td class="admin__table_cell _checkbox"><label for="checkbox_type_td_${data.id}"><input type="checkbox"
            name="checkbox" id="checkbox_type_td_${data.id}" class="admin__table_checkbox input-checkbox"></label></td>
      <td class="admin__table_cell">${data.id}</td>
      <td class="admin__table_cell" data-update="img">${data.img}</td>
      <td class="admin__table_cell" data-update="name">${data.name}</td>
      <td class="admin__table_cell">${dataFormate(data.createdAt)}</td>
      <td class="admin__table_cell">${dataFormate(data.updatedAt)}</td>
    </tr>`)
  }
}

const renderFeedback = (insert, arrayData) => {
  if (!arrayData) return
  insert.innerHTML = ''
  arrayData.forEach(data => {
    insert.insertAdjacentHTML('beforeend', `<tr class="admin__table_row tr_${data.id}">
    <td class="admin__table_cell _checkbox"><label for="checkbox_feedback_td_${data.id}"><input type="checkbox"
          name="checkbox" id="checkbox_feedback_td_${data.id}" class="admin__table_checkbox input-checkbox"></label></td>
    <td class="admin__table_cell">${data.id}</td>
    <td class="admin__table_cell">${data.user_name}</td>
    <td class="admin__table_cell">${data.feedback}</td>
    <td class="admin__table_cell">${data.userDatumId}</td>
    <td class="admin__table_cell">${data.productId}</td>
    <td class="admin__table_cell">${dataFormate(data.createdAt)}</td>
    <td class="admin__table_cell">${dataFormate(data.updatedAt)}</td>
  </tr>`)
  });
}

export const renderUsers = (insert, arrayData, isArr = true) => {
  if (!arrayData) return
  if (isArr) {
    insert.innerHTML = ''
    arrayData.forEach(data => {
      insert.insertAdjacentHTML('beforeend', `<tr class="admin__table_row tr_${data.id}">
    <td class="admin__table_cell _checkbox"><label for="checkbox_user_td_${data.id}"><input type="checkbox"
          name="checkbox" id="checkbox_user_td_${data.id}" class="admin__table_checkbox input-checkbox"></label></td>
    <td class="admin__table_cell">${data.id}</td>
    <td class="admin__table_cell">${data.phone}</td>
    <td class="admin__table_cell">${data.name}</td>
    <td class="admin__table_cell">${data.surname}</td>
    <td class="admin__table_cell">${data.email}</td>
    <td class="admin__table_cell">${data.date_birth}</td>
    <td class="admin__table_cell">${data.gender}</td>
    <td class="admin__table_cell">${data.region}</td>
    <td class="admin__table_cell">${data.city}</td>
    <td class="admin__table_cell">${data.card_discount}</td>
    <td class="admin__table_cell">${data.role}</td>
    <td class="admin__table_cell">${dataFormate(data.createdAt)}</td>
    <td class="admin__table_cell">${dataFormate(data.updatedAt)}</td>
  </tr>`)
    });
  } else {
    const data = arrayData;
    insert.insertAdjacentHTML('beforeend', `<tr class="admin__table_row tr_${data.id}">
    <td class="admin__table_cell _checkbox"><label for="checkbox_user_td_${data.id}"><input type="checkbox"
          name="checkbox" id="checkbox_user_td_${data.id}" class="admin__table_checkbox input-checkbox"></label></td>
    <td class="admin__table_cell">${data.id}</td>
    <td class="admin__table_cell">${data.phone}</td>
    <td class="admin__table_cell">${data.name}</td>
    <td class="admin__table_cell">${data.surname}</td>
    <td class="admin__table_cell">${data.email}</td>
    <td class="admin__table_cell">${data.date_birth}</td>
    <td class="admin__table_cell">${data.gender}</td>
    <td class="admin__table_cell">${data.region}</td>
    <td class="admin__table_cell">${data.city}</td>
    <td class="admin__table_cell">${data.card_discount}</td>
    <td class="admin__table_cell">${data.role}</td>
    <td class="admin__table_cell">${dataFormate(data.createdAt)}</td>
    <td class="admin__table_cell">${dataFormate(data.updatedAt)}</td>
  </tr>`)
  }
}

const RenderTable = {
  products: renderProducts,
  brand: renderBrands,
  type: renderTypes,
  feedback: renderFeedback,
  user: renderUsers
}

export default RenderTable