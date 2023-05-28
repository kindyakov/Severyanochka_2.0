export const ValidateRegistration = (forma, form) => {
  const inputPhone = form.querySelector('input[type="tel"]');
  const inputCard = form.querySelector('input[name="card_discount"]');

  new Inputmask('+7 (999) 999-99-99').mask(inputPhone); // Маска телефона
  new Inputmask('9999-9999-9999-9999').mask(inputCard); // Маска карты

  forma
    .addField('input[name="phone"]', [
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
    .addField('input[name="surname"]', [
      {
        rule: 'required',
        errorMessage: 'Введите фамилию',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="name"]', [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="password"]', [
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
    .addField('input[name="confirm-password"]', [
      {
        rule: 'required',
        value: '/[а-яА-яa-zA-z]/gi',
        errorMessage: 'Повторите пароль',
      },
      {
        validator: value => {
          const pass = form.querySelector('input[name="password"]')
          return value === pass.value
        },
        errorMessage: 'Пароли не совпадают',
      }
    ])
    .addField('input[name="date_birth"]', [
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
    .addField('input[name="region"]', [
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
    .addField('input[name="city"]', [
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
    .addField('input[name="email"]', [
      {
        rule: 'email',
        errorMessage: 'Не верный формат',
      },
    ])
  // .addField('input[name="card_discount"]', [
  //   {
  //     validator: value => {
  //       const card = inputCard.inputmask.unmaskedvalue()
  //       if (!value.length) {
  //         return Boolean(Number(card) && card.length === 16)
  //       }
  //     },
  //     errorMessage: 'Не верный формат',
  //   }
  // ])
}

export const ValidateProfile = (forma, form) => {
  const inputPhone = form.querySelector('input[type="tel"]');
  const inputCard = form.querySelector('input[name="card_discount"]');

  new Inputmask('+9 (999) 999-99-99').mask(inputPhone); // Маска телефона
  // new Inputmask('9999-9999-9999-9999').mask(inputCard); // Маска карты

  forma
    .addField('input[name="phone"]', [
      {
        rule: 'required',
        errorMessage: 'Введите телефон',
      },
      {
        validator: value => {
          const phone = inputPhone.inputmask.unmaskedvalue()
          return Boolean(Number(phone) && phone.length === 11)
        },
        errorMessage: 'Не верный формат',
      }
    ])
    .addField('input[name="surname"]', [
      {
        rule: 'required',
        errorMessage: 'Введите фамилию',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="name"]', [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="gender"]', [
      {
        rule: 'required',
        errorMessage: 'Введите ваш пол',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="date_birth"]', [
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
    .addField('input[name="region"]', [
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
    .addField('input[name="city"]', [
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
    .addField('input[name="email"]', [
      {
        rule: 'email',
        errorMessage: 'Не верный формат',
      },
    ])
  // .addField('input[name="card_discount"]', [
  //   {
  //     validator: value => {
  //       const card = inputCard.inputmask.unmaskedvalue()
  //       if (!value.length) {
  //         return Boolean(Number(card) && card.length === 16)
  //       }
  //     },
  //     errorMessage: 'Не верный формат',
  //   }
  // ])
}

export const ValidatePassvord = (forma, form) => {
  forma
    .addField('input[name="old_password"]', [
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
    .addField('input[name="new_password"]', [
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
    .addField('input[name="confirm_password"]', [
      {
        rule: 'required',
        value: '/[а-яА-яa-zA-z]/gi',
        errorMessage: 'Повторите пароль',
      },
      {
        validator: value => {
          const pass = form.querySelector('input[name="new_password"]')
          return value === pass.value
        },
        errorMessage: 'Пароли не совпадают',
      }
    ])
}

export const ValidateOrder = (forma) => {
  forma
    .addField('input[name="city"]', [
      {
        rule: 'required',
        errorMessage: 'Введите город',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="street"]', [
      {
        rule: 'required',
        errorMessage: 'Введите улицу',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="house"]', [
      {
        rule: 'required',
        errorMessage: 'Дом',
      },
      {
        rule: 'number',
        errorMessage: 'Число',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="flat"]', [
      {
        rule: 'required',
        errorMessage: 'Квартира',
      },
      {
        rule: 'number',
        errorMessage: 'Число',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="entrance"]', [
      {
        rule: 'required',
        errorMessage: 'Введите подъезд',
      },
      {
        rule: 'number',
        errorMessage: 'Число',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="delivery_date"]', [
      {
        rule: 'required',
        errorMessage: 'Введите дату доставки',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
}