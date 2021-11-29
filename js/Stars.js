//Erstelle den moving background
function addStar(starClass) {
  let div = document.createElement("div");
  div.classList.add("star", starClass);
  div.style.left = GetRandomIntger(0, 720) + "px";
  document.querySelector(GameSettings.gameAreaDiv).appendChild(div);
}

function createStars() {
  for (let i = 0; i < 10; ++i) {
    let delay = i * 333;
    GameManager.timeouts.push(window.setTimeout(addStar, delay, "starSmall"));
    GameManager.timeouts.push(
      window.setTimeout(addStar, delay + 333, "starnormal")
    );
    GameManager.timeouts.push(
      window.setTimeout(addStar, delay + 666, "starBig")
    );
  }
}

function GetRandomIntger(from, range) {
  return Math.floor(Math.random() * range) + from;
}

function removeStars() {
  document.querySelectorAll(".star").forEach((e) => e.remove());
}

function pauseStars() {
  document
    .querySelectorAll(".star")
    .forEach((e) => (e.style.animationPlayState = "paused"));
}