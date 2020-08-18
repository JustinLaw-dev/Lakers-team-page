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

players.forEach((player) => {
  player.addEventListener('mouseenter', enterHandler);
  player.addEventListener('mouseleave', leaveHandler);
});
