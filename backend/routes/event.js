const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const { createEvent, getAllEvents, getEventById, deleteEvent, updateEvent } = require("../controllers/eventController");


router.post("/", verifyToken, createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", verifyToken, updateEvent);
router.delete("/:id", verifyToken, deleteEvent);

module.exports = router;
