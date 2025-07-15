const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const { getAnalytics } = require("../controllers/adminController");

router.get("/analytics", verifyToken, getAnalytics);

module.exports = router;
