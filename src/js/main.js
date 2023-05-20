import checkSupportWebP from "./modules/checkSupportWebP.js"
import headerData from './modules/headerData.js'
import { useDynamicAdapt } from "./modules/dynamicAdapt.js";
checkSupportWebP()
useDynamicAdapt()
// import CreateSliderCards from "./modules/slider/CreateSliderCards.js";
// import LoadingSwiper from "./modules/slider/LoadingSwiper.js";
import user from "./modules/user/user.js";

user()

// const [cardsBasket, cardsFavourites] = CardsFromLS();

const catalogMenu = document.querySelector('.header-catalog');
const wrapper = document.querySelector('.wrapper');
const _slides_cards = document.querySelector('._slides-cards');
//Modal
const profilButton = document.querySelector('.header-profil');
//Menu
const headerOriginal = document.querySelector('.header-menu__wrpper');
const headerClon = document.querySelector('.menu-fixed')
const headerMenu = document.querySelector('.header-menu')
const headerWrapper = document.querySelector('.header-wrapper')

//
const menuLinks = document.querySelectorAll('.header-menu__item');
const footerLinks = document.querySelectorAll('.footer__menu-link');
//
const btnUp = document.querySelector('.btn-up');
//
if (headerMenu) headerData()
// if (_slides_cards) {
//   Request(urlOrigin)
//     .then(data => {
//       new CreateSliderCards({
//         insert: _slides_cards,
//         where: 'afterbegin',
//         title: 'Покупали раньше',
//         link: urlOrigin + '/discount.html',
//         linkText: 'Все покупки',
//         className: 'bought',
//         cards: GetAllCards({ product: data, random: true }),
//         urlOrigin: urlOrigin,
//       });
//       new CreateSliderCards({
//         insert: _slides_cards,
//         where: 'afterbegin',
//         title: 'Акции',
//         link: urlOrigin + '/discount.html',
//         linkText: 'Все акции',
//         className: 'new_action',
//         cards: GetAllCards({ product: data, byDiscount: true }),
//         urlOrigin: urlOrigin,
//       });
//       new CreateSliderCards({
//         insert: _slides_cards,
//         where: 'afterbegin',
//         title: 'Новинки',
//         link: urlOrigin + '/new-products.html',
//         linkText: 'Все новинки',
//         className: 'new_products',
//         cards: GetAllCards({ product: data, random: true }),
//         urlOrigin: urlOrigin,
//       });
//     }).finally(() => {
//       LoadingSwiper();
//       Rating();
//       AddDisableCardBtn(cardsBasket);
//       AddDisableCardLike(cardsFavourites);
//     });
// }
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
  //mouseover
  //mouseout
  //mousemove
  // if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
  //   wrapper.addEventListener('click', (e) => {
  //     if (e.target.closest('.header-catalog__button')) {
  //       e.preventDefault();
  //       catalogMenu.classList.add('open');
  //       document.querySelector('.header-catalog__button').classList.add('active');
  //       document.body.classList.add('lock');
  //       document.querySelector('html').classList.add('lock');
  //     } else if (catalogMenu.classList.contains('open')) {
  //       if (!e.target.closest('.wrpper-catalog__button') && !e.target.closest('.header-catalog')) {
  //         catalogMenu.classList.remove('open')
  //         document.querySelector('.header-catalog__button').classList.remove('active');

  //         document.body.classList.remove('lock');
  //         document.querySelector('html').classList.remove('lock');
  //       }
  //     }
  //   });
  //   let touchY = null;

  //   function touchStart(e) {
  //     const touch = e.touches[0];
  //     touchY = touch.clientY;
  //   }
  //   function touchMove(e) {
  //     if (!touchY) {
  //       return false;
  //     }
  //     let catalogMenuHeight = this.clientHeight;

  //     let moveY = e.touches[0].clientY;
  //     let yDiff = touchY - moveY;

  //     if (yDiff > 150) {
  //       catalogMenu.classList.remove('open')
  //       document.querySelector('.header-catalog__button').classList.remove('active');

  //       document.body.classList.remove('lock');
  //       document.querySelector('html').classList.remove('lock');
  //     }
  //   }
  //   catalogMenu.addEventListener('touchstart', touchStart);
  //   catalogMenu.addEventListener('touchmove', touchMove);
  // }
}

function linkActive(selector, url) {
  for (let i = 0; i < selector.length; i++) {
    const link = selector[i];
    if (url === link.href) {
      link.classList.add('active');
    }
  }
}
window.addEventListener('load', function () {
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
}

window.addEventListener('scroll', function () {
  const viewport_width = Math.max(document.documentElement.clientHeight, window.innerHeight);
  if (scrollY >= viewport_width) {
    btnUp.classList.add('visible');
  } else {
    btnUp.classList.remove('visible');
  }
})
