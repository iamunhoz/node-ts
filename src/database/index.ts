import { PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient()

export async function createUser(data: Omit<User, 'id'>): Promise<User> {
	const response = await prisma.user.create({ data })

	await prisma.$disconnect()

	return response
}
