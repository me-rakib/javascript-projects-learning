// ========== MENU ==========
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

// ===== Menu shown =====
// Validate if constant exists
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

// ===== Menu Hide =====
// Validate if constant exists
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

// 
const navLink = document.querySelectorAll('.nav__link')
const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}

for (el of navLink) {
    el.addEventListener('click', linkAction)
}

// ========== CHANGE BACKGROUND HEADER =====
const scrollHeader = () => {
    const header = document.getElementById('header')
    if (this.scrollY > 100) {
        header.classList.add('scroll-header')
    } else {
        header.classList.remove('scroll-header')
    }
}

window.addEventListener('scroll', scrollHeader)

// ========== SWIPER ==========
var swiper = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    }
});

// ========== VIDEO PLAY & PUSE CONTROL
const videoFile = document.getElementById('video-file'),
    videoButton = document.getElementById('video-button'),
    videoIcon = document.getElementById('video-icon')

const playPause = () => {
    if (videoFile.paused) {
        videoFile.play()

        //change icon
        videoIcon.classList.remove('ri-play-line')
        videoIcon.classList.add('ri-pause-line')
    } else {
        videoFile.pause()

        //change icon
        videoIcon.classList.remove('ri-pause-line')
        videoIcon.classList.add('ri-play-line')
    }
}
videoButton.addEventListener('click', playPause)

// video ends, icon change
const finalVideoIcon = () => {
    videoIcon.classList.remove('ri-pause-line')
    videoIcon.classList.add('ri-play-line')
}

//ended -> means video ends
videoFile.addEventListener('ended', finalVideoIcon)

// ========== SCROLL UP ==========
const scrollUp = ()=> {
    const scrollUp = document.getElementById('scroll-up')
    if(this.scrollY > 200) {
        scrollUp.classList.add('show-scroll')
    } else {
        scrollUp.classList.remove('show-scroll')
    }
}
window.addEventListener('scroll', scrollUp)

// ========== SCROLL SECTION ACTIVE LINK =========
const sections = document.querySelectorAll('section[id]')

const scrollActive = ()=> {
    const scrollY = window.pageYOffset
    sections.forEach(current => {
        const sectionTop = current.offsetTop - 50
        const sectionHeight = current.offsetHeight
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav__menu a[href*=${sectionId}]`).classList.add('active-link')
        } else {
            document.querySelector(`.nav__menu a[href*=${sectionId}]`).classList.remove('active-link') 
        }
    })
}

window.addEventListener('scroll', scrollActive)

// ========== DARK / LIGHT ==========
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// check if anything is selected or not
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = ()=> document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = ()=> themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// implement if theme previously selected
if(selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// select theme manually 
themeButton.addEventListener('click', ()=> {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    //save to localstorage
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// ========== SCROLL REVEAL ==========
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    reset: true,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
           .discover__container,
           .experience__data, .experience__overlay,
           .place__card,
           .sponsor__content,
           .footer__data, .footer__rights`,{
    origin: 'top',
    interval: 100,
})

sr.reveal(`.about__data, 
           .video__description,
           .subscribe__description`,{
    origin: 'left',
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .subscribe__form`,{
    origin: 'right',
    interval: 100,
})