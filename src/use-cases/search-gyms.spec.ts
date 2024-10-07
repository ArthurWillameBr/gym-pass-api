import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

let checkInsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach( async () => {
    checkInsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(checkInsRepository);
    })
    
  it("should be able to search for gyms", async () => {
    await checkInsRepository.create({
        title: "JavaScript gym",
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401092        
    })
    await checkInsRepository.create({
        title: "TypeScript gym",
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401092
    })
    const { gyms } = await sut.execute({
      query: "JavaScript gym",
      page: 1
    });

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
       expect.objectContaining({ title: "JavaScript gym" }),
    ])
  });

  it("should be able to fetch paginated gyms search", async () => {

    for (let i = 1; i <= 22; i++) {
        await checkInsRepository.create({
            title: `JavaScript gym ${i}`,
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401092        
        })
    }
    
    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 2
    });

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
       expect.objectContaining({ title: "JavaScript gym 21" }),
       expect.objectContaining({ title: "JavaScript gym 22" })
    ])
  });
})