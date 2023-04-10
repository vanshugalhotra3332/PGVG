const mongoose = require("mongoose");

const PgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "PG",
    },
    gender: {
      type: String,
    },
    rentPerMonth: {
      type: Number,
      required: true,
    },
    sharings: {
      type: Map,
      of: new mongoose.Schema(
        {
          rentPerMonth: {
            type: Number,
            required: true,
          },
          beds: {
            type: Number,
            default: 0,
          },
          security: {
            type: Number,
            default: 0,
          },
          includes: {
            type: [String],
          },
        },
        { _id: false }
      ),
      required: true,
    },
    amenities: {
      type: Array,
    },
    totalBeds: {
      type: Number,
    },
    rating: {
      type: Number,
      default: 0,
    },
    rules: {
      allowed: {
        type: [String],
      },
      notAllowed: {
        type: [String],
      },
    },
    location: {
      coordinates: {
        type: [Number],
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    otherInfo: {
      mealTypes: {
        type: [String],
        default: ["Breakfast", "Lunch", "Dinner"],
      },
      noticePeriod: {
        type: Number,
        default: 30,
      },
      lockInPeriod: {
        type: Number,
        default: 0,
      },
      powerBackup: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.PGs || mongoose.model("PGs", PgSchema);
