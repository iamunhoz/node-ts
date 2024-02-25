import { Sentence } from "@prisma/client"
import { DBerror, prismaClient } from "../../api"
import { dbActionTemplate } from "../../dbHandlers"
import { PlainSentence } from "./sentence-examples"

// TODO criar failsafe em caso as ids geradas no front já existam (mto raro)
export async function queryPostSentence(
  dto: PlainSentence & { userId: string }
): Promise<Sentence | DBerror> {
  return dbActionTemplate(() =>
    prismaClient.sentence.create({
      data: {
        id: dto.id,
        phrases: {
          createMany: {
            data: dto.phrases,
          },
        },
        user: {
          connect: { id: dto.userId },
        },
      },
    })
  )
}

export async function queryGetSentences(req): Promise<Sentence[] | DBerror> {
  console.log("req.user.id", req.user.id)
  return dbActionTemplate(() =>
    prismaClient.sentence.findMany({
      where: {
        user: {
          id: req.user.id,
        },
      },
      include: {
        phrases: true,
      },
    })
  )
}
