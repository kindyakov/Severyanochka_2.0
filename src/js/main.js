import checkSupportWebP from "./modules/checkSupportWebP.js"
import headerData from './modules/headerData.js'
import { useDynamicAdapt } from "./modules/dynamicAdapt.js";
import user from "./modules/user/user.js";
import catalog from "./modules/catalog/catalog.js";
import { Search } from "./components/search.js";
import headerCatalog from "./components/headerCatalog.js";

checkSupportWebP()
useDynamicAdapt()
user()
catalog()
headerCatalog()

const catalogMenu = document.querySelector('.header-catalog');
const wrapper = document.querySelector('.wrapper');
//Menu
const headerMenu = document.querySelector('.header-menu')
if (headerMenu) headerData()
//
const menuLinks = document.querySelectorAll('.header-menu__item');
const footerLinks = document.querySelectorAll('.footer__menu-link');
//
const btnUp = document.querySelector('.btn-up');
// Поиск
const search = new Search('#header-input', '.search_result');

if (wrapper) {
  wrapper.addEventListener('mouseover', function (e) {
    if (e.target.closest('.header-catalog__button')) {
      catalogMenu.classList.add('open');
      document.querySelector('.header-catalog__button').classList.add('active');
    } else if (!e.target.closest('.wrpper-catalog__button') && !e.target.closest('.header-catalog')) {
      catalogMenu.classList.remove('open')
      document.querySelector('.header-catalog__button').classList.remove('active');
    }
  });
}

function linkActive(selector, url) {
  for (let i = 0; i < selector.length; i++) {
    const link = selector[i];
    if (url === link.href) {
      link.classList.add('active');
    }
  }
}
window.addEventListener('DOMContentLoaded', function () {
  let url = document.location.href;
  linkActive(footerLinks, url);
  linkActive(menuLinks, url);
})

if (btnUp) {
  btnUp.addEventListener('click', function () {
    window.scrollTo({
      top: 1,
      behavior: "smooth"
    });
  })

  window.addEventListener('scroll', function () {
    const viewport_width = Math.max(document.documentElement.clientHeight, window.innerHeight);
    if (scrollY >= viewport_width) {
      btnUp.classList.add('visible');
    } else {
      btnUp.classList.remove('visible');
    }
  })
}


