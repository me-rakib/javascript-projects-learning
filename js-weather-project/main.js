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

// API Info & default location
const API_KEY = "e4568c50f1bfbd1fba67df40937990dd"
let BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=tangail,BD&appid=${API_KEY}`

// get current location info
window.onload = function() {
    navigator.geolocation.getCurrentPosition(success => {
        BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=rajshahi&appid=${API_KEY}&lat=${success.coords.latitude}&lon=${success.coords.longitude}`
        getData(BASE_URL)
    }, error => {
        getData(BASE_URL) 
    })
}

//get city name from user
getCity.addEventListener("keypress", e => {
    if (e.key == "Enter") {
        e.defaultPrevented
        BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${API_KEY}`
        getData(BASE_URL)
        e.target.value = ""
    }
})

// fatching data from openWeathermap and update
const getData = (updateURL) => {
    fetch(updateURL)
        .then(res => res.json())
        .then(data => {

            changeImage(data.weather[0].icon)
            updateInnerHTML(city, data.name)
            updateInnerHTML(country, data.sys.country)
            updateInnerHTML(main, data.weather[0].main)
            updateInnerHTML(description, data.weather[0].description)
            updateInnerHTML(temp, kelvinToCelcius(data.main.temp))
            updateInnerHTML(pressure, data.main.pressure)
            updateInnerHTML(humidity, data.main.humidity)
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

// temperature concersion
const kelvinToCelcius = temp => {
    return (temp - 273.15).toFixed(2)
}