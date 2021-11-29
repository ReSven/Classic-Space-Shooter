//Musicplayer
function playMusic(sound) {
  GameManager.sounds[sound].play();
  GameManager.sounds[sound].loop = true;
}

function pauseMusic(sound) {
  GameManager.sounds[sound].pause();
}

function stopMusic(sound) {
  GameManager.sounds[sound].pause();
  GameManager.sounds[sound].currentTime = 0;
}

// Stelle Musik ein und aus
function toggleMusic() {
  GameManager.music === true
    ? (pauseMusic("Black Vortex"),
      (document.querySelector("#music").style.backgroundImage =
        "url('../images/play.png')"),
      (GameManager.music = false))
    : (playMusic("Black Vortex"),
      (document.querySelector("#music").style.backgroundImage =
        "url('../images/pause.png')"),
      (GameManager.music = true));
}

//Sound wird geladen
function loadSound(fileName) {
  GameManager.sounds[fileName] = new Audio(soundPath + fileName + ".mp3");
}

//Sound wird in das soundFiles[] in dem GameManager initialisiert
function getSounds() {
  for (let i = 0; i < soundFiles.length; ++i) {
    loadSound(soundFiles[i]);
  }
}

//Spiele Sound ab
function playSound(sound) {
  GameManager.sounds[sound].play();
}


