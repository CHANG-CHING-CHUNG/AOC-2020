const axios = require("axios");

var fs = require("fs");

fs.readFile("./day3.txt", "utf8", (err, data) => {
  data = data.split("\n");
  let organizedData = data.map((row) => {
    row = row.replace(/\r/g, "");
    return row;
  });
  organizedData = organizedData.slice(0, organizedData.length - 1);
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  let ans = 1;

  for (let s of slopes) {
    ans *= cal(s[0], s[1]);
  }
  console.log("ans", ans);
  function cal(dx, dy) {
    let cy = 0;
    let cx = 0;
    let count = 0;
    while (cy < organizedData.length) {
      if (organizedData[cy][cx] === "#") count++;
      cy += dy;
      cx += dx;
      if (cx >= organizedData[0].length) {
        cx -= organizedData[0].length;
      }
    }
    return count;
  }
});
