import { Group } from "@prisma/client"
import { dbActionTemplate } from "."
import { DBerror, prismaClient } from "../api"

export async function createGroup(dto: {
  userId: string
  name: string
}): Promise<Group | DBerror> {
  return dbActionTemplate(() =>
    prismaClient.group.create({
      data: {
        name: dto.name,
        members: {
          connect: {
            id: dto.userId,
          },
        },
      },
      include: {
        members: true,
      },
    })
  )
}

export async function removeGroup(data: {
  id: number
}): Promise<Group | DBerror> {
  return dbActionTemplate(() =>
    prismaClient.group.delete({
      where: {
        id: data.id,
      },
    })
  )
}

export async function putGroup(data: Partial<Group>): Promise<Group | DBerror> {
  const { id, ...putGroup } = data
  return dbActionTemplate(() =>
    prismaClient.group.update({
      where: {
        id,
      },
      data: putGroup,
    })
  )
}

export async function getGroups(): Promise<Group[] | DBerror> {
  return dbActionTemplate(() =>
    prismaClient.group.findMany({ include: { members: {} } })
  )
}

export async function checkGroupCount(): Promise<number | DBerror> {
  return dbActionTemplate(() => prismaClient.group.count({}))
}

export async function queryRemoveMemberFromGroup({
  memberId,
  groupId,
}: {
  memberId: number
  groupId: number
}) {
  return dbActionTemplate(() =>
    prismaClient.group.update({
      where: {
        id: groupId,
      },
      data: {
        members: {
          disconnect: [{ id: memberId.toString() }],
        },
      },
    })
  )
}

export async function queryAddMemberToGroup({
  memberId,
  groupId,
}: {
  memberId: number
  groupId: number
}) {
  return dbActionTemplate(() =>
    prismaClient.group.update({
      where: {
        id: groupId,
      },
      data: {
        members: {
          connect: [{ id: memberId.toString() }],
        },
      },
    })
  )
}
