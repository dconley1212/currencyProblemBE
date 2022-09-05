const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

server.post("/price/difference", (req, res, next) => {
  console.log(req.body.textArea);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "Something went wrong",
    message: err.mesage,
    stack: err.stack,
  });
});

module.exports = server;
