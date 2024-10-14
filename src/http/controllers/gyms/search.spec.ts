import requests from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search gyms (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to search a gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await requests(app.server)
      .post("/gyms")
      .send({
        title: "Academia do Zé",
        description: "Academia top",
        phone: "123456789",
        latitude: 0,
        longitude: 0,
      })
      .set("Authorization", `Bearer ${token}`);

    await requests(app.server)
      .post("/gyms")
      .send({
        title: "Academia do Chico",
        description: "Academia top",
        phone: "123456789",
        latitude: 0,
        longitude: 0,
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await requests(app.server)
      .get("/gyms/search")
      .send()
      .query({
        q: "Academia do Zé",
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