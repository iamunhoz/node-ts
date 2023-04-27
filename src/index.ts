import { host } from "./consts"
import cors from "cors"
import express from "express"
import { checkUserCount, createUser } from './database';

const app = express()

app.use(cors())

app.get("/", (req, res) => {
	res.json(['create-new-user', 'check-user-count'])
})

app.get("/create-new-user/", async (req, res) => {
	const { name, password } = req.query as { name: string; password: string }

	if (!name || !password) {
		res.status(400).send('name and/or password are missing')
		return;
	}

	const response = await createUser({ name, password })

	res.status(200).json(response)
})

app.get('/check-user-count/', async (req, res) => {
	const response = await checkUserCount();

	res.status(200).send(`user count: ${response}`)
})

app.listen(host.port, host.ip, () => {
	console.log(`Server listening on port ${host.port}`)
})
