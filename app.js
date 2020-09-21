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
      // player.style.opacity = 0;
      player.style.display = 'none';
    }
    if (e.currentTarget.alt === player.alt) {
      console.log('1');
      d3.text('AB_data.csv').then(function (datasetText) {
        var rows = d3.csvParseRows(datasetText),
          table = d3
            .select('#tableContainer')
            .append('table')
            .style('border-collapse', 'collapse')
            .style('border', '2px black solid');

        // headers
        table
          .append('thead')
          .append('tr')
          .selectAll('th')
          .data(rows[0])
          .enter()
          .append('th')
          .text(function (d) {
            return d;
          })
          .style('border', '1px black solid')
          .style('padding', '5px')
          .style('background-color', 'lightgray')
          .style('font-weight', 'bold')
          .style('text-transform', 'uppercase');

        // data
        table
          .append('tbody')
          .selectAll('tr')
          .data(rows.slice(1))
          .enter()
          .append('tr')
          .selectAll('td')
          .data(function (d) {
            return d;
          })
          .enter()
          .append('td')
          // .style('border', '1px black solid')
          .style('border-top', '1px black solid')
          .style('border-bottom', '1px black solid')
          .style('padding', '5px')
          .style('background-color', 'white')
          // .on('mouseover', function () {
          //   d3.select(this).style('background-color', 'powderblue');
          // })
          // .on('mouseout', function () {
          //   d3.select(this).style('background-color', 'white');
          // })
          .text(function (d) {
            return d;
          })
          .style('font-size', '1rem');
      });
    }
  });
}

players.forEach((player) => {
  player.addEventListener('mouseenter', enterHandler);
  player.addEventListener('mouseleave', leaveHandler);
  player.addEventListener('click', showStats);
});
