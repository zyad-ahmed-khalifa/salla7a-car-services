const mongoose = require("mongoose");
const sparePartsSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },

    name: { type: String, required: true, trim: true },

    description: { type: String, required: true, trim: true },

    brand: { type: String, required: true, trim: true },

    type: { type: String, required: true, trim: true },

    price: { type: Number, required: true },

    stock: { type: Number, required: true },

    img: { type: String, required: true, trim: true },

    compatibleCars: [
      {
        make: { type: String, required: true, trim: true },

        model: [{ type: String, required: true, trim: true }]
      }
    ]
  },
  {
    collection: "spareParts",
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
const sparePartsModel = mongoose.model("spareParts", sparePartsSchema);
module.exports = { sparePartsModel };
