import requests from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby gyms (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to nearby a gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await requests(app.server)
      .post("/gyms")
      .send({
        title: "Academia do Zé",
        description: "Academia top",
        phone: "123456789",
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set("Authorization", `Bearer ${token}`);

    await requests(app.server)
      .post("/gyms")
      .send({
        title: "Academia do Chico",
        description: "Academia top",
        phone: "123456789",
        latitude: -27.0610928,
    longitude: -49.5229501
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await requests(app.server)
      .get("/gyms/nearby")
      .send()
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Academia do Zé",
      }),
    ]);
  });
});