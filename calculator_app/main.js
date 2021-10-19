const showOutput = document.getElementById("calc__output-show"),
  btn = document.querySelectorAll(".btn");

let equ = "";
const showRes = function (equ) {
  if (equ.startsWith("0") && equ !== "0") {
    equ = equ.substring(1);
  } else if (equ === "") {
    equ = "0";
  }
  showOutput.innerText = equ;
};

btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let clickedOnInner = e.target.innerText;
    switch (clickedOnInner) {
      case "RESET":
        equ = "";
        break;
      case "DEL":
        if (equ === "Syntax Error") {
          equ = "";
        } else {
          equ = equ.slice(0, -1);
        }
        break;
      case "=":
        try {
          equ = eval(equ).toString();
        } catch (e) {
          equ = "Syntax Error";
        }
        break;
      case "x":
        equ = equ.concat("*");
        break;
      case "^":
        equ = equ.concat("**");
        break;
      case "π":
        equ = equ.concat("3.1416");
        break;
      default:
        equ = equ.concat(clickedOnInner);
        break;
    }
    showRes(equ);
  });
});

// ========== Dark / Light ==========
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bxs-sun";

// check if anything is already selected
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bxs-moon" : "bxs-sun";

// implement theme if previously selected
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
