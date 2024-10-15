import requests from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create check-in (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gyms = await prisma.gym.create({
      data: {
        title: "Gym 1",
        description: "Gym 1 description",
        phone: "123456789",
        latitude: -27.0610928,
        longitude: -49.5229501,
      },
    });

    const response = await requests(app.server)
      .post(`/gyms/${gyms.id}/check-ins`)
      .send({
        latitude: -27.0610928,
        longitude: -49.5229501,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(201);
  });
});