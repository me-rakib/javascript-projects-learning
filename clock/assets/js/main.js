// ========== CLOCK ==========
const hour = document.getElementById('clock-hour'),
    minutes = document.getElementById('clock-minute'),
    seconds = document.getElementById('clock-seconds')

const clock = () => {
    let date = new Date()

    //get current hour, minute & seconds
    let hh = date.getHours() * 30,
        mm = date.getMinutes() * 6,
        ss = date.getSeconds() * 6

    //rotate hands of the clock
    hour.style.transform = `rotateZ(${hh+mm/12}deg)`
    minutes.style.transform = `rotateZ(${mm}deg)`
    seconds.style.transform = `rotateZ(${ss}deg)`
}

setInterval(clock, 1000);

// ========== Text date and date ==========
const textHour = document.getElementById('text-hour'),
      textMinute = document.getElementById('text-minutes'),
      textAmPm = document.getElementById('text-ampm'),
      dateDay = document.getElementById('date-day'),
      dateMonth = document.getElementById('date-month'),
      dateYear = document.getElementById('date-year')

const clockText = () => {
    let date = new Date()

    let hh = date.getHours(),
        ampm,
        mm = date.getMinutes(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear()

    // convert 24 hour to 12
    if(hh>12) {
        hh = hh - 12;
        ampm = 'PM'
    } else {
        ampm = 'AM'
    }

    // add 0 before hour & minute
    hh = hh < 10 ? `0${hh}` : hh
    mm = mm < 10 ? `0${mm}` : mm

    // show hour
    textHour.innerText = `${hh}:`

    //show minute
    textMinute.innerText = `${mm}`

    // show ampm
    textAmPm.innerText = ampm

    // get month name
    const months = ['Jan', 'Feb', 'Mar', 'Apr',	'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    // show dates
    dateDay.innerText = day
    dateMonth.innerText = `${months[month]},`
    dateYear.innerText = year
}

setInterval(clockText, 1000) 

// ========== DARK/LIGHT Theme ==========
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bxs-sun'

// get previously selected theme and icon (if any)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains('iconTheme') ? 'bxs-moon' : 'bxs-sun' 


// check whether user previously selected any theme
if(selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme)
}

// active/deactive theme manually with the button
themeButton.addEventListener('click', ()=> {

    // add or remove dark theme & icon
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    //save to localstorage
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})