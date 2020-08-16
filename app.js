// //Tab functionality for header
// const players = document.querySelectorAll('.player');

// function clickHandler(event) {
//   players.forEach((player) => {
//     player.classList.remove('selected');
//   });
//   event.currentTarget.classList.add('selected');
// }
// // console.log(event.currentTarget);

// players.forEach((player) => {
//   player.addEventListener('click', clickHandler);
// });
const player = document.querySelector('.landing__composition--player');

player.onmouseover = function () {
  player.setAttribute('src', './img/kuz outline.png');
};

player.onmouseout = function () {
  player.setAttribute('src', './img/kuz.png');
};
