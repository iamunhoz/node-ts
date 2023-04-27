import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUsers, createUser, checkUserCount, removeUser, putUser, getUserByEmail } from '../database';
import { failResponse, successResponse } from '../api';
import { User } from '@prisma/client';
import HttpStatusCode from '../consts/HttpStatusCode';

// todo
// criar user admin e rotinas relacionadas

export const getAllUsers: RequestHandler = async (req, res) => {
	const response = await getUsers();

	if ('erro' in response) {
		res.status(HttpStatusCode.BAD_REQUEST).json(failResponse({ apiBody: response.erro }))
		return;
	}

	res.status(HttpStatusCode.OK).json(successResponse({ apiBody: response }))
}

export const createNewUser: RequestHandler = async (req, res) => {
	const { name, password, email } = req.body

	if (!name || !password || !email) {
		res.status(HttpStatusCode.BAD_REQUEST).send('name, email and/or password are missing')
		return;
	}

	const hashedPassword = await bcrypt.hash(password, 10)

	const response = await createUser({
		name,
		password: hashedPassword,
		email
	})

	if ('erro' in response) {
		res.status(HttpStatusCode.BAD_REQUEST).json(failResponse({ apiBody: response.erro }))
		return;
	}

	res.status(HttpStatusCode.OK).json(successResponse({ apiBody: response }))
}

export const updateUser: RequestHandler =async (req, res) => {
  if (!req.body.id) {
		res.status(HttpStatusCode.BAD_REQUEST).send('user id missing')
		return;
	}

  const response = await putUser(req.body)

  if ('erro' in response) {
		res.status(HttpStatusCode.BAD_REQUEST).json(failResponse({ apiBody: response.erro }))
		return;
	}

	res.status(HttpStatusCode.OK).json(successResponse({ apiBody: response }))
}

export const deleteUser: RequestHandler = async (req, res) => {
	const { id } = req.body

	if (!id) {
		res.status(HttpStatusCode.BAD_REQUEST).send('user id missing')
		return;
	}

	const response = await removeUser({ id })

	if ('erro' in response) {
		res.status(HttpStatusCode.BAD_REQUEST).json(failResponse({ apiBody: response.erro }))
		return;
	}

	res.status(HttpStatusCode.OK).json(successResponse({ apiBody: response }))
}

export const loginUser: RequestHandler = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		res.status(HttpStatusCode.BAD_REQUEST).send('email or password are missing')
		return;
	}

	const response = await getUserByEmail({ email })

	if (!response) {
		res.status(HttpStatusCode.BAD_REQUEST).json(failResponse({
			apiBody: {
				foundUser: false
			}
		}))

		return
	}

	if ('erro' in response) {
		res.status(HttpStatusCode.BAD_REQUEST).json(failResponse({ apiBody: response.erro }))
		return;
	}
	try {
		if (await bcrypt.compare(password, response.password)) {
			const accessToken = generateAccessToken(response)
			const refreshToken = generateRefreshToken(response)

			res.status(HttpStatusCode.OK).json(successResponse({
				apiBody: {
					foundUser: true,
					accessToken,
					refreshToken
				}
			}))
		} else {
			res.status(HttpStatusCode.BAD_REQUEST).json(failResponse({
				apiBody: {
					foundUser: false
				}
			}))
		}
	} catch (error) {
		res.status(500).json(error)
	}

}

export const countUsers: RequestHandler = async (req, res) => {
	const response = await checkUserCount();

	res.status(HttpStatusCode.OK).send(`user count: ${response}`)
}

function generateAccessToken(user: User) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' })
}

function generateRefreshToken(user: User) {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

export function authenticateToken (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403)

		req.user = user
		next()
	})
}

let refreshTokens = [];

export const refreshToken: RequestHandler = (req, res) => {
	const refreshToken = req.body.token;

	if (!refreshToken) return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(HttpStatusCode.FORBIDDEN);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user: User) => {
		if (err) return res.sendStatus(HttpStatusCode.FORBIDDEN)

		const accessToken = generateAccessToken(user)

		res.json({ accessToken })
	})
}