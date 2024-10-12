import requests from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await requests(app.server).post("/users").send({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "123456",
      });

    const response = await requests(app.server).post("/sessions").send({
        email: "johndoe@gmail.com",
        password: "123456",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
        token: expect.any(String),
    });
  });
});