export const limitationDate = (selector) => {
  const input_date = document.querySelector(selector)
  const now = new Date
  const RuDate = new Intl.DateTimeFormat('ru')
  const nowData = RuDate.format(now).split('.').reverse().toString('')
  const maxData = RuDate.format(now.setDate(now.getDate() + 7)).split('.').reverse().toString('')
  input_date.min = nowData.replace(/[\.,\/]/g, '-');
  input_date.max = maxData.replace(/[\.,\/]/g, '-');
}