const express = require("express")
const router = express.Router()

const userPanelController = require("../Controllers/userPanelController")

router.post("/LoveSong", userPanelController.addLoveSong)
router.delete("/LoveSong", userPanelController.removeLoveSong)
router.post("/BadSong", userPanelController.addBadSong)
router.delete("/BadSong", userPanelController.removeBadSong)
router.post("/changeData", userPanelController.changeData)
router.post("/auth", userPanelController.auth)

module.exports = router