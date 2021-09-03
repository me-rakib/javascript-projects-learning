const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// check if anything previously selected
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const currentTheme = ()=> document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const currentIcon = ()=> themeButton.classList.contains(iconTheme) ? 'ri-sun-line' : 'ri-moon-line'

if(selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-sun-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', ()=> {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    // save to local 
    localStorage.setItem('selected-theme', currentTheme())
    localStorage.setItem('selected-icon', currentIcon())
})
