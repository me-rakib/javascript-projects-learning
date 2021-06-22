const text = document.getElementById("text");
const textArr = text.innerText.split("")

const newEl = document.createElement("p");

const randomVisibility = () => {
  return Math.random() < 0.5 ? 'visibility: hidden' : 'visibility: visible';
};

newEl.innerHTML = `
	${textArr.map(letter => `<span class="letter" style="${randomVisibility()}">${letter}</span>`).join('')}
`;

newEl.classList.add("overlay");
document.body.appendChild(newEl);
