import { PrismaClient, User } from "@prisma/client"

console.log('process.env', process.env)

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_URL
		}
	}
})

export async function createUser(data: Omit<User, 'id'>): Promise<User> {
	const response = await prisma.user.create({ data })

	await prisma.$disconnect()

	return response
}

export async function checkUserCount(): Promise<number> {
	const response = await prisma.user.count({})

	return response
};
