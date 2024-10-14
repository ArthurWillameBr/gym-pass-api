import requests from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await requests(app.server)
      .post("/gyms")
      .send({
        title: "Academia do Zé",
        description: "Academia top",
        phone: "123456789",
        latitude: 0,
        longitude: 0,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(201);
  });
});
