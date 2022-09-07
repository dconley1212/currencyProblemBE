const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "./public/data/uploads/" });

const server = express();
server.use(express.json());
server.use(cors());

/* As you can probably see I might have overcomplicated my code and maybe that ultimately
tripped me up. I tried to take the array full of strings from the text area and recursively
take each dataSet. Then save the important values to variables and get the maxProfit 
for each data set during each recursive call until it hit the end of the array.
My plan didn't work because I kept running into unforeseen problems with the data in my array.
For example the strings of numbers would have sparsed strings where the length was longer than
the number of values. That tripped me up for a while. Anyways I didn't get it to work.
*/

server.post("/textArea", (req, res, next) => {
  //   console.log(req.body.textArea);
  const { textArea } = req.body;
  const dataSets = {};

  let count = parseInt(textArea[0]);
  dataSetCount = 1;
  function separateData(textAreaArray, count) {
    if (textAreaArray.length === 0 || count === 0) {
      return;
    }
    console.log(textAreaArray.length);
    // console.log(textAreaArray);
    let denominationsAndPrices = textAreaArray[0];
    // console.log(denominationsAndPrices);
    let denominations = parseInt(denominationsAndPrices[0]);
    // console.log(denominations);

    let differentPrices = parseInt(denominationsAndPrices[2]);
    console.log(differentPrices);
    let notesQuantityString = textAreaArray[1];
    notesQuantityString += "1";
    console.log(notesQuantityString);
    let counterNote = 0;
    let counterDenomination = 0;
    let counterPrice = 2;
    let maxPrice = 0;
    let minPrice = 0;

    while (differentPrices > 0) {
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
    let nextSlice = parseInt(denominationsAndPrices[2]) + denominations;
    console.log(textAreaArray.slice(nextSlice));
    separateData(textAreaArray.slice(nextSlice), count--);
  }
  let firstSlice = textArea.slice(1);
  console.log(firstSlice);
  separateData(firstSlice, count);

  // console.log(dataSets);
  res.status(200);
});

server.post("/file", upload.single("uploaded_file"), (req, res, next) => {
  console.log(req.body);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "Something went wrong",
    message: err.mesage,
    stack: err.stack,
  });
});

module.exports = server;
