import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyUserRole(roleToVerify: "ADMIN" | "USER") {
  return (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;
    if (role !== roleToVerify) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  };
}