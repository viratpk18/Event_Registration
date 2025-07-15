const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const { registerUserForEvent, getAttendees, cancelRegistration } = require("../controllers/registrationController");

router.post("/", verifyToken, registerUserForEvent);
router.get("/:eventId", verifyToken, getAttendees); // for admin
router.delete("/:eventId", verifyToken, cancelRegistration); // for user

module.exports = router;
