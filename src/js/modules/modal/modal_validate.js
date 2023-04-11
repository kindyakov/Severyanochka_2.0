export const modal_validate = (validate, form) => {
  const tell = form.querySelector('input[type="tel"]')
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