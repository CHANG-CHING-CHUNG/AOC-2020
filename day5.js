const fs = require("fs");

fs.readFile("./day5.txt", "utf8", (err, data) => {
  const rows = [0, 127];
  const cols = [0, 7];
  const result = [];
  data = data.split("\r").map((seat) => {
    return seat.replace(/\n/g, "");
  });
  data.pop();
  data.forEach((seat) => {
    result.push(
      calSeatId(calFB(rows, seat.slice(0, 7)), calRL(cols, seat.slice(7)))
    );
  });
  console.log(
    result
      .sort((a, b) => a - b)
      .filter((id, idx, arr) => {
        console.log(arr[idx]);
        return (
          idx !== 0 && idx !== arr.length - 1 && arr[idx] + 2 === arr[idx + 1]
        );
      })
  );

  function calSeatId(rowNum, colNum) {
    return rowNum * 8 + colNum;
  }
  function calFB(rows, seats) {
    for (let i = 0; i < seats.length; i++) {
      if (seats[i] === "F") {
        const F = Math.floor((rows[0] + rows[1]) / 2);
        rows = [rows[0], F];
      }
      if (seats[i] === "B") {
        const B = Math.ceil((rows[0] + rows[1]) / 2);
        rows = [B, rows[1]];
      }
    }
    if (seats[seats.length - 1] === "F") {
      // console.log(rows[0]);
      return rows[0];
    } else if (seats[seats.length - 1] === "B") {
      // console.log(rows[1]);
      return rows[1];
    }
  }

  function calRL(cols, seats) {
    for (let i = 0; i < seats.length; i++) {
      if (seats[i] === "L") {
        const F = Math.floor((cols[0] + cols[1]) / 2);
        cols = [cols[0], F];
      }
      if (seats[i] === "R") {
        const B = Math.ceil((cols[0] + cols[1]) / 2);
        cols = [B, cols[1]];
      }
    }
    if (seats[seats.length - 1] === "L") {
      // console.log(cols[0]);
      return cols[0];
    } else if (seats[seats.length - 1] === "R") {
      // console.log(cols[1]);
      return cols[1];
    }
  }
});
