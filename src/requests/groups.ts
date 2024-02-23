import { RequestHandler } from "express"
import { handleQueryResponse, validateQueryParams } from "../api"
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

  handleQueryResponse(response, res)
}

export const createNewGroup: RequestHandler = async (req, res) => {
  const { name } = req.body

  // @ts-ignore (descobrir depois qual o jutsu pra tipar req.user)
  const response = await createGroup({ userId: req.user.id, name })

  handleQueryResponse(response, res)
}

export const getGroupById: RequestHandler = async (req, res) => {
  const { id } = validateQueryParams<{ id: number }>(req, res, ["id"])

  const response = await queryGetGroupById({ id })

  handleQueryResponse(response, res)
}

export const deleteGroupById: RequestHandler = async (req, res) => {
  const { id } = validateQueryParams<{ id: number }>(req, res, ["id"])

  const response = await removeGroup({ id })

  handleQueryResponse(response, res)
}

export const removeMemberFromGroup: RequestHandler = async (req, res) => {
  const { memberId, groupId } = validateQueryParams<{
    memberId: number
    groupId: number
  }>(req, res, ["groupId", "memberId"])

  const response = await queryRemoveMemberFromGroup({ memberId, groupId })

  handleQueryResponse(response, res)
}

export const addMemberToGroup: RequestHandler = async (req, res) => {
  const { memberId, groupId } = validateQueryParams<{
    memberId: number
    groupId: number
  }>(req, res, ["groupId", "memberId"])

  const response = await queryAddMemberToGroup({ memberId, groupId })

  handleQueryResponse(response, res)
}
