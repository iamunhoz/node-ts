import { User } from "@prisma/client"
import { dbActionTemplate } from "."
import { prismaClient } from "../api"

type DBerror = {
  erro: string
}

export async function createUser(
  data: Omit<User, "id">
): Promise<User | DBerror> {
  return dbActionTemplate(() => prismaClient.user.create({ data }))
}

export async function removeUser(data: {
  id: string
}): Promise<User | DBerror> {
  return dbActionTemplate(() =>
    prismaClient.user.delete({
      where: {
        id: data.id,
      },
    })
  )
}

export async function putUser(data: Partial<User>): Promise<User | DBerror> {
  const { id, ...putUser } = data
  return dbActionTemplate(() =>
    prismaClient.user.update({
      where: {
        id,
      },
      data: putUser,
    })
  )
}

export async function getUsers(): Promise<User[] | DBerror> {
  return dbActionTemplate(prismaClient.user.findMany)
}

export async function getUserByEmail(data: { email: string }) {
  const { email } = data
  return dbActionTemplate(() =>
    prismaClient.user.findUnique({ where: { email } })
  )
}

export async function checkUserCount(): Promise<number | DBerror> {
  return dbActionTemplate(() => prismaClient.user.count({}))
}
