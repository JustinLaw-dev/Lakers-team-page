//Tab functionality for header
const players = document.querySelectorAll('.player');

function clickHandler() {
  console.log('Hello World');
}

players.forEach((player) => {
  player.addEventListener('click', clickHandler);
});
