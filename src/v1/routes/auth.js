const router = require("express").Router()
const CryptoJS = require("crypto-js")
const JWT = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")

const User = require("../models/user")
const validation = require("../../handlers/validation")

//ユーザー新規登録API
router.post("/register",
  body("username").
    isLength({ min: 8 }).
    withMessage("ユーザ名は8文字以上である必要があります。"),
  body("password").
    isLength({ min: 8 }).
    withMessage("パスワードは8文字以上である必要があります。"),
  body("confirmpassword").
    isLength({ min: 8 }).
    withMessage("確認用パスワードは8文字以上である必要があります。"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザは既に使われています。")
      }
    })
  }),
  validation.validate,
  async (req, res) => {
    // パスワード受け取り
    const password = req.body.password

    try {
      //パスワードの暗号化
      req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY)

      // ユーサー新規作成
      const user = await User.create(req.body)
      // JWTの発行
      const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      })
      return res.status(200).json({ user, token })
    } catch (err) {
      return res.status(500).json(err)
    }
  })


//ユーザーログイン用API
//
module.exports = router
