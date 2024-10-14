import requests from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create gym", async () => {
    await requests(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const authResponse = await requests(app.server).post("/sessions").send({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const createGymResponse = await requests(app.server)
      .post("/gyms").send({
        title: "Academia do Zé",
        description: "Academia top",
        phone: "123456789",
        latitude: 0,
        longitude: 0,
      })
      .set("Authorization", `Bearer ${token}`)

    expect(createGymResponse.statusCode).toEqual(201);
  });
});