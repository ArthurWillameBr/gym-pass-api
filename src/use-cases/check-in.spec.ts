import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-chek-ins-repository";
import { CheckInUseCase } from "./check-in";

let CheckInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    CheckInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(CheckInsRepository);
  })


  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
     gymId: "gym-id",
     userId: "user-id",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
