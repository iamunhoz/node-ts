import cors from "cors"
import express from "express"
import { purgeAllTables } from "./lib/api"
import { host } from "./lib/consts"

import {
  addMemberToGroup,
  createNewGroup,
  deleteGroupById,
  getAllGroups,
  getGroupById,
  removeMemberFromGroup,
} from "./endpoints/groups/request-handlers"

import {
  createSentence,
  getAllSentencesOfLoggedUser,
} from "./endpoints/sentence/request-handlers"

import {
  authenticateToken,
  countUsers,
  createNewUser,
  deleteUser,
  getAllUsers,
  loginUser,
  refreshToken,
  updateUser,
} from "./endpoints/users/request-handlers"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json(["user"])
})

// users
app.get("/user", authenticateToken, getAllUsers)
app.get("/user/count", authenticateToken, countUsers)
app.post("/user/signup", createNewUser)
app.delete("/user/", authenticateToken, deleteUser) // todo - não expor diretamente
app.put("/user/", authenticateToken, updateUser)
app.post("/user/login", loginUser)
app.post("/user/token", refreshToken)

app.get("/sentence", authenticateToken, getAllSentencesOfLoggedUser)
app.post("/sentence", authenticateToken, createSentence)
// app.get("/sentence/:id", authenticateToken, getSentenceById)
// app.delete("/sentence/:id", authenticateToken, deleteSentenceById)
// app.put("/sentence/:id", authenticateToken, putSentenceById)

// groups
app.get("/group", authenticateToken, getAllGroups)
app.post("/group", authenticateToken, createNewGroup)
app.delete("/group", authenticateToken, deleteGroupById)
app.get("/group/id", authenticateToken, getGroupById)
app.delete("/group/member", authenticateToken, removeMemberFromGroup)
app.post("/group/member", authenticateToken, addMemberToGroup)

app.delete("/management/purge-tables", purgeAllTables)

app.listen(host.port, host.ip, () => {
  console.log(`Server listening on port ${host.port}`)
})
