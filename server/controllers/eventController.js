const logActivity = require("../utils/logger");
const Event = require("../models/Event");

// ===============================
// CREATE EVENT
// ===============================
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      eventDate,
      organizer,
      bannerImage,
      galleryImages,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      category,
      location,
      eventDate,
      organizer,
      bannerImage,
      galleryImages,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    });

    await logActivity(
      "EVENT_CREATED",
      req.user.id,
      {
        eventId: event._id,
        title: event.title,
      }
    );

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET ALL EVENTS
// ===============================
exports.getAllEvents = async (req, res) => {
  try {
    const {
      search,
      category,
      status,
      page = 1,
      limit = 5,
    } = req.query;

    const query = {};

    // Search
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Category Filter
    if (category) {
      query.category = category;
    }

    // Status Filter
    if (status) {
      query.status = status;
    }

    const totalEvents =
      await Event.countDocuments(query);

    const events = await Event.find(query)
      .populate(
        "createdBy",
        "name email role"
      )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      totalEvents,
      currentPage: Number(page),
      totalPages: Math.ceil(
        totalEvents / limit
      ),
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE EVENT
// ===============================
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name email role");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE EVENT
// ===============================
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Manager can edit only own events
    if (
      req.user.role === "manager" &&
      event.createdBy.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You can edit only your own events",
      });
    }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user.id,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    await logActivity(
      "EVENT_UPDATED",
      req.user.id,
      {
        eventId: event._id,
        title: event.title,
      }
    );

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE EVENT
// ===============================
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await logActivity(
      "EVENT_DELETED",
      req.user.id,
      {
        eventId: event._id,
        title: event.title,
      }
    );

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// APPROVE EVENT (ADMIN ONLY)
// ===============================
exports.approveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    event.status = "approved";
    event.updatedBy = req.user.id;

    await event.save();

    await logActivity(
      "EVENT_APPROVED",
      req.user.id,
      {
        eventId: event._id,
        title: event.title,
      }
    );

    res.status(200).json({
      success: true,
      message: "Event approved successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
