const text = document.getElementById("text");
const textArr = [...text.innerText];

const visibilityCheck = () => {
  return Math.random() <= 0.5 ? "visibility:hidden" : "visibility:shown";
};

const newElP = document.createElement("p");
newElP.innerHTML = `${textArr
  .map((letter) => `<span style="${visibilityCheck()}">${letter}</span>`)
  .join("")}`;

newElP.classList.add('overlay')
document.body.appendChild(newElP);