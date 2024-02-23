import { PrismaClientUnknownRequestError } from "@prisma/client/runtime"
import { prismaClient } from "../api"

export * from "./users"

export async function dbActionTemplate<T>(asyncAtion: () => Promise<T>) {
  try {
    const response = await asyncAtion()

    return response
  } catch (error) {
    console.log(
      "postgresql db returned the following error:",
      (error as PrismaClientUnknownRequestError).message
    )

    return {
      erro: (error as PrismaClientUnknownRequestError).message,
    }
  } finally {
    await prismaClient.$disconnect()
  }
}
