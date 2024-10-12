import requests from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
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

    const profileResponse = await requests(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(expect.objectContaining({
        email: "johndoe@gmail.com"
    }))
  });
});