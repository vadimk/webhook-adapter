const express = require("express")
const webexTeams = require("./webex-teams/")
const EVENT_SAMPLE = require("./sample")

const app = express()
const { PORT } = process.env || 2015

app.use(express.json()) // for parsing application/json

app.get("/", (req, res) => res.send("Hello World!"))
app.get("/webex-teams/:key", (req, res) => res.send(`You should use POST method to send event forward. Hash: ${req.params.key}.`))
app.post("/webex-teams/:key", (req, res) => webexTeams.send(req, res, req.body.event))
app.all("/webex-teams/:key/test", (req, res) => webexTeams.send(req, res, EVENT_SAMPLE))

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
