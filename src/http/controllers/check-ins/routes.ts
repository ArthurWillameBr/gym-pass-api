import { VerifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { validate } from "./validate";
import { metrics } from "./metrics";
import { history } from "./history";

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", VerifyJWT)
    
    app.post("/check-ins/:gymId/check-ins", create)
    app.patch("/check-ins/:checkInId/validate", validate)
    app.get("/check-ins/metrics", metrics)
    app.get("/check-ins/history", history)

}