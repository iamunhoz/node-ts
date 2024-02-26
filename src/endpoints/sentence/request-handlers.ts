import { RequestHandler } from "express"
import { handleQueryResponse, validateQueryParams } from "../../lib/api"
import { queryGetSentences, queryPostSentence } from "./db-handlers"
import { PlainSentence, plainSentence } from "./sentence-examples"

const isTest = true

export const createSentence: RequestHandler = async (req, res) => {
  let validatedSentence = plainSentence
  if (!isTest) {
    validatedSentence = validateQueryParams<PlainSentence>(req, res, [
      "id",
      "phrases",
    ])
  }

  const response = await queryPostSentence({
    ...validatedSentence,
    // @ts-ignore
    userId: req.user.id,
  })

  handleQueryResponse(response, res)
}

export const getAllSentencesOfLoggedUser: RequestHandler = async (req, res) => {
  const response = await queryGetSentences(req)

  handleQueryResponse(response, res)
}
