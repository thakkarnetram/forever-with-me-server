const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const journalController = require("../controllers/journalController")

router
    .route("/api/v1/journal")
    .post(authController.protectRouter,journalController.createJournal)
router
    .route("/api/v1/journal")
    .get(authController.protectRouter,journalController.getJournals)
router
    .route("/api/v1/journal/:id")
    .get(authController.protectRouter,journalController.getJournalById)
router
    .route("/api/v1/journal/:id")
    .delete(authController.protectRouter,journalController.createJournal)

module.exports = router;
