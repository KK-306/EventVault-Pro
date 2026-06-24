const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Workshop",
        "Seminar",
        "Hackathon",
        "Cultural Event",
        "Sports Event",
        "Technical Fest",
        "Placement Drive",
        "Guest Lecture",
      ],
    },

    location: {
      type: String,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    organizer: {
      type: String,
      required: true,
    },

    bannerImage: {
      type: String,
      default: "",
    },

    galleryImages: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);