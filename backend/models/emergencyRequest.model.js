const mongoose = require("mongoose");

const emergencyRequestSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    vehicleID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null
    },
    // Optional when the customer does not have a registered vehicle.
    vehicleType: {
      type: String,
      trim: true,
      maxlength: 100,
      default: ""
    },
    technicianInfo: {
      technicianID: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "Technician",
        default: null
      },
      status: {
        type: String,
        enum: ["available", "busy"],
        default: "available"
      },
      assignedAt: {
        type: Date,
        default: null
      }
    },
    problemType: {
      type: String,
      enum: [
        "flat_tire",
        "dead_battery",
        "engine_problem",
        "fuel_problem",
        "accident",
        "other"
      ],
      default: "other",
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
      address: {
        type: String,
        trim: true
      }
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium"
    },
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "on_the_way",
        "arrived",
        "in_service",
        "in_progress",
        "completed",
        "cancelled"
      ],
      default: "pending"
    },
    requestedAt: {
      type: Date,
      default: Date.now
    },
    acceptedAt: {
      type: Date,
      default: null
    },
    completedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret.__v;
        return ret;
      }
    }
  }
);

const emergencyModel =
  mongoose.models.emergencyRequest ||
  mongoose.model("emergencyRequest", emergencyRequestSchema);
module.exports = emergencyModel;
