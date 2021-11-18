const getUserInput = document.getElementById("get-ip");
const searchBtn = document.getElementById("search-btn");
const showIp = document.getElementById("ip");
const showLocation = document.getElementById("location");
const showTimezone = document.getElementById("timezone");
const showIsp = document.getElementById("isp");
const BASE_URL =
  "https://ipgeolocation.abstractapi.com/v1/?api_key=16b6bdb2a0664fb086b7da92c362af63";

const LOCATION_API =
  "https://www.mapquestapi.com/geocoding/v1/reverse?key=G1D4CXE06niRbk2nSz6SOZAhgdxHLKzc&location=";

const up = document.getElementById("up");
const down = document.getElementById("down");
const dataContainer = document.getElementById("main-data-container");

let info;
let map;
let marker;

window.onload = () => {
  alert("ERROR!! Asynchronous Issue");
  getData(BASE_URL, storeData);
  navigator.geolocation.getCurrentPosition(
    (s) => {
      let lat = s.coords.latitude;
      let long = s.coords.longitude;
      createMap(lat, long);
      getData(`${LOCATION_API}${lat},${long}`, storeLocation);
    },
    (e) => {
      createMap(info.latitude, info.longitude);
      getData(
        `${LOCATION_API}${info.latitude},${info.longitude}`,
        storeLocation
      );
    }
  );
};

// ===== Create Map =====
const createMap = (lat, long) => {
  let mapOptions = {
    center: [lat, long],
    zoom: 12,
  };
  map = new L.map("map", mapOptions);
  let layer = new L.TileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  map.addLayer(layer);
  marker = L.marker([lat, long]);
  marker.addTo(map);
};

// ===== Update Map =====
const updateMap = (lat, long) => {
  map.flyTo([lat, long], 12);
  marker.setLatLng([lat, long]).update();
};

// ===== Update data on front page =====
const showData = (ip, isp, tz, location) => {
  showIp.innerText = ip;
  showIsp.innerText = isp;
  showTimezone.innerText = tz;
  showLocation.innerText = location;
};

// ===== Store data as object =====
const storeData = (data) => {
  info = {
    ip: data.ip_address,
    tz: data.timezone.abbreviation,
    location: data.country,
    latitude: data.latitude,
    longitude: data.longitude,
    isp: data.connection.autonomous_system_organization,
  };
};

const storeLocation = (data) => {
    street = data.results[0].locations[0].street
    city = data.results[0].locations[0].adminArea5
    showData(
      info.ip,
      info.isp,
      info.tz,
      `${street}, ${city}`
    );
};

const getData = (url, cb) => {
  axios
    .get(url)
    .then((data) => {
      cb(data.data);
    })
    .catch((error) => {
      console.log(error);
      alert("Oops! Please recheck ip, there might be slight error.");
    });
};


// ===== Send URL with ip address =====
const sendUserInput = (value) => {
  if (value) {
    let url = `${BASE_URL}&ip_address=${value}`;
    getData(url, storeData);
    updateMap(info.latitude, info.longitude);
    getData(
        `${LOCATION_API}${info.latitude},${info.longitude}`,
        storeLocation
      );
  }
};

searchBtn.addEventListener("click", (e) => {
  sendUserInput(getUserInput.value);
  getUserInput.value = "";
});

getUserInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendUserInput(e.target.value);
    e.target.value = "";
  }
});

// ===== To hide information container =====
up.addEventListener("click", () => {
  dataContainer.classList.add("hidden");
  down.classList.add("visible");
  dataContainer.classList.remove("block");
  down.classList.remove("hidden");
});

// ===== To show information container =====
down.addEventListener("click", () => {
  dataContainer.classList.remove("hidden");
  down.classList.remove("visible");
  dataContainer.classList.add("block");
  down.classList.add("hidden");
});

// ===== Light / Dark Theme =====
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark";
const iconTheme = "bxs-sun";

// check whether anuthing is selected
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// get current
const getCurrentTheme = () =>
  document.getElementsByTagName("html")[0].classList.contains(darkTheme)
    ? "dark"
    : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bxs-moon" : "bxs-sun";

if (selectedTheme) {
  document
    .getElementsByTagName("html")[0]
    .classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "bxs-moon" ? "add" : "remove"](
    iconTheme
  );
}

// select theme manually
themeButton.addEventListener("click", () => {
  document.getElementsByTagName("html")[0].classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  // save to local
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
