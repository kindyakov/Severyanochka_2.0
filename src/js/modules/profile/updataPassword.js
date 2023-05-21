import JustValidate from "just-validate"
import { ValidatePassvord } from "../user/validate.js"
import { $auth } from "../API.js"
import { exit } from "../user/auth.js"

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
      let formData = new FormData(updataPasswordForm)
      const res = await $auth.put('api/user/password', formData)
      exit()
    } catch (error) {
      const { response } = error
      Forma.showErrors({
        [`input[name="${response.data.name}"]`]: response.data.message
      })
    }
  }

  const submit = () => {
    Forma.revalidate()
      .then(isValid => isValid && updataPass())
      .catch(error => console.error(error))
  }

  updataPasswordForm.addEventListener('submit', submit)
}

export default updataPassword