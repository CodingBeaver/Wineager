const router = require("express").Router()

router.use("/bacve", require("./data_routes/bacve"))
router.use("/skladiste", require("./data_routes/skladiste"))
router.use("/radnje", require("./data_routes/radnje"))
router.use("/radnje_vinograd",require("./data_routes/radnje_vinograd"))
router.use("/prskanja",require("./data_routes/prskanja"))
router.use("/parcele",require("./data_routes/parcele"))

module.exports= router
