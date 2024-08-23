
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private CheckInsRepository: CheckInsRepository,
    private GymsRepository: GymsRepository
  ) {}



  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.GymsRepository.findById(gymId)

    if(!gym) {
      throw new ResourceNotFoundError()
    }

    // calculate distance between user and gym
    

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
