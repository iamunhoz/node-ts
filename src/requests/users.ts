import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import { RequestHandler } from "express"
import jwt from "jsonwebtoken"
import {
  failResponse,
  handleQueryResponse,
  successResponse,
  validateQueryParams,
} from "../api"
import HttpStatusCode from "../consts/HttpStatusCode"
import {
  checkUserCount,
  createUser,
  getUserByEmail,
  getUsers,
  putUser,
  removeUser,
} from "../dbHandlers"

// todo
// criar user admin e rotinas relacionadas

export const getAllUsers: RequestHandler = async (req, res) => {
  const response = await getUsers()

  handleQueryResponse(response, res)
}

export const createNewUser: RequestHandler = async (req, res) => {
  const { name, password, email, role = "student", groupId } = req.body

  if (!name || !password || !email) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .send("name, email and/or password are missing")
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const response = await createUser({
    name,
    password: hashedPassword,
    email,
    role,
    groupId,
  })

  handleQueryResponse(response, res)
}

export const updateUser: RequestHandler = async (req, res) => {
  validateQueryParams<{ id: number }>(req, res, ["id"])

  const response = await putUser(req.body)

  handleQueryResponse(response, res)
}

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = validateQueryParams<{ id: number }>(req, res, ["id"])

  const response = await removeUser({ id: String(id) })

  handleQueryResponse(response, res)
}

export const loginUser: RequestHandler = async (req, res) => {
  /* const { email, password } = req.body

  if (!email || !password) {
    res.status(HttpStatusCode.BAD_REQUEST).send("email or password are missing")
    return
  } */

  const { email, password } = validateQueryParams<{
    email: string
    password: string
  }>(req, res, ["email", "password"])

  const response = await getUserByEmail({ email })

  if (!response) {
    res.status(HttpStatusCode.BAD_REQUEST).json(
      failResponse({
        apiBody: {
          foundUser: false,
        },
      })
    )

    return
  }

  if ("erro" in response) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(failResponse({ apiBody: response.erro }))
    return
  }
  try {
    const bcryptResponse = await bcrypt.compare(password, response.password)

    if (bcryptResponse) {
      const accessToken = generateAccessToken(response)
      const refreshToken = generateRefreshToken(response)

      res.status(HttpStatusCode.OK).json(
        successResponse({
          apiBody: {
            foundUser: true,
            accessToken,
            refreshToken,
          },
        })
      )
    } else {
      res.status(HttpStatusCode.BAD_REQUEST).json(
        failResponse({
          apiBody: {
            foundUser: false,
          },
        })
      )
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const countUsers: RequestHandler = async (req, res) => {
  const response = await checkUserCount()

  res.status(HttpStatusCode.OK).send(`user count: ${response}`)
}

function generateAccessToken(user: User) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" })
}

function generateRefreshToken(user: User) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(" ")[1]

  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)

    req.user = user
    next()
  })
}

const refreshTokens = []

export const refreshToken: RequestHandler = (req, res) => {
  const refreshToken = req.body.token

  if (!refreshToken) return res.sendStatus(HttpStatusCode.UNAUTHORIZED)
  if (!refreshTokens.includes(refreshToken))
    return res.sendStatus(HttpStatusCode.FORBIDDEN)

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, user: User) => {
      if (err) return res.sendStatus(HttpStatusCode.FORBIDDEN)

      const accessToken = generateAccessToken(user)

      res.json({ accessToken })
    }
  )
}
