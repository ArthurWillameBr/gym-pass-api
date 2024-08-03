import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(UsersRepository);

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
    const UsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(UsersRepository);

    expect(() => sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  });

  it("should not be to authenticate with wrong password", async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(UsersRepository);

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
