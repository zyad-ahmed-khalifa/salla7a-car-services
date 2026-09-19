const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    brand: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30
    },
    model: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30
    },

    licensePlate: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      validate: {
        validator: function (v) {
          return /^[\u0600-\u06FFa-zA-Z0-9\s-]+$/.test(v);
        },
        message: "invalid code"
      }
    },

    year: {
      type: Number,
      required: true,
      min: 1990,
      validate: {
        validator: function (v) {
          const currentYear = new Date().getFullYear();
          return v <= currentYear + 1;
        },
        message: (props) => `select up to date value (${props.value})`
      }
    },
    color: { type: String, trim: true, default: "White" },
    vin: { type: String, trim: true, default: "" }
  },
  {
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

carsSchema.index({ userId: 1, licensePlate: 1 }, { unique: true });

module.exports = mongoose.model("Vehicle", carsSchema);
