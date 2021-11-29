function gameTime() {
  let now = Date.now();
  let dt = now - GameManager.lastUpdated;
  GameManager.lastUpdated = now;
  GameManager.fps = parseInt(1000 / dt);

  GameManager.enemies.updateEnemies(dt);

  if (GameManager.enemies.gameOver == true) {
    showGameOver();
  } else {
    GameManager.lasershots.fireLaser(dt);
    GameManager.player.update(dt);
    if (GameManager.player.lives <= 0) {
      showGameOver();
    } else if (GameManager.phase == GameSettings.gamePhase.playing) {
      setTimeout(gameTime, GameSettings.gameSpeed);
    }
  }
}

function clearTimeouts() {
  for (let i = 0; i < GameManager.timeouts.length; ++i) { 
    clearTimeout(GameManager.timeouts[i]);
  }
  GameManager.timeouts = [];
}

function showGameOver() {
  GameManager.phase = GameSettings.gameOver;

  pauseStars();
  clearTimeouts();

  if (GameManager.enemies.gameOver == true) {
    playSound("Victory");
  } else {
    playSound("Game Over");
  }

  writeMessage("Game Over");
  stopMusic("Black Vortex");
  setTimeout(function () {
  appendMessage("Leertaste zum Starten");
  }, GameSettings.gameStartDelay);
}

function endCountDown() {
  clearMessages();
  GameManager.phase = GameSettings.gamePhase.playing;
  GameManager.lastUpdated = Date.now();
  setTimeout(gameTime, GameSettings.gameSpeed);
}

function setCountDownValue(val) {
  playSound("countdown");
  writeMessage(val);
}

function runCountDown() {
  createStars();
  GameManager.phase = GameSettings.gamePhase.countdownToStart;
  writeMessage(3);
  playSound("countdown");
  for (let i = 0; i < GameSettings.countDownValues.length; ++i) {
    setTimeout(
      setCountDownValue,
      GameSettings.countdownGap * (i + 1),
      GameSettings.countDownValues[i]
    );
  }
  setTimeout(
    endCountDown,
    (GameSettings.countDownValues.length + 1) * GameSettings.countdownGap
  );
}

function writeMessage(text) {
  clearMessages();
  appendMessage(text);
}

function appendMessage(text) {
  document
    .querySelector("#messenger")
    .insertAdjacentHTML("beforeend", '<div class="message">' + text + "</div>");
}

function clearMessages() {
  let message = document.querySelector("#messenger");
  message.innerHTML = "";
}

function setExplosions() {
  GameManager.explosions = new Explosions("explosion00_s");
}

function setLasers() {
  if (GameManager.lasershots != undefined) {
    GameManager.lasershots.reset();
  } else {
    GameManager.lasershots = new laserCollection(GameManager.player);
  }
}

function setEnemies() {
  if (GameManager.enemies != undefined) {
    GameManager.enemies.reset();
  } else {
    GameManager.enemies = new EnemyGroup(
      GameManager.player,
      GameManager.lasershots,
      GameManager.explosions
    );
  }
}

function setPlayer() {
  if (GameManager.player == undefined) {
    let asset = GameManager.assets["playerShip"];

    GameManager.player = new Player(
      "playerShip",
      new Point(GameSettings.playerStartingPosition.x, GameSettings.playerStartingPosition.y),
      asset,
      new hitBox(
        40,
        40,
        GameSettings.gameAreaWidth - 80,
        GameSettings.gameAreaHeight - 80
      )
    );
    GameManager.player.addToBoard(true);
  }
  GameManager.player.reset();
}

function resetGame() {
  clearTimeouts();
  removeStars();
  setPlayer();
  setLasers();
  setExplosions();
  setEnemies();

  GameManager.phase = GameSettings.gamePhase.readyToplay;
  GameManager.lastUpdated = Date.now();
  GameManager.elapsedTime = 0;

  writeMessage("Leertaste zum Starten");
}

function processImage(indexNum) {
  let img = new Image();
  let fileName = "images/" + ImageFiles[indexNum] + ".png";
  img.src = fileName;
  img.onload = function () {
    GameManager.assets[ImageFiles[indexNum]] = {
      width: this.width,
      height: this.height,
      fileName: fileName,
    };
    indexNum++;
    if (indexNum < ImageFiles.length) {
      processImage(indexNum);
    } else {
      resetGame();
    }
  };
}

document.addEventListener("DOMContentLoaded", startGame, false);

//Initialisiert den Spielverlauf
function startGame() {
  getSounds();
  setUpSequences();
  document.addEventListener("keydown", logKey);
  function logKey(e) {
    if (GameManager.phase == GameSettings.gamePhase.readyToplay) {
      if (e.which == GameSettings.keyPress.space) {
        runCountDown();
        playMusic("Black Vortex");
      }
    } else if (GameManager.phase == GameSettings.gamePhase.playing) {
      switch (e.which) {
        case GameSettings.keyPress.up:
          GameManager.player.move(0, -1);
          break;
        case GameSettings.keyPress.down:
          GameManager.player.move(0, 1);
          break;
        case GameSettings.keyPress.left:
          GameManager.player.move(-1, 0);
          break;
        case GameSettings.keyPress.right:
          GameManager.player.move(1, 0);
          break;
      }
    } else if (GameManager.phase == GameSettings.gameOver) {
      if (e.which == GameSettings.keyPress.space) {
        resetGame();
      }
    }
  }
  processImage(0);
}
