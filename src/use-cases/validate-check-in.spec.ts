import { expect, describe, it, beforeEach, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    // criando um mocking
    // vi.useFakeTimers();
  });

  // rezetando o mocking
  afterEach(() => {
    // vi.useRealTimers();
  });

  it("should be able to validate the check-in", async () => {
    const CreatedCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: CreatedCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "check-in-01",
      })
    ).rejects.toThrowError(ResourceNotFoundError);
  });
});
