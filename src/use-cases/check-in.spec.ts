import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-chek-ins-repository";
import { CheckInUseCase } from "./check-in";

let CheckInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    CheckInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(CheckInsRepository);

    // criando um mocking
    vi.useFakeTimers()
  });

  // rezetando o mocking
  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    
    // garantir que os dois check-ins sejam feitos no mesmo dia
    vi.setSystemTime(new Date("2024, 0, 20 8, 0, 0"));

    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-id",
        userId: "user-id",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
