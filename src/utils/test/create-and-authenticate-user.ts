import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import requests from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
 await prisma.user.create({
    data: {
      name: "John Doe",
      email: "jhondoe@gmail.com",
      password_hash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    }
  })

  const authResponse = await requests(app.server).post("/sessions").send({
    email: "jhondoe@gmail.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
