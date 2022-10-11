const fs = require("fs");

function readJsonFile(file) {
  let bufferData = fs.readFileSync(file);
  let stData = bufferData.toString();
  let data = JSON.parse(stData);
  return data;
}

module.exports = { readJsonFile };
