import { RequestHandler } from 'express';
import { getUsers, createUser, checkUserCount, removeUser, putUser } from '../database';
import { failResponse, successResponse } from '../api';

export const getAllUsers: RequestHandler = async (req, res) => {
	const response = await getUsers();

	if ('erro' in response) {
		res.status(400).json(failResponse({ apiBody: response.erro }))
		return;
	}

	res.status(200).json(successResponse({ apiBody: response }))
}

export const createNewUser: RequestHandler = async (req, res) => {
	const { name, password, email } = req.body

	if (!name || !password || !email) {
		res.status(400).send('name, email and/or password are missing')
		return;
	}

	const response = await createUser({ name, password, email })

	if ('erro' in response) {
		res.status(400).json(failResponse({ apiBody: response.erro }))
		return;
	}

	res.status(200).json(successResponse({ apiBody: response }))
}

export const updateUser: RequestHandler =async (req, res) => {
  if (!req.body.id) {
		res.status(400).send('user id missing')
		return;
	}

  const response = await putUser(req.body)

  if ('erro' in response) {
		res.status(400).json(failResponse({ apiBody: response.erro }))
		return;
	}

	res.status(200).json(successResponse({ apiBody: response }))
}

export const deleteUser: RequestHandler = async (req, res) => {
	const { id } = req.body

	if (!id) {
		res.status(400).send('user id missing')
		return;
	}

	const response = await removeUser({ id })

	if ('erro' in response) {
		res.status(400).json(failResponse({ apiBody: response.erro }))
		return;
	}

	res.status(200).json(successResponse({ apiBody: response }))
}

export const countUsers: RequestHandler = async (req, res) => {
	const response = await checkUserCount();

	res.status(200).send(`user count: ${response}`)
}