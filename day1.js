const axios = require("axios");

var fs = require("fs");

fs.readFile("./day1.txt", "utf8", (err, data) => {
  const arr = data.replace(/[\r | \n]/g, ",").split(",,");
  let newArr = [];
  arr.forEach((n) => newArr.push(Number(n)));
  newArr = newArr.filter((n) => n != 0);
  for (let i = 0; i < newArr.length; i++) {
    for (let k = 1; k < newArr.length; k++) {
      for (let j = 2; j < newArr.length; j++) {
        if (newArr[i] + newArr[k] + newArr[j] === 2020) {
          console.log(
            `${newArr[i]} + ${newArr[k]} + ${newArr[j]} = ${
              newArr[i] + newArr[k] + newArr[j]
            }`
          );
          console.log(newArr[i] * newArr[k] * newArr[j]);
        }
      }
    }
  }
});
