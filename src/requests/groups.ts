import { RequestHandler } from "express"
import { failResponse, successResponse } from "../api"
import HttpStatusCode from "../consts/HttpStatusCode"
import { createGroup, getGroups } from "../dbHandlers/groups"

export const getAllGroups: RequestHandler = async (req, res) => {
  const response = await getGroups()

  if ("erro" in response) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(failResponse({ apiBody: response.erro }))
    return
  }

  res.status(HttpStatusCode.OK).json(successResponse({ apiBody: response }))
}

export const createNewGroup: RequestHandler = async (req, res) => {
  const { userId, name } = req.body

  const response = await createGroup({ userId, name })

  if ("erro" in response) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(failResponse({ apiBody: response.erro }))
    return
  }

  res.status(HttpStatusCode.OK).json(successResponse({ apiBody: response }))
}
