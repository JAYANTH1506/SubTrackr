const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceName: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    billingCycle: { type: String, enum: ["Monthly", "Yearly", "Weekly"], required: true },
    logoUrl: { type: String }, // optional for dynamic logos
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
