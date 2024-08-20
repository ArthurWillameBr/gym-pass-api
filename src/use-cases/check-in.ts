
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/chek-ins-repository";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private CheckInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

    const checkInOnSameDate = await this.CheckInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDate) {
      throw new Error("User already checked in today")
    }

   const checkIn = await this.CheckInsRepository.create({
    gym_id: gymId,
    user_id: userId,
   })

    return {
      checkIn
    }
  }
}
