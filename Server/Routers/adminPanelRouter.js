const express = require("express")
const router = express.Router()

const userPanelController = require("../Controllers/adminPanelController")

router.post("/", userPanelController.admin)

module.exports = router