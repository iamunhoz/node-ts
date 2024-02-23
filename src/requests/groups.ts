import { RequestHandler } from "express"
import { failResponse, successResponse } from "../api"
import HttpStatusCode from "../consts/HttpStatusCode"
import {
  createGroup,
  getGroups,
  queryAddMemberToGroup,
  queryGetGroupById,
  queryRemoveMemberFromGroup,
  removeGroup,
} from "../dbHandlers/groups"

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
  const { name } = req.body

  // @ts-ignore (descobrir depois qual o jutsu pra tipar req.user)
  const response = await createGroup({ userId: req.user.id, name })

  if ("erro" in response) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(failResponse({ apiBody: response.erro }))
    return
  }

  res.status(HttpStatusCode.OK).json(successResponse({ apiBody: response }))
}

export const getGroupById: RequestHandler = async (req, res) => {
  const { id } = req.body

  if (!id) {
    res.status(HttpStatusCode.BAD_REQUEST).send("missing id")
    return
  }

  const response = await queryGetGroupById({ id })

  if ("erro" in response) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(failResponse({ apiBody: response.erro }))
    return
  }

  res.status(HttpStatusCode.OK).json(successResponse({ apiBody: response }))
}

export const deleteGroupById: RequestHandler = async (req, res) => {
  const { id } = req.body

  if (!id) {
    res.status(HttpStatusCode.BAD_REQUEST).send("missing id")
    return
  }

  const response = await removeGroup({ id })

  if ("erro" in response) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(failResponse({ apiBody: response.erro }))
    return
  }

  res.status(HttpStatusCode.OK).json(successResponse({ apiBody: response }))
}

export const removeMemberFromGroup: RequestHandler = async (req, res) => {
  const { memberId, groupId } = req.body

  if (!memberId || !groupId) {
    res.status(HttpStatusCode.BAD_REQUEST).send("missing id")
    return
  }

  const response = await queryRemoveMemberFromGroup({ memberId, groupId })

  if ("erro" in response) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(failResponse({ apiBody: response.erro }))
    return
  }

  res.status(HttpStatusCode.OK).json(successResponse({ apiBody: response }))
}

export const addMemberToGroup: RequestHandler = async (req, res) => {
  const { memberId, groupId } = req.body

  if (!memberId || !groupId) {
    res.status(HttpStatusCode.BAD_REQUEST).send("missing id")
    return
  }

  const response = await queryAddMemberToGroup({ memberId, groupId })

  if ("erro" in response) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(failResponse({ apiBody: response.erro }))
    return
  }

  res.status(HttpStatusCode.OK).json(successResponse({ apiBody: response }))
}
