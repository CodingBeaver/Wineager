const router = require("express").Router()


router.use("/dashboard", require("./account_routes/routes/dashboard"))
router.use("/auth", require("./account_routes/routes/jwtAuth"));

module.exports = router