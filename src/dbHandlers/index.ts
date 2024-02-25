import { PrismaClientUnknownRequestError } from "@prisma/client/runtime"
import { prismaClient } from "../api"
import { host } from "../consts"
import HttpStatusCode from "../consts/HttpStatusCode"

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

export async function purgeAllTables(req, res) {
  try {
    if (host.port !== 3003) {
      res.status(HttpStatusCode.FORBIDDEN).send("Forbidden")
      throw new Error("only works in localhost")
    }
    await prismaClient.group.deleteMany({})
    await prismaClient.user.deleteMany({})
    await prismaClient.sentence.deleteMany({})
    await prismaClient.phrase.deleteMany({})

    res.send("done")
    // Repeat for all tables
    console.log("All rows deleted from all tables")
  } catch (error) {
    console.error("Error deleting rows:", error)
  } finally {
    await prismaClient.$disconnect()
  }
}
