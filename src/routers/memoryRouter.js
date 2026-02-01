const express = require("express")
const router = express.Router();
const authController = require("../controllers/authController")
const memoryController = require("../controllers/memoryController");

router
    .route("/api/v1/memories")
    .post(authController.protectRouter,memoryController.createMemory)
router
    .route("/api/v1/memories")
    .get(authController.protectRouter,memoryController.getMemories)
router
    .route("/api/v1/memories/:id")
    .get(authController.protectRouter,memoryController.getMemoryById)
router
    .route("/api/v1/memories/:id")
    .delete(authController.protectRouter,memoryController.deleteMemory)

module.exports = router;
