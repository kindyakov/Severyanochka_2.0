const tabsProfile = () => {
  const account__tabList = document.querySelector('.account__tab-list')
  const account__content = document.querySelector('.account__content')
  const account__tabPreview = Array.from(document.querySelectorAll('.account__tab-preview'))

  const addActive = (tabP) => {
    account__tabList.classList.add('none')
    account__content.classList.remove('none')
    tabP.classList.add('active');
  }
  const removeActive = () => {
    account__tabPreview.forEach(tab => tab.classList.remove('active'))
    account__tabList.classList.remove('none')
    account__content.classList.add('none')
  }

  const assign = (e) => {
    const hash = location.hash || null
    const tab = e && e.target.closest('.account-tabs')
    const id = e ? tab.getAttribute('href') : hash
    const tabP = document.querySelector(id)
    return { hash, tabP }
  }

  const handlerClick = (e) => {
    if (e.target.closest('.account-tabs')) {
      const { tabP } = assign(e)
      addActive(tabP)
    }
    if (e.target.closest('.account-data-back')) {
      removeActive()
    }
  }

  const handlerLoad = () => {
    const { hash, tabP } = assign()
    if (!hash) return
    addActive(tabP)
  }

  window.addEventListener('click', handlerClick)
  window.addEventListener('load', handlerLoad)
}

export default tabsProfile