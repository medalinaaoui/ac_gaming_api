function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const matchHandler = (players, startDate) => {
  const schedule = [];
  const days = 18;

  for (let day = 1; day <= days; day++) {
    shuffleArray(players);

    for (let i = 0; i < players.length; i += 2) {
      const homeTeam = players[i];
      const awayTeam = players[i + 1];
      const time = i / 2 < 12 ? `${i / 2 + 1} am` : `${i / 2 - 11} pm`;

      schedule.push({
        homeTeam,
        awayTeam,
        day: day + startDate,
        time,
      });
    }
  }

  return schedule;
};

export default matchHandler;
