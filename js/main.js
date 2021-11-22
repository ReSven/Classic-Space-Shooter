var character = document.getElementById("character");
var board = document.getElementById("board");

//Tastenbelegung:
// Pfeiltasten und Keycode 32
//32 ist die Leertaste und wird zum feuern des lasers verwendet

window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    character.style.left = left - 10 + "px";
  }
  //460  =>  board width - character width
  else if (e.key == "ArrowRight" && left <= 460) {
    character.style.left = left + 10 + "px";
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {

    var laser = document.createElement("div");
    laser.classList.add("lasers");
    board.appendChild(laser);

    var movelaser = setInterval(() => {
      var enemies = document.getElementsByClassName("enemies");

      for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        if (enemy != undefined) {
          var enemybound = enemy.getBoundingClientRect();
          var laserbound = laser.getBoundingClientRect();

          //Check ob laser und enemy in der gleichen position sind. Falls ja, wird der enemy zerstört

          if (
            laserbound.left >= enemybound.left &&
            laserbound.right <= enemybound.right &&
            laserbound.top <= enemybound.top &&
            laserbound.bottom <= enemybound.bottom
          ) {
            enemy.parentElement.removeChild(enemy); //Der Enemy wird entfernt;
            //Scoreboard
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
      var laserbottom = parseInt(
        window.getComputedStyle(laser).getPropertyValue("bottom")
      );

      // Laser wird auf die größe des Gamecanvases begrenzt
      if (laserbottom >= 500) {
        clearInterval(movelaser);
      }
	  //Der laser soll vom character ausgehen.

      laser.style.left = left + "px"; 
      laser.style.bottom = laserlaserbottom + 3 + "px";
    });
  }
});

var generateenemies = setInterval(() => {
  var enemy = document.createElement("div");
  enemy.classList.add("enemies");

  //Enemy placement in zufälliger Position
  var enemyleft = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("left")
  );
  //Wert zwischen 0 und 450 wird generiert wo 450 => board breite - enemy breite
  enemy.style.left = Math.floor(Math.random() * 450) + "px";

  board.appendChild(enemy);
}, 1000);

//Enemy Movement

var moveenemies = setInterval(() => {
  var enemies = document.getElementsByClassName("enemies");

  if (enemies != undefined) {
    for (var i = 0; i < enemies.length; i++) {
      
      var enemy = enemies[i]; //getting each enemy
      var enemytop = parseInt(
        window.getComputedStyle(enemy).getPropertyValue("top")
      );
      //475 => boardheight - enemyheight + 25
      if (enemytop >= 475) {
        alert("Game Over");
        clearInterval(moveenemies);
        window.location.reload();
      }

      enemy.style.top = enemytop + 25 + "px";
    }
  }
}, 450);
