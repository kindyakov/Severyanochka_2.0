const loader = (size = 80) => {
  return `<div class="wrapper-loader">
  <div class="loader-content"><span class="loader" style="width: ${size}px; height: ${size}px"></span></div>
  </div>`
}

export default loader