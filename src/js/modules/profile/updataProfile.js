import JustValidate from "just-validate"
import { ValidateProfile } from "../user/validate.js"
import { updataUser } from "../user/update.js"

const updataProfile = () => {
  const updata = document.querySelector('#updata')
  const updataForm = new JustValidate('#updata', {
    errorLabelStyle: {
      color: '#d31111'
    },
  })

  ValidateProfile(updataForm, updata)

  const submit = () => {
    updataForm.revalidate()
      .then(isValid => isValid && updataUser(updata))
      .catch(error = console.error(error))
  }

  updata.addEventListener('submit', submit)
}

export default updataProfile