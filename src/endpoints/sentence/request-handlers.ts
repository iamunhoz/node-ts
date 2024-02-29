import { RequestHandler } from "express"
import { handleQueryResponse, validateQueryParams } from "../../lib/api"
import { queryGetSentences, queryPostSentence } from "./db-handlers"
import { PlainSentence, plainSentence } from "./sentence-examples"

const IS_TEST = false

export const createSentence: RequestHandler = async (req, res) => {
  let validatedSentence = validateQueryParams<PlainSentence>(req, res, [
    "id",
    "phrases",
  ])
  if (IS_TEST) {
    validatedSentence = plainSentence
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
