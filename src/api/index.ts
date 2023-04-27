import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_URL
		}
	}
})

type Args<T> = {
  apiBody: T;
}

type ResponseBody<T> = {
  status: 'sucesso' | 'erro' | 'cuidado';
  apiMessage: T
}

export function successResponse<T>(args: Args<T>):ResponseBody<T> {
  return {
    status: 'sucesso',
    apiMessage: args.apiBody
  }
}

export function failResponse<T>(args: Args<T>):ResponseBody<T> {
  return {
    status: 'erro',
    apiMessage: args.apiBody
  }
}