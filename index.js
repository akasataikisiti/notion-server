const express = require("express")
const app = express()
const PORT = 6001

app.get("/", (req, res) => {
  res.send("Hello Express")
})

app.listen(PORT, () => {
  console.log("サーバー起動中" + PORT)
})
