class Ship {
  constructor(divName, position, imgName, sizePx) {
    this.position = position;
    this.divName = divName;
    this.imgName = imgName;
    this.size = sizePx;
    this.anchorShift = new Point(-this.size.width / 2, -this.size.height / 2);
    this.containingBox = new hitBox(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  addToBoard(shift) {
    let div = document.createElement("div");
    div.classList.add("Ship");
    div.id = this.divName;
    div.style.backgroundImage = "url('" + this.imgName + "')";
    div.style.width = this.size.width + "px";
    div.style.height = this.size.height + "px";
    document.querySelector(GameSettings.gameAreaDiv).appendChild(div);
    this.setPosition(this.position.x, this.position.y, shift);
  }

  removeFromBoard() {
    let removeFB = document.getElementById(this.divName);
    removeFB.remove();
  }

  draw() {
    let drawPosition = {
      name: document.querySelectorAll("#" + this.divName),
      left: this.position.x,
      top: this.position.y,
    };
    drawPosition.name.forEach(function (el, ind) {
      el.style.left = drawPosition.left + "px";
      el.style.top = drawPosition.top + "px";
    });
  }

  setPosition(x, y, shift) {
    this.position.update(x, y);
    this.containingBox.update(this.position.x, this.position.y);
    if (shift == true) {
      this.incrementPosition(this.anchorShift.x, this.anchorShift.y);
    }
    this.draw();
  }

  updatePosition(x, y) {
    this.position.update(x, y);
    this.containingBox.update(this.position.x, this.position.y);
    this.draw();
  }

  incrementPosition(ix, iy) {
    this.position.increment(ix, iy);
    this.containingBox.update(this.position.x, this.position.y);
    this.draw();
  }

  getCenter() {
    return new Point(
      this.position.x - this.anchorShift.x,
      this.position.y - this.anchorShift.y
    );
  }
}
