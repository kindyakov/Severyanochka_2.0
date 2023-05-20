import JustValidate from "just-validate"
import { ValidatePassvord } from "../user/validate.js"

const updataPassword = () => {
  const updataPasswordForm = document.querySelector('#updata-password')

  const Forma = new JustValidate('#updata-password', {
    errorLabelStyle: {
      color: '#d31111'
    },
  })

  ValidatePassvord(Forma, updataPasswordForm)

  const updataPass = async () => {
    try {
      // const data = await
      // Forma.showErrors({ 'input[name="old-password"]': 'The email is invalid' })
      // Forma.showSuccessLabels({ '#email': 'The email looks good!' })
    } catch (error) {
      console.log(error)
    }
  }

  const submit = () => {
    Forma.revalidate()
      .then(isValid => updataPass())
      .catch(error => console.error(error))
  }

  updataPasswordForm.addEventListener('submit', submit)
}

export default updataPassword