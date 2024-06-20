import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface registerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
    constructor(private usersRepository: any) {}

  async execute({ email, name, password }: registerUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithEmail) {
      throw new Error("Email already exists");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
