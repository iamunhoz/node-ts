import cors from "cors"
import express from "express"
import { host } from "./consts"
import { createNewGroup, getAllGroups } from "./requests/groups"
import {
  authenticateToken,
  countUsers,
  createNewUser,
  deleteUser,
  getAllUsers,
  loginUser,
  refreshToken,
  updateUser,
} from "./requests/users"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json(["user"])
})

// users
app.get("/user", authenticateToken, getAllUsers)
app.get("/user/count", authenticateToken, countUsers)
app.post("/user/", createNewUser)
app.delete("/user/", authenticateToken, deleteUser) // todo - não expor diretamente
app.put("/user/", authenticateToken, updateUser)
app.post("/user/login", loginUser)
app.post("/user/token", refreshToken)

// sentences
// app.get("/sentence", authenticateToken, getAllSentences)
// app.post("/sentence", authenticateToken, postSentence)
// app.get("/sentence/:id", authenticateToken, getSentenceById)
// app.delete("/sentence/:id", authenticateToken, deleteSentenceById)
// app.put("/sentence/:id", authenticateToken, putSentenceById)

// groups
app.get("/group", authenticateToken, getAllGroups)
app.post("/group", authenticateToken, createNewGroup)
// app.get("/group/:id", authenticateToken, getGroupById)
// app.delete("/group/:id", authenticateToken, deleteGroupById)
// app.put("/group/:id", authenticateToken, putGroupById) // add/remove/edit people here

app.listen(host.port, host.ip, () => {
  console.log(`Server listening on port ${host.port}`)
})
