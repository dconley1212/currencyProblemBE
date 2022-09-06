const server = require("../server");
const request = require("supertest");

describe("[POST] /price/difference tests", () => {
  test("should return a 200 ok status"),
    async () => {
      const response = await request(server).post("/price/difference");
    };
});
