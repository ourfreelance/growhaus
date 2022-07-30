import "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"

const formInputs = document.querySelectorAll('.form-input')

const navigationForm = document.querySelectorAll('.swiper-navigation-form')
const slideNextButtons = document.querySelectorAll('.swiper-navigation-form.swiper-next-slide')

const paginationForm = document.querySelector('.swiper-pagination-form')

const toggleMenu = document.querySelector('.toggle-menu')
const menuIcon = toggleMenu.querySelector('img')
const menu = document.querySelector('.menu')

const iframeTarget = document.querySelector('#hidden_iframe')

if(iframeTarget) {
  iframeTarget.onerror = function() {
    console.log();
  }

  iframeTarget.onload = function () {
    window.location.href = '/submit-success'
  }
}

const slideBody = document.querySelectorAll('.slide-body')

slideBody.forEach(slide => {
  slide.style.height = (window.innerHeight-244)+'px'
})

// Toggle Menu
toggleMenu.addEventListener('click', () => {
  menu.classList.toggle('translate-y-[-150%]')
  menuIcon.src = menu.classList.contains('translate-y-[-150%]') ? '/assets/images/menu.svg' : '/assets/images/menu-close.svg'
})

const swiper = new Swiper('.swiper-form', {
  allowTouchMove: false,
  slidesPerView: 1,
  keyboard: {
    enabled: true
  },
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
      return index === 0
        ? `<div class="${className} hidden cursor-pointer"></div>`
        : `<div class="${className} cursor-pointer flex justify-center items-center">
              <span class="hidden md:block">Step ${index} - ${this.slides.length  - 1}</span>
              <span class="block md:hidden">${index}</span>
            </div>`
    },
  },
})

showHideNavigation()

swiper.on('slideChange', function () {
  showHideNavigation()
  // auto focus input after slide change
  const activeSlide = swiper.slides[swiper.activeIndex]
  const activeSlideInput = activeSlide?.querySelector('.form-input')

  // if input no have value, disabled navigation
  if(activeSlideInput) {
    if(activeSlideInput?.value) {
      navigationActive(true)
    } else {
      navigationActive(false)
    }
  } else {
    navigationActive(true)
  }
});


// pagination style logic
if(paginationForm){
  if(swiper.activeIndex === 0 ) {
    paginationForm.style.opacity = '0'
  } else {
    paginationForm.style.opacity = '100'
  }  
}

swiper.on('paginationUpdate', (swiper) => {
  const paginations = document.querySelectorAll('.swiper-pagination-form-bullet')

  if(swiper.isBeginning) {
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

let emailErrorText = "there's must be valid email"
let urlErrorText = "there's must be valid url"

formInputs.forEach(input => {
  input.addEventListener('input', e => {

    // check required
    if(e.target.type == 'email') {
      const errorEmail = document.querySelector(`.error-${e.target.id}`)
      errorEmail.textContent = !validateEmail(e.target.value) ? emailErrorText : ""
      isInputValid(e.target, validateEmail(e.target.value))
      navigationActive(validateEmail(e.target.value))
      return
    }
    if(e.target.type == 'url') {
      const errorUrl = document.querySelector(`.error-${e.target.id}`)
      errorUrl.textContent = !validateUrl(e.target.value) ? urlErrorText : ""
      isInputValid(e.target, validateUrl(e.target.value))
      navigationActive(validateUrl(e.target.value))
      return
    } 

    isInputValid(e.target, e.target.value)
    navigationActive(!!e.target.value)
  })
})

function navigationActive(status) {
  slideNextButtons.forEach(nextButton => {
    nextButton.classList[status ? 'remove' : 'add']('navigation-disabled')
  })
  swiper.allowSlideNext = status
}

function showHideNavigation() {
  if(swiper.activeIndex === 0) {
    navigationForm.forEach(nav => {
      nav.style.opacity = '0'
    })
  } else {
    navigationForm.forEach(nav => {
      nav.style.opacity = '100'
    })
  }
}

function validateEmail (value) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return regex.test(value) ? true : false
}

function isInputValid(el, condition) {
  el.classList[condition ? 'remove' : 'add']('!border-danger')
  el.classList[condition ? 'add' : 'remove']('!border-primary')
}

function validateUrl(value) {
  const res = value.match(/(http(s?):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};