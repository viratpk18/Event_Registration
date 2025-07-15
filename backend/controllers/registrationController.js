const Event = require("../models/Event");

exports.registerUserForEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    if (event.registeredUsers.includes(req.user.id))
      return res.status(400).json({ msg: "Already registered" });

    event.registeredUsers.push(req.user.id);
    await event.save();
    res.json({ msg: "User registered to event" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate("registeredUsers", "name email");
    if (!event) return res.status(404).json({ msg: "Event not found" });

    res.json(event.registeredUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    event.registeredUsers = event.registeredUsers.filter(
      userId => userId.toString() !== req.user.id
    );

    await event.save();
    res.json({ msg: "Registration canceled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};