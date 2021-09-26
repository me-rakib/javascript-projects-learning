const userScoreBtn = document.getElementById("user-score");
const computerScoreBtn = document.getElementById("computer-score");
const showResult = document.querySelector(".result > p");
const rockBtn = document.getElementById("r");
const paperBtn = document.getElementById("p");
const scissorBtn = document.getElementById("s");

let userScore = 0,
  computerScore = 0;

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function convertToWord(letter) {
  if (letter === "r") return "Rock";
  if (letter === "p") return "Paper";
  return "Scissors";
}

const smallUserWord = "user".fontsize(3).sub();
const smallCompWord = "comp".fontsize(3).sub();

function addRemoveBorder(btn, color) {
  btn.classList.add(color);
  setTimeout(() => {
    btn.classList.remove(color);
  }, 300);
}

function win(user, computer) {
  const userClickedOn = document.getElementById(user);
  userScore++;
  userScoreBtn.innerHTML = userScore;
  showResult.innerHTML = `${convertToWord(
    user
  )}${smallUserWord} beats ${convertToWord(
    computer
  )}${smallCompWord}. You Win!`;
  addRemoveBorder(userClickedOn, "green-glow");
}

function lose(user, computer) {
  const userClickedOn = document.getElementById(user);
  computerScore++;
  computerScoreBtn.innerHTML = computerScore;
  showResult.innerHTML = `${convertToWord(
    user
  )}${smallUserWord} loses to ${convertToWord(
    computer
  )}${smallCompWord}. You Lost... `;
  addRemoveBorder(userClickedOn, "red-glow");
}

function draw(user, computer) {
  const userClickedOn = document.getElementById(user);
  showResult.innerHTML = `${convertToWord(
    user
  )}${smallUserWord} equals ${convertToWord(
    computer
  )}${smallCompWord}. It's a draw... `;
  addRemoveBorder(userClickedOn, "gray-glow");
}

function game(userChoice) {
  const computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;
    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice);
      break;
    case "rr":
    case "pr":
    case "ss":
      draw(userChoice, computerChoice);
      break;
  }
}

function main() {
  rockBtn.addEventListener("click",()=> {
    game("r");
  });

  paperBtn.addEventListener("click", ()=> {
    game("p");
  });

  scissorBtn.addEventListener("click", ()=> {
    game("s");
  });
}

main();
