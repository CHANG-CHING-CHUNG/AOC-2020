var fs = require("fs");

fs.readFile("./day4.txt", "utf8", (err, data) => {
  let newStr = "";
  const newData = data
    .split("\n")
    .map((str) => {
      if (str === "\r") {
        str = ",";
      }
      return str;
    })
    .map((str) => {
      if (str.indexOf("\r")) {
        str = str.replace(/\r/g, " ");
      }
      return str;
    })
    .forEach((str) => {
      newStr += str;
    });

  let newSplitStr = newStr.split(",").map((str) => {
    let splitStr = str.split(" ");
    splitStr = splitStr.map((str) => {
      return str.split(":");
    });
    return splitStr;
  });
  const passport = [];
  for (let i = 0; i < newSplitStr.length; i++) {
    const obj = {};
    for (let k = 0; k < newSplitStr[i].length; k++) {
      if (newSplitStr[i][k].length > 1) {
        obj[newSplitStr[i][k][0]] = newSplitStr[i][k][1];
      }
    }
    passport.push(obj);
  }
  let count = 0;
  for (let i = 0; i < passport.length; i++) {
    if (checkRange(passport[i])) count++;
  }

  console.log(count);

  function isValid(passport) {
    let fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
    const hasFields = [];
    while (fields.length) {
      if (!(fields[0] in passport)) {
        hasFields.push(fields[0]);
      }
      fields.shift();
    }

    if (
      hasFields.length === 0 ||
      (hasFields.length === 1 && hasFields[0] === "cid")
    ) {
      return true;
    }
    return false;
  }

  function checkRange(passport) {
    if (!isValid(passport)) {
      return false;
    }
    let countValid = 0;
    const range = [
      [1920, 2002],
      [2010, 2020],
      [2020, 2030],
      [
        [150, 193],
        [59, 76],
      ],
      [7],
      [],
      [9],
    ];

    if (
      passport.byr.length === 4 &&
      Number(passport.byr) >= range[0][0] &&
      Number(passport.byr) <= range[0][1]
    ) {
      console.log("byr valid");
      countValid++;
    }
    if (
      passport.iyr.length === 4 &&
      Number(passport.iyr) >= range[1][0] &&
      Number(passport.iyr) <= range[1][1]
    ) {
      console.log("iyr valid");
      countValid++;
    }
    if (
      passport.eyr.length === 4 &&
      Number(passport.eyr) >= range[2][0] &&
      Number(passport.eyr) <= range[2][1]
    ) {
      console.log("eyr valid");
      countValid++;
    }
    if (
      passport.hgt.match(/cm|in/g) &&
      passport.hgt.match(/cm|in/g)[0] === "cm"
    ) {
      if (
        passport.hgt.match(/[0-9]{3}/g) &&
        passport.hgt.match(/[0-9]{3}/g)[0] >= range[3][0][0] &&
        passport.hgt.match(/[0-9]{3}/g)[0] <= range[3][0][1]
      ) {
        console.log("hgt valid");
        countValid++;
      }
    } else if (
      passport.hgt.match(/cm|in/g) &&
      passport.hgt.match(/cm|in/g)[0] === "in"
    ) {
      if (
        passport.hgt.match(/[0-9]{2}/g) &&
        passport.hgt.match(/[0-9]{2}/g)[0] >= range[3][1][0] &&
        passport.hgt.match(/[0-9]{2}/g)[0] <= range[3][1][1]
      ) {
        console.log("hgt valid");
        countValid++;
      }
    }
    if (passport.hcl[0] === "#" && passport.hcl.length === 7) {
      if (passport.hcl.substr(1).match(/[^a-f|0-9]/gi) == null) {
        console.log("hcl valid");
        countValid++;
      }
    }
    const eyeColor = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    let isEclValid = false;
    while (eyeColor.length) {
      if (passport.ecl === eyeColor.shift()) {
        isEclValid = true;
      }
    }
    if (isEclValid) {
      console.log("ecl valid");
      countValid++;
    }
    if (
      passport.pid.length === 9 &&
      passport.pid.match(/[0-9]/g).length === 9
    ) {
      console.log("pid valid");
      countValid++;
    }
    if (countValid === 7) return true;
    return false;
  }
});
