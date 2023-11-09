// const players = [
//   "Player 1",
//   "Player 2",
//   "Player 3",
//   "Player 4",
//   "Player 5",
//   "Player 6",
//   "Player 7",
//   "Player 8",
//   "Player 9",
//   "Player 10",
// ];

const matchHandler = (players, currDate) => {
  const matches = [];

  let date = new Date(currDate);
  let dayIndex = 0;

  for (let i = 0; i < players.length - 1; i++) {
    for (let j = i + 1; j < players.length; j++) {
      matches.push({
        homeTeam: players[i],
        awayTeam: players[j],
        day: date.getDate(),
        time: getTimeSlot(dayIndex),
      });

      matches.push({
        homeTeam: players[j],
        awayTeam: players[i],
        day: date.getDate() + 7,
        time: getTimeSlot(dayIndex),
      });

      dayIndex = (dayIndex + 1) % 4;

      if (dayIndex === 0) {
        date = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1
        );
      }
    }
  }

  function getTimeSlot(dayIndex) {
    switch (dayIndex) {
      case 0:
        return "7pm";
      case 1:
        return "9pm";
      case 2:
        return "11pm";
      case 3:
        return "12pm";
      default:
        return "Unknown time";
    }
  }
  return matches;
};

export default matchHandler;
