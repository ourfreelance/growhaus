import "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"

const swiper = new Swiper('.swiper-form', {
  allowTouchMove: false,
  slidesPerView: 1,
  delayBetweenSlides: 700,
  navigation: {
    prevEl: '.swiper-prev-slide',
    nextEl: '.swiper-next-slide',
    disabledClass: 'navigation-disabled',
    lockClass: 'hidden'
  },
  pagination: {
    el: '.swiper-pagination-form',
    bulletClass: 'swiper-pagination-form-bullet',
    bulletActiveClass: 'swiper-pagination-form-bullet-active',
    clickable: true,
    renderBullet: function (index, className) {
      return index === 0 || index === this.slides.length - 1
        ? `<button type="button" class="${className} hidden"></button>`
        : `<button type="button" class="${className}">
              <span class="hidden md:block">Step ${index} - ${this.slides.length  - 2}</span>
              <span class="block md:hidden">${index}</span>
            </button>`
    },
  },
})

// enter on input to next slide
const formInputs = document.querySelectorAll('.form-input')
formInputs.forEach(input => {
  input.addEventListener('keyup', e => {
    if(e.key == 'Enter') {
      swiper.slideNext()
    }
  })
})

const navigationForm = document.querySelectorAll('.swiper-navigation-form')

function showHideNavigation() {
  if(swiper.activeIndex === 0 || swiper.activeIndex === swiper.slides.length - 1) {
    navigationForm.forEach(nav => {
      nav.style.opacity = '0'
    })
  } else {
    navigationForm.forEach(nav => {
      nav.style.opacity = '100'
    })
  }
}

showHideNavigation()

swiper.on('slideChange', function () {
  showHideNavigation()
  // auto focus input after slide change
  const activeSlide = swiper.slides[swiper.activeIndex]
  const activeSlideInput = activeSlide?.querySelector('.form-input')
  const slideNextButton = document.querySelector('.swiper-navigation-form.swiper-next-slide')

  // if input no have value, disabled navigation
  if(activeSlideInput) {
    if(activeSlideInput?.value) {
      navigationActive(true)
    } else {
      navigationActive(false)
    }
    activeSlideInput?.addEventListener('input', (e) => {
      if(e.target.value) {
        navigationActive(true)
      } else {
        navigationActive(false)
      }
    })
  } else if(swiper.activeIndex === swiper.slides.length - 2) {
    navigationActive(false)
  } else {
    navigationActive(true)
  }

  function navigationActive(status) {
    slideNextButton.classList[status ? 'remove' : 'add']('navigation-disabled')
    swiper.allowSlideNext = status
  }

});


// pagination style logic
const paginationForm = document.querySelector('.swiper-pagination-form')
const paginations = document.querySelectorAll('.swiper-pagination-form-bullet')
const swiperLength = swiper.slides.length - 1

if(swiper.activeIndex === 0 ) {
  paginationForm.style.opacity = '0'
} else {
  paginationForm.style.opacity = '100'
}

swiper.on('paginationUpdate', (swiper) => {
  if(swiper.activeIndex === 0 || swiper.activeIndex === swiperLength ) {
    paginationForm.style.opacity = '0'
  } else {
    paginationForm.style.opacity = '100'
  }
  paginations.forEach((page, i) => {
    if((i - 1) < swiper.activeIndex ) {
      page.classList.add('swiper-pagination-form-bullet-active')
    }
  })
})


// onsubmit form
const formSubmitButton = document.querySelector('.form-submit-button')
formSubmitButton.addEventListener('click', () => {
  swiper.allowSlideNext = true
  swiper.slideNext()
})