import Sortable from 'sortablejs';
import * as API from "../API.js"
import translit from '../translite.js'

class LoadImageIntoInput {
  constructor(id) {
    this.modal = document.querySelector(`${id}`)
    this.admin__labelFile = this.modal.querySelector('.admin__label-file')
    this.admin__wrapperImg = this.modal.querySelector('.admin__wrapper-img')
    this.input__img = this.modal.querySelector('input[type="file"]');
    this.fileName = this.modal.querySelector('.file-name')
    this.fileList = new DataTransfer();
    this.files = null
    this.itemsOrder = null
    this.multiple = this.input__img.hasAttribute('multiple')
    this.imagesPathName = {
      user: API.apiImgUsers,
      product: API.apiImgProducts,
      post: API.apiImgPosts,
      brand: API.apiImgBrands,
      type: API.apiImgTypes
    }

    this.sortable = Sortable.create(this.admin__wrapperImg, {
      animation: 300,
      dataIdAttr: 'data-name',
      onEnd: e => {
        if (this.multiple) {
          this.itemsOrder = Array.from(this.admin__wrapperImg.children)
          const map = new Map(this.itemsOrder.map((item, index) => [item.dataset.name, index]));
          this.files = Array.from(this.fileList.files).sort((file_a, file_b) => map.get(file_a.name) - map.get(file_b.name));
          this.updateFileList()
        }
      }
    });

    this.input__img.addEventListener('change', this.downloadImg.bind(this))
    this.admin__wrapperImg.addEventListener('click', this.deleteImg.bind(this))
  }

  labelSccess(isValide = true) {
    if (isValide) {
      this.admin__labelFile.classList.add('success')
      this.admin__labelFile.classList.remove('invalide')
    } else {
      this.admin__labelFile.classList.remove('success')
      this.admin__labelFile.classList.add('invalide')
    }
  }

  imgHtml(name, url) {
    return `<div data-name="${name}"><span class="img-name">${name}</span><img src="${url}" alt="${name}"><span class="img-delete">✖</span></div>`
  }

  updateFileList(isDownload = false) {
    !isDownload && this.fileList.items.clear();
    if (this.files.length > 0) {
      this.fileName.innerHTML = ''
      this.files.forEach(file => {
        this.fileList.items.add(file)
        this.fileName.insertAdjacentHTML('beforeend', `${file.name}, `);
      });
    }
    this.input__img.files = this.fileList.files
  }

  downloadImg(e) {
    this.files = Array.from(e.target.files)
    this.updateFileList(true)

    this.files.forEach(file => {
      const reader = new FileReader()

      reader.onload = e => {
        this.admin__wrapperImg.insertAdjacentHTML('beforeend', this.imgHtml(file.name, e.target.result))
        this.labelSccess()
      }

      reader.readAsDataURL(file)
    })
  }

  deleteImg(e) {
    if (e.target.classList.contains('img-delete')) {
      const div = e.target.closest('div')
      const imgName = div.dataset.name
      const deleteImg = this.admin__wrapperImg.querySelector(`[data-name="${imgName}"]`)
      this.files = Array.from(this.fileList.files).filter(file => file.name !== imgName)
      this.updateFileList()

      if (this.files.length === 0) {
        this.labelSccess(false)
      }

      deleteImg.remove()
    }
  }

  async fetchImageAndConvertToBlob({ rout, productName, imgName }) {
    try {
      const urlImg = `${this.imagesPathName[rout]}${translit(productName)}/${imgName}`

      const response = await fetch(urlImg);
      const blob = await response.blob();

      this.fileName.insertAdjacentHTML('beforeend', `${imgName}, `);
      this.admin__wrapperImg.insertAdjacentHTML('beforeend', this.imgHtml(imgName, urlImg))

      return blob;
    } catch (error) {
      console.error('Ошибка при получении изображения:', error);
      throw error; // Прокидываем ошибку дальше для обработки выше
    }
  }

  async loadImageInput(option) {
    try {
      if (!option.jsonImagesName) return
      const imagesName = JSON.parse(option.jsonImagesName)

      for (const imgName of imagesName) {
        option.imgName = imgName
        const blobImage = await this.fetchImageAndConvertToBlob(option);
        const fileImage = new File([blobImage], imgName, { type: "image/jpeg" }); //  type: blobImage.type
        this.fileList.items.add(fileImage)
      }

      this.input__img.files = this.fileList.files
    } catch (error) {
      console.error('Ошибка при загрузке изображения в input:', error);
    }
  }
}

export default LoadImageIntoInput 