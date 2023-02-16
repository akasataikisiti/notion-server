const express = require("express")
const mongoose = require("mongoose")
const CryptoJS = require("crepto-js")
const User = require("./src/v1/models/user")
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

//ユーザー新規登録API
app.post("/register", async (req, res) => {
  // パスワード受け取り
  const password = req.body.password

  try {
    //パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY)

    // ユーサー新規作成
    const user = await User.create(req.body)
  } catch (error) {

  }
})


//ユーザーログイン用API
app.listen(PORT, () => {
  console.log("サーバー起動中" + PORT)
})
