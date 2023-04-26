import productHtml from "./productHtml.js"

const renderProduct = () => {
  const product_container = document.querySelector('#products-container')
  
  let params = {
    page: 1,
    limit: 6
  }

  const request = async () => {
    try {
      params.typeId = product_container.dataset.typeid

      console.log(params)

    } catch (error) {
      console.log(error)
    }
  }
  request()

}

export default renderProduct