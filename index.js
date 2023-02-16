const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 6001
require("dotenv").config()

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL)
  console.log("DBと接続完了")
} catch (error) {
  console.log(error)
  console.log("DB接続失敗")
}

app.listen(PORT, () => {
  console.log("サーバー起動中" + PORT)
})
