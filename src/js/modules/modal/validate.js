export const validate_login = (validate, form) => {
  const tell = document.querySelector(`${form} input[type="tel"]`)
  new Inputmask('+7 (999) 999-99-99').mask(tell);

  validate
    .addField('.modal-phone', [
      {
        rule: 'required',
        errorMessage: 'Введите телефон',
      },
      {
        validator: value => {
          const phone = tell.inputmask.unmaskedvalue()
          return Boolean(Number(phone) && phone.length === 10)
        },
        errorMessage: 'Не верный формат',
      }
    ])
    .addField('.modal-password', [
      {
        rule: 'required',
        errorMessage: 'Введите пароль',
      },
      {
        rule: 'minLength',
        value: 6,
        errorMessage: 'Пароль должен содержать минимум 6 символов',
      },
    ])
}

export const validate_created_product = (validate, id) => {
  validate
    .addField(`div${id} input[name="img"]`, [
      {
        rule: 'required',
        errorMessage: 'Загрузите изображение',
      },
      {
        rule: 'files',
        value: {
          files: {
            extensions: ['jpeg', 'jpg', 'png', 'webp', 'jfif'],
            // maxSize: 20000,
            // minSize: 10000,
            types: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/jfif',],
          },
        },
      },
      {
        rule: 'minFilesCount',
        value: 1,
        errorMessage: 'Минимум 1 изображение',
      }
    ])
    .addField(`div${id} input[name="name"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите название',
      }
    ])
    .addField(`div${id} input[name="price"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите цену',
      },
      {
        rule: 'number',
        errorMessage: 'Цена может быть только числом',
      },
    ])
    .addField(`div${id} input[name="price"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите цену',
      },
      {
        rule: 'number',
        errorMessage: 'Цена может быть только числом',
      },
    ])
    .addField(`div${id} input[name="price_card"]`, [
      {
        rule: 'number',
        errorMessage: 'Значением должно быть число',
      },
    ])
    .addField(`div${id} select[name="typeId"]`, [
      {
        rule: 'required',
        errorMessage: 'Выберите тип',
      },
    ])
    .addField(`div${id} select[name="brandId"]`, [
      {
        rule: 'required',
        errorMessage: 'Выберите бренд',
      },
    ])
    .addField(`div${id} input[name="discount"]`, [
      {
        rule: 'number',
        errorMessage: 'Значением должно быть число',
      },
    ])
}

export const validate_created_brand = (validate, id) => {
  validate
    .addField(`div${id} input[name="img"]`, [
      {
        rule: 'files',
        value: {
          files: {
            extensions: ['jpeg', 'jpg', 'png', 'webp', 'jfif'],
            // maxSize: 20000,
            // minSize: 10000,
            types: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/jfif',],
          },
        },
        errorMessage: 'Изображение'
      },
    ])
    .addField(`div${id} input[name="name"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите название бренда',
      }
    ])
}

export const validate_created_type = (validate, id) => {
  validate
    .addField(`div${id} input[name="img"]`, [
      {
        rule: 'files',
        value: {
          files: {
            extensions: ['jpeg', 'jpg', 'png', 'webp', 'jfif'],
            // maxSize: 20000,
            // minSize: 10000,
            types: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/jfif',],
          },
        },
        errorMessage: 'Изображение'
      },
    ])
    .addField(`div${id} input[name="name"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите тип продуктов',
      }
    ])
}

export const validate_created_user = (validate, id) => {
  const inputPhone = document.querySelector(`div${id} input[name="phone"]`);
  new Inputmask('+7 (999) 999-99-99').mask(inputPhone); // Маска телефона

  validate
    .addField(`div${id} input[name="img"]`, [
      {
        rule: 'files',
        value: {
          files: {
            extensions: ['jpeg', 'jpg', 'png', 'webp', 'jfif'],
            // maxSize: 20000,
            // minSize: 10000,
            types: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/jfif',],
          },
        },
        errorMessage: 'Изображение'
      },
    ])
    .addField(`div${id} input[name="phone"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите телефон',
      },
      {
        validator: value => {
          const phone = inputPhone.inputmask.unmaskedvalue()
          return Boolean(Number(phone) && phone.length === 10)
        },
        errorMessage: 'Не верный формат',
      }
    ])
    .addField(`div${id} input[name="name"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      }
    ])
    .addField(`div${id} input[name="surname"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите фамилию',
      }
    ])
    .addField(`div${id} input[name="password"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите пароль',
      },
      {
        rule: 'minLength',
        value: 6,
        errorMessage: 'Пароль должен содержать минимум 6 символов',
      },
    ])
    .addField(`div${id} input[name="confirm-password"]`, [
      {
        rule: 'required',
        value: '/[а-яА-яa-zA-z]/gi',
        errorMessage: 'Повторите пароль',
      },
      {
        validator: value => {
          const pass = document.querySelector(`div${id} input[name="password"]`)
          return value === pass.value
        },
        errorMessage: 'Пароли не совпадают',
      }
    ])
    .addField(`div${id} input[name="date_birth"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите дату рождения',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField(`div${id} input[name="region"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите регион',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
      {
        rule: 'customRegexp',
        value: /[а-яА-я]/gi,
        errorMessage: 'Не верный формат',
      },
    ])
    .addField(`div${id} input[name="city"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите город',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
      {
        rule: 'customRegexp',
        value: /[а-яА-я]/gi,
        errorMessage: 'Не верный формат',
      },
    ])
    .addField(`div${id} input[name="email"]`, [
      {
        rule: 'email',
        errorMessage: 'Не верный формат',
      },
    ])

  if (id === '#modal-update') {
    validate.removeField(`div${id} input[name="password"]`)
    validate.removeField(`div${id} input[name="confirm-password"]`)
  }
}

export const validate_created_article = (validate, id) => {
  validate
    .addField(`div${id} input[name="img"]`, [
      {
        rule: 'files',
        value: {
          files: {
            extensions: ['jpeg', 'jpg', 'png', 'webp', 'jfif'],
            // maxSize: 20000,
            // minSize: 10000,
            types: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/jfif',],
          },
        },
        errorMessage: 'Изображение'
      },
    ])
    .addField(`div${id} input[name="name"]`, [
      {
        rule: 'required',
        errorMessage: 'Введите тип продуктов',
      }
    ])
}

export const Validated = {
  login: validate_login,
  product: validate_created_product,
  brand: validate_created_brand,
  type: validate_created_type,
  user: validate_created_user,
  article: validate_created_article
}