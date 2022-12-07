const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
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

server.post("/textArea", (req, res, next) => {});

server.post("/file", upload.single("uploaded_file"), (req, res, next) => {
  try {
    async function readFile(file) {
      const data = await fs.readFile(file.path, "utf8", file);
      console.log(data.toString());
    }
    readFile(req.file);
  } catch (error) {
    console.log(error);
  }
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "Something went wrong",
    message: err.mesage,
    stack: err.stack,
  });
});

module.exports = server;
