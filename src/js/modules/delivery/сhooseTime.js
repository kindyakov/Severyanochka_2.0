export const сhooseTime = (selector) => {

  const addActive = (e) => {
    const time_block = e.target.closest(selector)
    time_block.classList.add('active')
  }

  const removeActive = (e) => {
    const time_block = document.querySelectorAll(selector)
    time_block.forEach(block => block.classList.remove('active'))
  }

  const handleClick = e => {
    if (e.target.closest(`${selector}:not(.time-disable)`)) {
      removeActive()
      addActive(e)
    }
  }

  window.addEventListener('click', handleClick)
}