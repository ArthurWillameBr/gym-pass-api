import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface getUserProfileUseCaseRequest {
  userId: string;
}

interface getUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: getUserProfileUseCaseRequest): Promise<getUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
        throw new ResourceNotFoundError()
    }

    return {
        user
    }
  }
}
