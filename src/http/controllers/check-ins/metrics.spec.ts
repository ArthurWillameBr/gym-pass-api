import requests from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Metrics (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get total count of check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow()

    const gyms = await prisma.gym.create({
      data: {
        title: "Gym 1",
        description: "Gym 1 description",
        phone: "123456789",
        latitude: -27.0610928,
        longitude: -49.5229501,
      },
    });

    const checkIns = await prisma.checkIn.createMany({
        data: [
            {
                gym_id: gyms.id,
                user_id: user.id,
            },
            {
                gym_id: gyms.id,
                user_id: user.id,
            }
        ]
    })

    const response = await requests(app.server)
      .get(`/check-ins/metrics`)
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(2)
  });
});