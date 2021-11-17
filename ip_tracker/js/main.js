const getUserInput = document.getElementById("get-ip");
const searchBtn = document.getElementById("search-btn");
const showIp = document.getElementById("ip");
const showLocation = document.getElementById("location");
const showTimezone = document.getElementById("timezone");
const showIsp = document.getElementById("isp");
const BASE_URL =
  "https://ipgeolocation.abstractapi.com/v1/?api_key=16b6bdb2a0664fb086b7da92c362af63";

const up = document.getElementById("up");
const down = document.getElementById("down");
const dataContainer = document.getElementById("main-data-container");

let map;
let marker;

window.onload = () => {
  getData();

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

  // ===== MAP =====
  let mapOptions = {
    center: [23.7018, 90.3742],
    zoom: 12,
  };
  map = new L.map("map", mapOptions);
  let layer = new L.TileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  map.addLayer(layer);
  marker = L.marker([73.7018, 90.3742]);
  marker.addTo(map);
};

// ===== Send URL with ip address =====
const sendUserInput = (value) => {
  if (value) {
    let url = `${BASE_URL}&ip_address=${value}`;
    getData(url);
  }
};

// ===== Fetch data =====
const getData = (url = BASE_URL) => {
  axios
    .get(url)
    .then((data) => {
      storeData(data.data, showData);
    })
    .catch((error) => {
      console.log(error);
      alert("Oops! Please recheck ip, there might be slight error.");
    });
};

// ===== Store data as object =====
const storeData = (data, cb) => {
  let datas = {
    ip: data.ip_address,
    tz: data.timezone.abbreviation,
    location: data.country,
    latitude: data.latitude,
    longitude: data.longitude,
    isp: data.connection.autonomous_system_organization,
  };
  cb(datas);
};

// ===== Update data on front page =====
const showData = (data) => {
  showIp.innerText = data.ip;
  showIsp.innerText = data.isp;
  showTimezone.innerText = data.tz;
  showLocation.innerText = data.location;

  map.flyTo([data.latitude, data.longitude], 12);
  marker.setLatLng([data.latitude, data.longitude]).update();
};

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
