const express = require("express");
const cors = require("cors");
const { request } = require("express");

const server = express();
server.use(express.json());
server.use(cors());

server.post("/price/difference", (req, res, next) => {
  console.log(req.body.textArea);
  let count = req.body.textArea[0].parseInt();
  if (request.body.testArea) {
    let maxValue = 0;
    let minValue = 0;
    const dataSets = {};

    function separateData(textAreaArray, count) {
      if (textAreaArray.length === 0 || count === 0) {
        return;
      }

      const denominations = textAreaArray[0][0].parseInt();
      const differentPrices = textAreaArray[0][1].parseInt();
      const notesQuantityString = textAreaArray[1];
      let counter = 0;

      while (differentPrices !== 0 && denominations !== counter) {
        const value = notesQuantityString[counter].parseInt();

        if (value) {
        }
      }
    }
  }
  res.status(200);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "Something went wrong",
    message: err.mesage,
    stack: err.stack,
  });
});

module.exports = server;
