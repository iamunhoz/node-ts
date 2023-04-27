import { host } from "./consts"
import cors from "cors"
import express from "express"
import { checkUserCount, createUser } from './database';
import { failResponse, successResponse } from './utils';

const app = express()
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
	res.json(['create-new-user', 'check-user-count'])
})

app.post("/create-new-user/", async (req, res) => {
	const { name, password, email } = req.body

	if (!name || !password || !email) {
		res.status(400).send('name, email and/or password are missing')
		return;
	}

	const response = await createUser({ name, password, email })

	if ('erro' in response) {
		res.status(400).json(failResponse({ apiBody: response.erro }))
	}

	res.status(200).json(successResponse({ apiBody: response }))
})

app.get('/check-user-count/', async (req, res) => {
	const response = await checkUserCount();

	res.status(200).send(`user count: ${response}`)
})

app.listen(host.port, host.ip, () => {
	console.log(`Server listening on port ${host.port}`)
})
