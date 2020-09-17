//TODO: make player img ID the same as link to image. Then use back
//ticks to create a string with ${this.id} so you can use one logic
// to apply to all
//done
const players = document.querySelectorAll('.landing__composition--player');

function enterHandler() {
  this.setAttribute('src', `./img/${this.id} outline.png`);
}

function leaveHandler() {
  this.setAttribute('src', `./img/${this.id}.png`);
}

function showStats(e) {
  players.forEach((player) => {
    if (e.currentTarget.alt != player.alt) {
      player.style.opacity = 0;
    }
  });
}

players.forEach((player) => {
  player.addEventListener('mouseenter', enterHandler);
  player.addEventListener('mouseleave', leaveHandler);
  player.addEventListener('click', showStats);
});
