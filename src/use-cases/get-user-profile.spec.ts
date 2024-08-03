import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let sut: GetUserProfileUseCase;
let UsersRepository: InMemoryUsersRepository;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    UsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(UsersRepository);
  })

  it("should be able to get user profile", async () => {
   const createdUser = await UsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    });

    expect(user.name).toEqual("John Doe");
  });

  it("should not be to get user profile with wrong id ", async () => {
    expect(() => sut.execute({
       userId: "non-existing-id"
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  });

});
