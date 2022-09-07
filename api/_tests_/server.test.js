const server = require("../server");
const request = require("supertest");

//Added a couple of tests to see if I was getting a 200 response when pinging the api

describe("[POST] tests", () => {
  test("[POST] /textArea returns a 200 ok status"),
    async () => {
      const response = await request(server).post("/textArea");
      expect(response).toBe(200);
    };
  test("[POST] /file returns a 200 ok status "),
    async () => {
      const response = await request(server).post("/file");
      expect(response).toBe(200);
    };
});
