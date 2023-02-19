const express = require("express")
const mongoose = require("mongoose")
const PORT = 6001
require("dotenv").config()
const cors = require("cors")
const app = express()

app.use(cors({
  origin: "http://localhost:3000",
}))
app.use(express.json())

app.use("/api/v1", require("./src/v1/routes/auth"))

mongoose.set('strictQuery', false);
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

