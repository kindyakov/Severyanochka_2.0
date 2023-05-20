const sideBar = () => {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  //
  const filters = document.querySelector('.catalog-products__filters'),
    filters_body = document.querySelector('.catalog-products__filters_body'),
    container = document.querySelector('.container');

  const catalogContent = document.querySelector('.catalog-products__content'),
    catalogWrapper = document.querySelector('.catalog-products__wrapper');

  // filter scroll
  let viewport_width, OffsetLeft, topFilters, heightFilters, heightFilter, widthFilters
  let touchX = null;

  const filtersParametrs = () => {
    viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth);

    OffsetLeft = container.offsetLeft;
    topFilters = catalogContent.offsetTop - 20;

    heightFilters = catalogContent.offsetHeight;
    heightFilter = filters_body.offsetHeight;

    widthFilters = filters.offsetWidth;
  }
  filtersParametrs()

  if (viewport_width <= 768) {
    filters.classList.add('dev');
  }

  const handlerScroll = () => {
    heightFilters = catalogContent.offsetHeight;
    if (filters.classList.contains('dev')) return
    if (scrollY >= topFilters) {
      filters_body.classList.add('fixed');
      filters_body.style.cssText = `left: ${OffsetLeft}px; width: ${widthFilters}px;`;
      filters_body.classList.remove('absolute');
    } else {
      filters_body.classList.remove('fixed');
      filters_body.style.left = '0';
    }

    if (scrollY >= ((heightFilters + topFilters) - heightFilter)) {
      filters_body.classList.add('absolute');
      filters_body.classList.remove('fixed');
      filters_body.style.left = '0';
    }
  }

  const handlerResize = () => {
    filtersParametrs()
    if (viewport_width <= 768) {
      filters.classList.add('dev')
      filters_body.classList.remove('fixed');
      filters_body.classList.remove('absolute');
      filters_body.style.cssText = '';
    } else {
      filters.classList.remove('dev')

      if (filters_body.classList.contains('fixed')) {
        filters_body.style.cssText = `left: ${OffsetLeft}px; width: ${widthFilters}px; `;
      }
    }
  }

  const sideBarActive = () => {
    filters.classList.add('active');
    body.classList.add('lock');
    html.classList.add('lock');
  }

  const sideBarClose = () => {
    filters.classList.remove('active');
    body.classList.remove('lock');
    html.classList.remove('lock');
  }

  const handlerClick = e => {
    if (e.target.classList.contains('filter-adaptive-active')) {
      sideBarActive()
    }
    if (e.target.classList.contains('filtres-close')) {
      sideBarClose()
    }
    if (filters.classList.contains('active')) {
      if (!e.target.closest('.catalog-products__filters') && !e.target.closest('.filter-adaptive-active')) {
        sideBarClose()
      }
    }
  }

  window.addEventListener('resize', handlerResize)
  window.addEventListener('scroll', handlerScroll)
  window.addEventListener('click', handlerClick)


  const touchStart = (e) => {
    if (viewport_width > 768) return
    const touch = e.touches[0];
    touchX = touch.clientX;
  }
  const touchMove = (e) => {
    if (viewport_width > 768) return
    if (!touchX) return false;

    let filtersWidth = filters.clientWidth;
    let moveX = e.touches[0].clientX;
    let xDiff = touchX - moveX;

    if (xDiff > (filtersWidth / 2.5)) sideBarClose()
  }

  filters.addEventListener('touchstart', touchStart);
  filters.addEventListener('touchmove', touchMove);
}

export default sideBar