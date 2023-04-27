import { PrismaClient, User } from "@prisma/client"
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_URL
		}
	}
})

type DBerror = {
	erro: string;
}

export async function createUser(data: Omit<User, 'id'>): Promise<User | DBerror> {
	try {
		const response = await prisma.user.create({ data })
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
		await prisma.$disconnect()
	}
}

export async function checkUserCount(): Promise<number> {
	const response = await prisma.user.count({})

	return response
};
