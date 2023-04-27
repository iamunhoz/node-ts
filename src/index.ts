import { host } from "./consts"
import cors from "cors"
import express from "express"
import {
	countUsers,
	createNewUser,
	deleteUser,
	getAllUsers,
	updateUser,
	loginUser,
	authenticateToken,
	refreshToken
} from './requests/users';

const app = express()
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
	res.json(['user'])
})

app.get("/user", authenticateToken, getAllUsers)
app.get('/user/count', authenticateToken, countUsers)
app.post("/user/", createNewUser)

// todo - não expor diretamente
app.delete("/user/", authenticateToken, deleteUser)
app.put("/user/", authenticateToken, updateUser)
app.post("/user/login", loginUser)
app.post("/user/token", refreshToken)


app.listen(host.port, host.ip, () => {
	console.log(`Server listening on port ${host.port}`)
})
