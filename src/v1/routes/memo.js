const router = require("express").Router()
const memoController = require("../controllers/memo")
const tokenHandler = require("../handlers/tokenHandler")

// メモ作成
router.post("/", tokenHandler.verifyToken, memoController.create)

// ログインユーザが投稿したメモを全て取得
router.get("/", tokenHandler.verifyToken, memoController.getAll)
//
// ログインユーザが投稿したメモを一つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne)

module.exports = router
