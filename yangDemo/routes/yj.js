var express = require("express")
var router = express.Router()
router.use('/', function (req, res) {
    res.send("yangjian")
})
module.exports  = router