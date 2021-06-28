// Selector
const weatherImg = document.getElementById("weather-img")
const city = document.getElementById("city")
const country = document.getElementById("country")
const main = document.getElementById("main")
const description = document.getElementById("description")
const temp = document.getElementById("temp")
const pressure = document.getElementById("pressure")
const humidity = document.getElementById("humidity")
const getCity = document.getElementById("get-city")
const historyEl = document.getElementById("history")
const getHistorydiv = document.getElementById("history-main")


// API Info & default location
const API_KEY = "e4568c50f1bfbd1fba67df40937990dd"
let BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=tangail,BD&appid=${API_KEY}`


// get current location info
window.onload = function () {
    navigator.geolocation.getCurrentPosition(success => {
        BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&lat=${success.coords.latitude}&lon=${success.coords.longitude}`
        getData(BASE_URL, false)
    }, error => {
        getData(BASE_URL, false)
    })
}


//get city name from user
getCity.addEventListener("keypress", e => {
    if (e.key == "Enter") {
        e.defaultPrevented
        BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${API_KEY}`
        getData(BASE_URL, true)
        e.target.value = ""
        localKey++;
    }
})


//key setup for localstorage
let localKey = 0
if (localStorage.length != 0) {
    localKey = localStorage.length
} else {
    localKey = 0
}


// fatching data from openWeathermap and update
const getData = (updateURL, savetoLocal) => {
    fetch(updateURL)
        .then(res => res.json())
        .then(data => {
            if (savetoLocal) {
                sessionStorage.setItem(`${localKey}`, JSON.stringify(data))
                let getFromLocal = JSON.parse(sessionStorage.getItem(`${localKey}`))
                console.log(getFromLocal)
                updateHistory(getFromLocal)
            }

            passInnerData(data)
        })
}


// change favicon & weather image
const changeImage = (imgId) => {
    weatherImg.src = `https://openweathermap.org/img/w/${imgId}.png`
    document.querySelector("link[rel='icon']").href = `https://openweathermap.org/img/w/${imgId}.png`
}


// change innerHTML data
const updateInnerHTML = (selector, value) => {
    selector.innerHTML = value
}


// Inner Html 
const passInnerData = (data) => {
    changeImage(data.weather[0].icon)
    updateInnerHTML(city, data.name)
    updateInnerHTML(country, data.sys.country)
    updateInnerHTML(main, data.weather[0].main)
    updateInnerHTML(description, data.weather[0].description)
    updateInnerHTML(temp, kelvinToCelcius(data.main.temp))
    updateInnerHTML(pressure, data.main.pressure)
    updateInnerHTML(humidity, data.main.humidity)
}


// temperature concersion
const kelvinToCelcius = temp => {
    return (temp - 273.15).toFixed(2)
}


//update history 
const updateHistory = (data) => {
    let tempHistory = getHistorydiv.cloneNode(true)
    tempHistory.getElementsByClassName("weather-condition")[0].src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    tempHistory.getElementsByClassName('city')[0].innerHTML = data.name
    tempHistory.getElementsByClassName("country")[0].innerHTML = data.sys.country
    tempHistory.getElementsByClassName('main')[0].innerHTML = data.weather[0].main
    tempHistory.getElementsByClassName('description')[0].innerHTML = data.weather[0].description
    tempHistory.getElementsByClassName('temp')[0].innerHTML = kelvinToCelcius(data.main.temp)
    tempHistory.getElementsByClassName('pressure')[0].innerHTML = data.main.pressure
    tempHistory.getElementsByClassName('humidity')[0].innerHTML = data.main.humidity
    tempHistory.style.display = "block"
    historyEl.append(tempHistory)
}
