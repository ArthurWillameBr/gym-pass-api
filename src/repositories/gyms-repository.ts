import { Gym, Prisma } from "@prisma/client";

export interface FindNearbyGymsParams {
    latitude: number
    longitude: number
}

export interface GymsRepository {
    findById: (id: string) => Promise<Gym | null>
    create: (data: Prisma.GymCreateInput) => Promise<Gym>
    searchMany: (query: string, page: number) => Promise<Gym[]>
    findManyNearby: (params: FindNearbyGymsParams) => Promise<Gym[]>
}