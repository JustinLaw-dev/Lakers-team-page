const players = document.querySelectorAll('.landing__composition--player');
const backArrow = document.querySelector('.landing__back-arrow');
const playerHeading = document.querySelector('.landing__player-name');
let initialPlayerX;
let initialPlayerY;
let selectedPlayer;

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
      player.style.pointerEvents = 'none';
    }
    if (e.currentTarget.alt === player.alt) {
      selectedPlayer = e.currentTarget;

      //Mark selected player's initial position styling
      initialPlayerX = `${(e.currentTarget.offsetLeft / 1920) * 100}%`;
      //switch case for bottom row vs mid row of players Y position
      // bottom row" AB RONDO KUZ BRON AD JAVALE CARUSO
      //jr smith dudley kcp dg dwight dion
      switch (selectedPlayer.alt) {
        case 'Avery Bradley':
        case 'Rajon Rondo':
        case 'Kyle Kuzma':
        case 'Lebron James':
        case 'Anthony Davis':
        case 'Javale McGee':
        case 'Alex Caruso':
          initialPlayerY = '0%';
          break;
        case 'JR Smith':
        case 'Jared Dudley':
        case 'Kentavious Caldwell-Pope':
        case 'Danny Green':
        case 'Dwight Howard':
        case 'Dion Waiters':
          initialPlayerY = '20rem';
          break;
      }

      console.log(initialPlayerX, initialPlayerY);
      e.currentTarget.style.bottom = '0%';
      e.currentTarget.style.left = '-4%';

      backArrow.style.opacity = 1;
      playerHeading.style.opacity = 1;
      playerHeading.textContent = e.currentTarget.alt;

      // prettier-ignore
      let dataID = e.currentTarget.dataset.id;

      //Parse data for table, from CSV
      //Then Begin rendering table
      d3.text(`./data/python/${dataID}_data.csv`).then(function (datasetText) {
        var rows = d3.csvParseRows(datasetText),
          table = d3
            .select('#tableContainer')
            .append('table')
            .style('border-collapse', 'collapse')
            .style('border', '2px black solid');

        //Create tooltip
        let toolTip = d3
          .select('#tableContainer')
          .append('div')
          .attr('class', 'tooltip')
          .style('opacity', 0);

        //Render headers
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

        // table.selectAll('th').style('background-color', 'blue');
        table
          .selectAll('th')
          // Tooltip
          .on('mouseenter', function (d) {
            toolTip.transition().duration(300).style('opacity', 0.9);

            // Render tool tip text content based on hover selection
            switch (d.currentTarget.textContent) {
              case 'Rk':
                toolTip.html('Rank');
                break;
              case 'G':
                toolTip.html('Season Game');
                break;
              case 'Date':
                toolTip.html('Date');
                break;
              case 'Age':
                toolTip.html('Age - Years & Days');
                break;
              case 'Tm':
                toolTip.html('Team');
                break;
              case 'Opp':
                toolTip.html('Opponent');
                break;
              case 'GS':
                toolTip.html('Games Started');
                break;
              case 'MP':
                toolTip.html('Minutes Played');
                break;
              case 'FG':
                toolTip.html('Field Goals');
                break;
              case 'FGA':
                toolTip.html('Field Goal Attempts');
                break;
              case 'FG%':
                toolTip.html('Field Goal Percentage');
                break;
              case '3P':
                toolTip.html('3-Point Field Goals');
                break;
              case '3PA':
                toolTip.html('3-Point Field Goal Attempts');
                break;
              case '3P%':
                toolTip.html('3-Point Field Goal Percentage');
                break;
              case 'FT':
                toolTip.html('Free Throws');
                break;
              case 'FTA':
                toolTip.html('Free Throw Attempts');
                break;
              case 'FT%':
                toolTip.html('Free Throw Percentage');
                break;
              case 'ORB':
                toolTip.html('Offensive Rebounds');
                break;
              case 'DRB':
                toolTip.html('Defensive Rebounds');
                break;
              case 'TRB':
                toolTip.html('Total Rebounds');
                break;
              case 'AST':
                toolTip.html('Assists');
                break;
              case 'STL':
                toolTip.html('Steals');
                break;
              case 'BLK':
                toolTip.html('Blocks');
                break;
              case 'TOV':
                toolTip.html('Turnovers');
                break;
              case 'PF':
                toolTip.html('Personal Fouls');
                break;
              case 'PTS':
                toolTip.html('Points');
                break;
              case 'GmSc':
                toolTip.html('Game Score');
                break;
              case '+/-':
                toolTip.html('Plus/Minus');
                break;
              //Hide tooltip for unnamed boxes 5 & 7
              default:
                toolTip.style('display', 'none');
            }

            toolTip
              .style('left', d.pageX - 325 + 'px')
              .style('top', d.pageY - 170 + 'px');
          })
          .on('mouseout', function (d) {
            //
            toolTip.transition().duration(200).style('opacity', 0);
            //Display tool tip after leaving unnamed boxes 5 & 7
            if (
              d.currentTarget.textContent === 'Unnamed: 5' ||
              d.currentTarget.textContent === 'Unnamed: 7'
            ) {
              toolTip.style('display', 'block');
            }
          });
      });
      player.removeEventListener('click', showStats);
    }
  });
}

function resetPage() {
  players.forEach((player) => {
    player.style.opacity = 1;
    player.style.pointerEvents = 'auto';
    backArrow.style.opacity = 0;
    playerHeading.style.opacity = 0;

    d3.selectAll('table').remove();

    //Re-Add event listener
    player.addEventListener('click', showStats);
  });

  //Return player to original location using initalplayerX and initialplayerY
  selectedPlayer.style.bottom = initialPlayerY;
  selectedPlayer.style.left = initialPlayerX;
}

//Initial state event listeners. Click -> remove listener, add upon pressing reset page.
players.forEach((player) => {
  player.addEventListener('mouseenter', enterHandler);
  player.addEventListener('mouseleave', leaveHandler);
  player.addEventListener('click', showStats);
});

backArrow.addEventListener('click', resetPage);
