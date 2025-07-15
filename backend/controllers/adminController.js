const User = require("../models/User");
const Event = require("../models/Event");

exports.getAnalytics = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Unauthorized" });

    const totalUsers = await User.countDocuments({ role: "user" });
    const totalEvents = await Event.countDocuments();
    const upcomingEvents = await Event.countDocuments({ date: { $gte: new Date() } });

    const totalAttendees = await Event.aggregate([
      { $project: { count: { $size: "$registeredUsers" } } },
      { $group: { _id: null, total: { $sum: "$count" } } }
    ]);

    res.json({
      totalUsers,
      totalEvents,
      upcomingEvents,
      totalAttendees: totalAttendees[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
