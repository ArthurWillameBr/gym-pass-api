import { FastifyInstance } from "fastify";
import requests from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
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

  return { token };
}
