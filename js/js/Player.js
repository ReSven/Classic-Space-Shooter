class Player extends Ship {
  constructor(divName, position, assetDesc, boundaryhitBox) {
    super(
      divName,
      position,
      assetDesc.fileName,
      new Size(assetDesc.width, assetDesc.height)
    );
    this.lives = GameSettings.playerStartingLives;
    this.score = 0;
    this.highScore = 0;
    this.hit = false;
    this.lastFlash = 0;
    this.numFlashes = 0;
    this.state = GameSettings.playerState.ok;
    this.boundaryhitBox = boundaryhitBox;
    this.boundaryhitBox.shift(this.anchorShift.x, this.anchorShift.y);
  }

  reset() {
    this.state = GameSettings.playerState.ok;
    this.score = 0;
    this.hit = false;
    this.lastFlash = 0;
    this.numFlashes = 0;
    this.lives = GameSettings.playerStartingLives;
    this.setLives();
    this.setScore();
    this.setHighScore();
    this.setPosition(
      GameSettings.playerStartingPosition.x,
      GameSettings.playerStartingPosition.y,
      true
    );
  }

  update(dt) {
    switch (this.state) {
      case GameSettings.playerState.invincible:
        this.lastFlash += dt;
        if (this.lastFlash > GameSettings.playerInvincibilityFrames) {
          this.lastFlash = 0;
          this.numFlashes++;
          if (this.numFlashes == GameSettings.playerFlashes) {
            this.state = GameSettings.playerState.ok;
            document.getElementById(this.divName).style.display = "block";
            this.hit = false;
            document.getElementById(this.divName).style.opacity = "1.0";
          } else {
            if (this.numFlashes % 2 == 1) {
              document.getElementById(this.divName).style.display = "none";
            } else {
              document.getElementById(this.divName).style.display = "block";
            }
          }
        }
        break;
    }

    if (
      this.hit == true &&
      this.state != GameSettings.playerState.invincible
    ) {
      this.state = GameSettings.playerState.invincible;
      this.lastFlash = 0;
      this.numFlashes = 0;
      this.lives--;
      this.setLives();
      playSound("Hit");
      if (this.lives > 0) {
        document.getElementById(this.divName).style.opacity = GameSettings.playerTransparency;
      }
    }
  }

  move(x, y) {
    let xStep = GameSettings.playerMoveStep * x;
    let yStep = GameSettings.playerMoveStep * y;

    if (this.boundaryhitBox.OutsideHorizontal(xStep + this.position.x) == true) {
      xStep = 0;
    }
    if (this.boundaryhitBox.OutsideVertical(yStep + this.position.y) == true) {
      yStep = 0;
    }

    this.incrementPosition(xStep, yStep);
  }

  incrementScore(amount) {
    this.score += amount;
    this.setScore();
    this.setHighScore();
  }

  setLives() {
    let livesElement = document.querySelector("#lives");
    livesElement.innerHTML = "Lives: x " + this.lives;
  }
  setScore() {
    let scoreElement = document.querySelector("#score");
    scoreElement.innerHTML = "Score: " + this.score;
  }
  setHighScore() {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    let highScoreElement = document.querySelector("#highScore");
    highScoreElement.innerHTML = "Highscore: " + this.highScore;
  }
}
