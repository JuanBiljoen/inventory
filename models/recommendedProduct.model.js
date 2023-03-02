const mongoose = require("mongoose");
const { Schema } = mongoose;

// Product Recommendation Schema for mongoose
let RecommendedProduct = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    describe: {
      type: String,
    },
    vin: {
      type: String,
    },
    // Tied the author of the Product Recommendation by the author's ObjectId
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RecommendedProduct", RecommendedProduct);
