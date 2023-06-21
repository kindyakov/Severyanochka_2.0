import orderRender from "./modules/order/orderRender.js";
// import paginationProduct from "./modules/product/pagination.js";
import addProducts from "./modules/product/addProducts.js";
import loader from "./modules/loader.js";

const order_body = document.querySelector('.order__body')
order_body.innerHTML = loader()

orderRender.then(() => {
  new Swiper('.order__container-swiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    //= colum-gap
    spaceBetween: 25,
    // Бесконечная прокрутка
    // loop: true,
    // Кол-во дублирующих слайдов
    // loopedSlides: 1,

    // Брейк поинты (ширины )
    breakpoints: {
      300: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      360: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      580: {
        slidesPerView: 3,
        spaceBetween: 15
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 25,
      },
    }
  });

  addProducts('basket', '.card-button')
  addProducts('favourite', '.card-like')
}).catch(error => {
  console.error("Ошибка в order", error.message);
})

