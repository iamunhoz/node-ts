import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
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
