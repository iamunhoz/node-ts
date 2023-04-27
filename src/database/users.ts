import { User } from "@prisma/client"
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { prismaClient } from '../api';

type DBerror = {
	erro: string;
}

export async function createUser(data: Omit<User, 'id'>): Promise<User | DBerror> {
	try {
		const response = await prismaClient.user.create({ data })
		return response
	} catch (error) {
		console.log(
			'postgresql db returned the following error:',
			(error as PrismaClientUnknownRequestError).message
		)

		return {
			erro: (error as PrismaClientUnknownRequestError).message
		}
	} finally {
		await prismaClient.$disconnect()
	}
}

export async function removeUser(data: { id: number }): Promise<User | DBerror> {
	try {
		const response = await prismaClient.user.delete({
			where: {
				id: data.id
			}
		})
		return response
	} catch (error) {
		console.log(
			'postgresql db returned the following error:',
			(error as PrismaClientUnknownRequestError).message
		)

		return {
			erro: (error as PrismaClientUnknownRequestError).message
		}
	} finally {
		await prismaClient.$disconnect()
	}
}

export async function putUser(data: Partial<User>): Promise<User | DBerror> {
	const { id, ...putUser } = data
	try {
		const response = await prismaClient.user.update({
			where: {
				id,
			},
			data: putUser,
		})

		return response
	} catch (error) {
		console.log(
			'postgresql db returned the following error:',
			(error as PrismaClientUnknownRequestError).message
		)

		return {
			erro: (error as PrismaClientUnknownRequestError).message
		}
	} finally {
		await prismaClient.$disconnect()
	}
}

export async function getUsers(): Promise<User[] | DBerror> {
	try {
		const response = await prismaClient.user.findMany()

		return response
	} catch (error) {
		console.log(
			'postgresql db returned the following error:',
			(error as PrismaClientUnknownRequestError).message
		)

		return {
			erro: (error as PrismaClientUnknownRequestError).message
		}
	}
}


export async function getUserByEmail(data: { email: string }) {
	const { email }	= data;
	try {
		const response = await prismaClient.user.findUnique({ where: { email }})

		return response
	} catch (error) {
		console.log(
			'postgresql db returned the following error:',
			(error as PrismaClientUnknownRequestError).message
		)

		return {
			erro: (error as PrismaClientUnknownRequestError).message
		}
	}

}

export async function checkUserCount(): Promise<number> {
	const response = await prismaClient.user.count({})

	return response
};
