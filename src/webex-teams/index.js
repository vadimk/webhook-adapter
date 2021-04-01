const fs = require("fs")
const path = require("path")
const fetch = require("node-fetch")
const proxy = require("https-proxy-agent")

const PROXY_URL = process.env.PROXY_URL || null
const WEBHOOK_URL = "https://api.ciscospark.com/v1/webhooks/incoming/:key"

const send = (req, res, event) => {
  const { key } = req.params
  const url = WEBHOOK_URL.replace(":key", key)

  fetch(url, {
    agent: PROXY_URL ? new proxy(PROXY_URL) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "markdown": getMessage(event),
    }),
    method: "POST",
  })
    .then(response => response.text())
    .then(data => res.send(data))
    .catch(err => console.log(err));
}

const getMessage = (event) => {
  try {
    const fileBuffer = fs.readFileSync(path.resolve( __dirname, "TEMPLATE.md"))
    let template = fileBuffer.toString()

    for (const field in event) {
      template = template.replace("{" + field + "}", event[field])
    }

    return template
  } catch (e) {
    console.error("Template file not found")
  }
}


module.exports = {
  send,
  getMessage,
}
