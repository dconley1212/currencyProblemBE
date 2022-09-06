const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

server.post("/price/difference", (req, res, next) => {
  const { file, textArea } = req.body;

  //   console.log(req.body.textArea);
  const dataSets = {};
  //   if (req.body.textArea.length > 0) {
  let count = parseInt(textArea[0]);
  dataSetCount = 1;
  function separateData(textAreaArray, count) {
    if (textAreaArray.length === 0 || count === 0) {
      return;
    }
    // console.log(textAreaArray);
    let denominationsAndPrices = textAreaArray[0];
    // console.log(denominationsAndPrices);
    let denominations = parseInt(denominationsAndPrices[0]);
    // console.log(denominations);
    let differentPrices = parseInt(denominationsAndPrices[2]);
    console.log(differentPrices);
    let notesQuantityString = textAreaArray[2];
    notesQuantityString += "1";
    // console.log(notesQuantityString);
    let counterNote = 0;
    let counterDenomination = 0;
    let counterPrice = 2;
    let maxPrice = 0;
    let minPrice = 0;

    while (differentPrices !== 0) {
      const value =
        parseInt(notesQuantityString[counterNote]) *
        parseInt(textAreaArray[counterPrice][counterDenomination]);
      maxPrice = Math.max(maxPrice, value);
      minPrice = Math.min(minPrice, value);
      counterNote++;
      counterDenomination++;
      if (counterDenomination === denominations) {
        counterNote = 0;
        counterDenomination = 0;
        counterPrice++;
        // console.log(differentPrices);
        differentPrices--;
      }
    }
    dataSets[`Data Set ${dataSetCount}`] = maxPrice - minPrice;
    dataSetCount++;
    console.log(textAreaArray.slice(counterPrice + 1));
    separateData(textAreaArray.slice(counterPrice), count--);
  }
  let firstSlice = textArea.slice(1);
  console.log(firstSlice);
  separateData(firstSlice, count);
  // }
  // console.log(dataSets);
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
