//Tab functionality for header
const players = document.querySelectorAll('.player');

function clickHandler(event) {
  players.forEach((player) => {
    player.classList.remove('selected');
  });
  event.currentTarget.classList.add('selected');
}
// console.log(event.currentTarget);

players.forEach((player) => {
  player.addEventListener('click', clickHandler);
});
