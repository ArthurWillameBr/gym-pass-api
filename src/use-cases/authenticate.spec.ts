import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

let sut: AuthenticateUseCase;
let UsersRepository: InMemoryUsersRepository;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    UsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(UsersRepository);
  })

  it("should be able to authenticate", async () => {
    await UsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be to authenticate with wrong email", async () => {
    expect(() => sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });

  it("should not be to authenticate with wrong password", async () => {
    await UsersRepository.create({
        name: "John Doe",
        email: "johndoe@example.com",
        password_hash: await hash("123456", 6),
      })

    expect(() => sut.execute({
        email: "johndoe@example.com",
        password: "654321",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });
});
