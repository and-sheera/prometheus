document.addEventListener('DOMContentLoaded', function () {
  header()
  infrastructure()
  gallery()
  benefits()
  checkInputFill()
})

function header() {
  const headerBlock = document.querySelector('.header')

  const burgerIcon = headerBlock.querySelector('.header__burger')
  burgerIcon.addEventListener('click', function () {
    headerBlock.classList.toggle('header--burger')
    document.documentElement.classList.toggle('no-scroll')
  })

  const shadow = headerBlock.querySelector('.header__shadow')
  shadow.addEventListener('click', function () {
    headerBlock.classList.remove('header--burger')
    document.documentElement.classList.remove('no-scroll')
  })

  for (const link of headerBlock.querySelectorAll('a')) {
    link.addEventListener('click', function () {
      headerBlock.classList.remove('header--burger')
      document.documentElement.classList.remove('no-scroll')
    })
  }
}

function infrastructure() {
  if (document.querySelector('.infrastructure')) {
    const infrastructureSlider = new Swiper('.infrastructure__slider', {
      slidesPerView: 1,
      speed: 500,
      spaceBetween: 25,
      centeredSlides: false,
      slidesOffsetBefore: 0,
      autoHeight: true,
      navigation: {
        nextEl: '.infrastructure__ui-slider-nav .ui-slider-nav__btn--next',
        prevEl: '.infrastructure__ui-slider-nav .ui-slider-nav__btn--prev'
      },
      pagination: {
        el: '.infrastructure__ui-slider-pagination',
        type: 'bullets'
      },
      breakpoints: {
        767: {
          slidesPerView: 'auto'
        },
        1259: {
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 50,
          slidesOffsetBefore: -250
        }
      }
    })
    window.addEventListener('load', function () {
      if (this.window.innerWidth < 767) infrastructureSlider.update()
    })
  }
}

function gallery() {
  if (document.querySelector('.gallery')) {
    const gallerySlider = new Swiper('.gallery__slider', {
      slidesPerView: 1,
      speed: 500,
      spaceBetween: 25,
      navigation: {
        nextEl: '.gallery__ui-slider-nav .ui-slider-nav__btn--next',
        prevEl: '.gallery__ui-slider-nav .ui-slider-nav__btn--prev'
      },
      pagination: {
        el: '.gallery__pagination',
        type: 'fraction',
        formatFractionCurrent(number) {
          return number < 10 ? `0${number}` : number
        },
        formatFractionTotal(number) {
          return number < 10 ? `0${number}` : number
        }
      },
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-20%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }
    })
  }
}

function benefits() {
  const benefitsBlock = document.querySelector('.benefits')
  if (benefitsBlock) {
    if (window.innerWidth > 767) {
      window.addEventListener('load', function () {
        for (const textWrapper of document.querySelectorAll('.benefits__text-wrapper')) {
          const text = textWrapper.firstElementChild
          if (text.firstChild.length > 155) {
            textWrapper.parentElement.classList.add('benefits__info--more')

            const height = textWrapper.offsetHeight
            textWrapper.style.height = `${height}px`

            let timeoutId

            textWrapper.addEventListener('mouseenter', function () {
              if (timeoutId) {
                clearTimeout(timeoutId)
                textWrapper.classList.remove('benefits__text-wrapper--show')
              }
              textWrapper.classList.add('benefits__text-wrapper--show')
              textWrapper.style.height = `${text.offsetHeight}px`
              textWrapper.parentElement.classList.remove('benefits__info--more')
            })

            textWrapper.addEventListener('mouseleave', function () {
              textWrapper.style.height = `${height}px`
              textWrapper.parentElement.classList.add('benefits__info--more')
              timeoutId = setTimeout(() => {
                textWrapper.classList.remove('benefits__text-wrapper--show')
              }, 500)
            })
          }
        }
      })
    } else {
      for (const item of document.querySelectorAll('.benefits__item')) {
        item.querySelector('.benefits__name').addEventListener('click', function () {
          item.classList.toggle('benefits__item--open')
          $(item.querySelector('.benefits__info')).slideToggle()
        })
      }
    }
  }
}

function checkInputFill() {
  const uiInputs = document.querySelectorAll('.ui-input')
  if (uiInputs) {
    for (const element of uiInputs) {
      const input = element.querySelector('input')
      input.value !== '' ? input.classList.add('filled') : input.classList.remove('filled')
      input.addEventListener('input', function () {
        input.value !== '' ? input.classList.add('filled') : input.classList.remove('filled')
      })
    }
  }
}
