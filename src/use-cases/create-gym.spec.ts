import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let sut: CreateGymUseCase;
let gymsRepository: InMemoryGymsRepository;

describe("Gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should gym registration", async () => {
    const { gym } = await sut.execute({
      title: "Gym 1",
      description: "Gym 1 description",
      phone: "123456789",
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
