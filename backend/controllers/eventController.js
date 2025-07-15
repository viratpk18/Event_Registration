const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Unauthorized" });

    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  console.log("Update event triggered");

  if (req.user.role !== "admin") return res.status(403).json({ msg: "Unauthorized" });

  console.log("Authorized. Request body:", req.body);
  console.log("Updating event ID:", req.params.id);

  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ msg: "Event not found" });

    res.json(event);
  } catch (err) {
    console.error("Error updating event:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Unauthorized" });
    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
