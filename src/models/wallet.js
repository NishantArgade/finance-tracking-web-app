import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  name: String,
  type: String,
  amount: Number,
  color: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default Wallet;
