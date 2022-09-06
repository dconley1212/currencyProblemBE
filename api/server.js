const express = require("express");
const cors = require("cors");
const { request } = require("express");

const server = express();
server.use(express.json());
server.use(cors());

server.post("/price/difference", (req, res, next) => {
  console.log(req.body.textArea);

  if (request.body.testArea) {
    const dataSets = {};
    let count = req.body.textArea[0].parseInt();
    dataSetCount = 1;
    function separateData(textAreaArray, count) {
      if (textAreaArray.length === 0 || count === 0) {
        return;
      }

      const denominations = textAreaArray[0][0].parseInt();
      const differentPrices = textAreaArray[0][1].parseInt();
      const notesQuantityString = textAreaArray[1];
      notesQuantityString += "1";
      let counterNote = 0;
      let counterDenomination = 0;
      let counterPrice = 2;
      let maxPrice = 0;
      let minPrice = 0;

      while (differentPrices !== 0) {
        const value =
          notesQuantityString[counterNote].parseInt() *
          textAreaArray[counterPrice][counterDenomination].parseInt();
        maxPrice = Math.max(maxPrice, value);
        minPrice = Math.min(minPrice, value);
        counterNote++;
        counterDenomination++;
        if (counterDenomination === denominations) {
          counterNote = 0;
          counterDenomination = 0;
          counterPrice++;
          differentPrices--;
        }
      }
      dataSets[`Data Set ${dataSetCount}`] = maxPrice - minPrice;
      dataSetCount++;
      separateData(textAreaArray.slice(5), count--);
    }
    const firstSlice = req.body.area.slice(1);

    separateData(firstSlice, count);
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
