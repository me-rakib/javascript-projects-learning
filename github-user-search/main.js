const getUserName = document.getElementById("get_user-name");
const searchBtn = document.getElementById("search-btn");
const profileAvatar = document.getElementById("profile-avatar");
const profileName = document.getElementById("profile-title-name");
const profileUserName = document.getElementById("profile__user-name");
const profileUserJoinDate = document.getElementById("profile__user-joindate");
const profileBio = document.querySelector(".profile__bio");
const repos = document.getElementById("total-repos");
const followers = document.getElementById("total-followers");
const followings = document.getElementById("total-following");
const userLocation = document.getElementById("user-location");
const userBlog = document.getElementById("user-blog");
const userTwitterId = document.getElementById("user-twitter-id");
const userCompany = document.getElementById("user-company");
const baseURL = "https://api.github.com/users/";
let userName = "me-rakib";

searchBtn.addEventListener("click", () => {
  userName = getUserName.value;
  getUserName.value = "";
  getData();
});

getUserName.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    userName = getUserName.value;
    getUserName.value = "";
    getData();
  }
});

const getData = () => {
  axios
    .get(`${baseURL}${userName}`)
    .then((response) => printData(response.data))
    .catch((error) => console.log(error));
};

const printData = (data) => {
  showAvatar(data.avatar_url);
  printName(data.name);
  printUserName();
  printJoinDate(data.created_at);
  printBio(data.bio);
  printProfileData(data.public_repos, data.followers, data.following);
  printProfissionalInfo(
    data.location,
    data.blog,
    data.twitter_username,
    data.company
  );
};

const showAvatar = (src) => {
  profileAvatar.src = src;
};

const printName = (name) => {
  profileName.innerText = name;
};

const printUserName = () => {
  profileUserName.innerText = userName;
};

const printJoinDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let joinDate = date.slice(0, 10);
  const year = joinDate.slice(0, 4);
  const month = joinDate.slice(5, 7);
  const day = joinDate.slice(8, 10);
  profileUserJoinDate.innerText = `${day} ${months[month - 1]} ${year}`;
};

const printBio = (bio) => {
  if (bio === null) {
    bio = "This profile has no bio!";
  }
  bio = bio.trim();
  profileBio.innerText = bio;
};

const printProfileData = (repo, follower, following) => {
  repos.innerText = repo;
  followers.innerText = follower;
  followings.innerText = following;
};

const printProfissionalInfo = (location, blog, twitter, company) => {
  const NA = "Not Available";
  const info = (ele, data, opacity) => {
    ele.innerText = data;
    ele.parentElement.style = `opacity: ${opacity}`;
  };

  if (location === null) {
    info(userLocation, NA, 0.5);
  } else {
    info(userLocation, location, 1);
  }

  if (blog === "") {
    info(userBlog, NA, 0.5);
  } else {
    info(userBlog, blog, 1);
  }

  if (twitter === null) {
    info(userTwitterId, NA, 0.5);
  } else {
    info(userTwitterId, twitter, 1);
  }

  if (company === null) {
    info(userCompany, NA, 0.5);
  } else {
    info(userCompany, `@${company}`, 1);
  }
};

getData();

// ========== Light / Dark Theme ==========
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bxs-sun";

// check whether anuthing is selected
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// get current
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bxs-moon" : "bxs-sun";
if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bxs-moon" ? "add" : "remove"](
    iconTheme
  );
}

// select theme manually
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  // save to local
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
