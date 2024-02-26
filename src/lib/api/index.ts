import { PrismaClient } from "@prisma/client"
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime"
import { Request, Response } from "express"
import { host } from "../consts"
import HttpStatusCode from "../consts/HttpStatusCode"

export const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

type Args<T> = {
  apiBody: T
}

type ResponseBody<T> = {
  status: "sucesso" | "erro" | "cuidado"
  apiMessage: T
}

export function successResponse<T>(args: Args<T>): ResponseBody<T> {
  return {
    status: "sucesso",
    apiMessage: args.apiBody,
  }
}

export function failResponse<T>(args: Args<T>): ResponseBody<T> {
  return {
    status: "erro",
    apiMessage: args.apiBody,
  }
}

export type DBerror = {
  erro: string
}

export function validateQueryParams<T extends Object>(
  req: Request,
  res: Response,
  params: Array<keyof T>
) {
  const validatedBody = {} as T

  params.forEach((param) => {
    if (!req.body[param]) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .send(`missing param ${String(param)}`)
      return false
    } else {
      validatedBody[param] = req.body[param]
    }
  })

  return validatedBody as T
}

export function handleQueryResponse<T extends Object>(
  response: null | T | DBerror,
  res: Response
) {
  if (!response) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(failResponse({ apiBody: "no response" }))
    return
  }
  if ("erro" in response) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(failResponse({ apiBody: response.erro }))
    return
  }
  res.status(HttpStatusCode.OK).json(successResponse({ apiBody: response }))
}

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
