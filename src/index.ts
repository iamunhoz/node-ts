import { host } from "./consts"
import cors from "cors"
import express from "express"
import { countUsers, createNewUser, deleteUser, getAllUsers, updateUser } from './requests/users';

const app = express()
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
	res.json(['users','create-new-user', 'check-user-count'])
})

app.get("/users", getAllUsers)
app.get('/check-user-count/', countUsers)
app.post("/create-new-user/", createNewUser)
app.delete("/delete-user/", deleteUser)
app.put("/update-user/", updateUser)


app.listen(host.port, host.ip, () => {
	console.log(`Server listening on port ${host.port}`)
})
