const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal__btn");
const btn = document.querySelector(".game__rules-btn");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissors");
const rock = document.querySelector("#rock");
const showcase = document.querySelector(".game__showcase");
const line = document.querySelectorAll(".line");
const picked = document.querySelector(".game__picked");
const border = document.querySelectorAll('[class^="game__img-border"]');
const positionRock = document.querySelector(".game__img-border-rock");
const gameField = document.querySelector(".game__battle");
const labelScore = document.querySelector(".game__score-value");

btn.addEventListener("click", () => {
  overlay.classList.toggle("hidden");
  modal.classList.toggle("hidden");
});

modalBtn.addEventListener("click", () => {
  overlay.classList.toggle("hidden");
  modal.classList.toggle("hidden");
});

const costumizePick = () => {
  [...border].forEach((bor) => {
    bor.style.width = "35rem";
    bor.style.height = "35rem";
  });
};

const randomPick = () => {
  const pick = ["rock", "paper", "scissors"];
  return pick[Math.trunc(Math.random() * pick.length)];
};

const playAgain = () => {
  showcase.classList.toggle("hidden");
  document.querySelector(".game__user-picked").remove();
  document.querySelector(".game__ai-picked").remove();
  document.querySelector(".game__message").remove();
  const shadow = document.querySelectorAll(".game__shadow");

  line.forEach((el) => {
    el.classList.toggle("hidden");
  });
  gameField.style.width = "80rem";
  [...shadow].forEach((sha) => {
    sha.remove();
  });
};

const userPicked = (user, name, heading, insert) => {
  const html = `
  <div class="game__${user}-picked">
  <h1 class="heading-3">${heading}<h1>
  <div class="game__img-border-${name} ${name}">
    <div class="game__img-container">
      <img
        src="/images/icon-${name}.svg"
        alt="${name}"
        class="game__hand"
      />
    </div>
  </div>
  </div>`;
  const shadow = `
  <div class="game__shadow"></div>
  `;
  picked.insertAdjacentHTML("afterend", shadow);
  picked.insertAdjacentHTML(insert, html);
  return name;
};
let score = 0;
const winner = (player, ai) => {
  let message;
  if (player === ai) message = "Draw";
  else if (player === "paper" && ai === "rock") message = "You Win";
  else if (player === "rock" && ai === "scissors") message = "You Win";
  else if (player === "scissors" && ai === "paper") message = "You Win";
  else message = "You Lose";

  const html = `
  <div class="game__message">
      <h1 class="heading-1">${message}</h1>
      <button class="game__message-btn">Play Again</button>
    </div>`;
  const user = document.querySelector(".game__user-picked");
  user.insertAdjacentHTML("afterend", html);

  ///Add Score
  if (message === "You Win") labelScore.textContent = ++score;
  if (score > 0) if (message === "You Lose") labelScore.textContent = --score;

  //Play Again
  document.querySelector(".game__message-btn").addEventListener("click", () => {
    playAgain();
  });
};

const element = [paper, scissor, rock];

element.forEach((element) => {
  element.addEventListener("click", (e) => {
    showcase.classList.toggle("hidden");
    line.forEach((el) => {
      el.classList.toggle("hidden");
    });

    const name = String(e.target.alt || e.target.id);
    let user = userPicked("user", name, "You picked", "afterbegin");
    let ai;
    setTimeout(() => {
      ai = userPicked("ai", randomPick(), "The house picked", "beforeend");
    }, 1500);
    setTimeout(() => {
      gameField.style.width = "110rem";
      winner(user, ai);
    }, 2100);
  });
});
