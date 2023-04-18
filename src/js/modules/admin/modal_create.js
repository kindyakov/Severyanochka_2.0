import Modal from "../modal/Modal.js";
import forms from "./forms.js";

export const createdProduct = new Modal({
  // speed: 400,
  id: 'created-product',
  btnActive: '[data-create="product"]',
  name: '.modal',
  title: 'Продукт',
  btnClose: '.modal__close',
  closeArea: 'modal__body',
  insertHTML: document.querySelector('.admin'),
  formH: forms.product
})

export const createdBrand = new Modal({
  id: 'created-brand',
  btnActive: '[data-create="brand"]',
  name: '.modal',
  title: 'Бренд',
  btnClose: '.modal__close',
  closeArea: 'modal__body',
  insertHTML: document.querySelector('.admin'),
  formH: forms.brand
})

export const createdType = new Modal({
  id: 'created-type',
  btnActive: '[data-create="type"]',
  name: '.modal',
  title: 'Тип',
  btnClose: '.modal__close',
  closeArea: 'modal__body',
  insertHTML: document.querySelector('.admin'),
  formH: forms.type
})