import noUiSlider from 'nouislider';

class RangeSlider {
  constructor(min, max) {
    this.slider = document.querySelector('.filters_box-paramets__sliders')
    this.minPrice = document.querySelector('#min-price');
    this.maxPrice = document.querySelector('#max-price');
    this.inputsPrice = [this.minPrice, this.maxPrice];
    this.min = min
    this.max = max
    this.rangeSettings = {
      start: [min, max],
      connect: true,
      step: 1,
      range: {
        'min': [min],
        'max': [max],
      }
    }

    this.create()
  }

  create = () => {
    noUiSlider.create(this.slider, this.rangeSettings);
    this.upDate()
    this.change()
  }

  upDate = () => {
    this.slider.noUiSlider.on('update', (values, handle) => {
      this.inputsPrice[handle].value = Math.round(values[handle]);
    })
  }

  change = () => {
    this.inputsPrice.forEach((el, i) => {
      el.addEventListener('change', e => this.setRangeSlider(i, e.currentTarget.value))
    })
  }

  setRangeSlider = (i, value) => {
    let arr = [null, null]
    arr[i] = value;
    this.slider.noUiSlider.set(arr);
  
  }
  clear = () => {
    this.slider.noUiSlider.set([`${this.min}`, `${this.max}`]);
  }
}

export default RangeSlider