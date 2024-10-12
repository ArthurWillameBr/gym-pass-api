import { Environment } from "vitest"

export default <Environment>{
    name: "prisma",
    transformMode: 'web',
    async setup() {
        console.log("Setup")

        return {
            teardown() {
                console.log("Teardown")
            },
        }
    }
}